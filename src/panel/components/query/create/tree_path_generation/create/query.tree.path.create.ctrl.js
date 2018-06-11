'use strict';

angular.module('app.ctrl').controller('queryTreePathCreateController', function (userService, queryService, queryBuilderService, $timeout) {

    const self = this;

    self.queryForm = {
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
        if (!userService.isLogged()) {

            //refresh query
            queryBuilderService.refresh();

            window.location.href = "../";
        }

        $timeout(function () {
            self.queryForm = queryBuilderService.get();
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


    self.create = function () {
        if (!self.validateForm(this.queryForm)) {
            alert("Invalid form");
            return;
        }

        const query = self.queryForm;

        queryService.create(query, function () {
            alert("Query created");
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