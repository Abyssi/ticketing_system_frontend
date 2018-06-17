'use strict';

angular.module('app.ctrl').controller('queryEditController', function ($routeParams, userService, queryService, $timeout) {
    const self = this;

    self.queryId = $routeParams.id;

    self.queryForm = {
        id: '',
        queryText: '',
        description: '',
        queryPriority: {
            id: ''
        },
        cron: '',
        comparisonOperator: '',
        referenceValue: '',
        queryType: ''
    };

    //translate cron only when it has more than n char
    self.minCronInputChar = 8;

    self.cronFormatted = "It isn't a valid cron (ex: * * * * * ?)";

    self.cronRegex = /^(\*|(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|(0?[0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|(0?[1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|(0?[1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\?)$/;
    self.sqlRegex = /^(INSERT|DELETE|UPDATE|CREATE|GRANT|DROP)$/;
    self.splitRegex = /;|\s/;

    self.priorities = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.get(self.queryId, function (response) {
            self.queryForm.id = response.data.id;
            self.queryForm.queryText =  response.data.queryText;
            self.queryForm.description = response.data.description;
            self.queryForm.queryPriority.id = response.data.queryPriority.id.toString();
            self.queryForm.cron = response.data.cron;
            self.queryForm.comparisonOperator = response.data.comparisonOperator;
            self.queryForm.referenceValue = response.data.referenceValue;
            self.queryForm.queryType = response.data.queryType;

        }, function (error) {

            alert("Invalid get");

        });

        queryService.metadata(function (response) {
            self.priorities = response.data.priorities;
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid metadata");
        });
    }();

    self.update = function () {
        if (!self.validateForm(this.queryForm)) {
            alert("Invalid form");
            return;
        }

        const query = self.queryForm;

        queryService.update(query.id, query, function () {
            alert("Query updated");
            window.location.href = "#/query/list";
        }, function () {
            alert("Invalid create");
        });
    };

    self.validateSQL = function (sql) {

        var sqlSplitted = self.splitSQL(sql);

        if (sqlSplitted.length > 0) {

            sqlSplitted.forEach(function (element, index, array) {
                if (element.match(self.sqlRegex)) {
                    return false;
                }
            });

            return true;

        } else {
            return false;
        }

    };

    self.validateCron = function (cron) {

        if (cron.length < 1)
            return false;

        return cron.match(self.cronRegex)

    };

    self.validateForm = function (form) {
        return self.validateSQL(form.queryText) &&
            self.validateCron(form.cron) &&
            form.description.length > 1 &&
            form.comparisonOperator !== '' &&
            form.referenceValue !== '' &&
            form.queryType !== '';
    };

    self.formatCron = function (cron) {

        if (cron.length > self.minCronInputChar && self.validateCron(cron)) {

            self.cronFormatted = cronstrue.toString(cron, {locale: "en"});

        } else {

            self.cronFormatted = "It isn't a valid cron (ex: * * * * * ?)";

        }
    }

    self.splitSQL = function (sql) {

        return sql.split(self.splitRegex);

    }
});