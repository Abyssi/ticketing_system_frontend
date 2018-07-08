'use strict';

angular.module('app.ctrl').controller('queryEditController', function ($scope, $routeParams, userService, queryService, $timeout) {
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
        queryType: '',
        isEnable: '',
        dbConnectionInfo: {
            url: '',
            username: '',
            password: ''
        }
    };

    //translate cron only when it has more than n char
    self.minCronInputChar = 8;

    self.cronFormatted = "It isn't a valid cron (ex: * * * * * ?)";

    self.cronRegex = /^(\*|(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|(0?[0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) ((\* \* \?)|(\?\ (((\*|(0?[1-9]|1[0-2])|\*\/([1-9]|1[0-2])))|(JAN(\-(FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)|)|FEB(\-(JAN|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)|)|MAR(\-(JAN|FEB|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)|)|APR(\-(JAN|FEB|MAR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)|)|MAY(\-(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)|)|JUN(\-(JAN|FEB|MAR|APR|MAY|JUL|AUG|SEP|OCT|NOV|DEC)|)|JUL(\-(JAN|FEB|MAR|APR|MAY|JUN|AUG|SEP|OCT|NOV|DEC)|)|AUG(\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|SEP|OCT|NOV|DEC)|)|SEP(\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|OCT|NOV|DEC)|)|OCT(\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|NOV|DEC)|)|NOV(\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|DEC)|)|DEC(\-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV)|)))\ (([1-7])|(MON(\-(TUE|WED|THU|FRI|SAT|SUN)|)|TUE(\-(MON|WED|THU|FRI|SAT|SUN)|)|WED(\-(MON|TUE|THU|FRI|SAT|SUN)|)|THU(\-(MON|TUE|WED|FRI|SAT|SUN)|)|FRI(\-(MON|TUE|WED|THU|SAT|SUN)|)|SAT(\-(MON|TUE|WED|THU|FRI|SUN)|)|SUN(\-(MON|TUE|WED|THU|FRI|SAT)|))))|((0?[1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) ((\*|(0?[1-9]|1[0-2])|\*\/([1-9]|1[0-2]))\ \?))$/;
    self.sqlRegex = /^(INSERT|DELETE|UPDATE|CREATE|GRANT|DROP)$/;
    self.splitRegex = /;|\s/;

    self.priorities = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.get(self.queryId, function (response) {
            self.queryForm.id = response.data.id;
            self.queryForm.queryText = response.data.queryText;
            self.queryForm.description = response.data.description;
            self.queryForm.queryPriority.id = response.data.queryPriority.id.toString();
            self.queryForm.cron = response.data.cron;
            self.queryForm.comparisonOperator = response.data.comparisonOperator;
            self.queryForm.referenceValue = response.data.referenceValue;
            self.queryForm.queryType = response.data.queryType;
            self.queryForm.isEnable = response.data.isEnable;
            self.queryForm.dbConnectionInfo = response.data.dbConnectionInfo;

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
            alert("Invalid update");
        });
    };

    self.validateSQL = function (sql) {

        var sqlSplitted = self.splitSQL(sql);

        if (sqlSplitted.length > 0) {

            for (let i = 0; i < sqlSplitted.length; i++)
                if (sqlSplitted[i].match(self.sqlRegex))
                    return false;

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

    self.validateDbConnectionInfo = function (dbConnectionInfo) {

        if ((dbConnectionInfo.url !== '' && dbConnectionInfo.url != null) &&
            (dbConnectionInfo.username !== '' && dbConnectionInfo != null) &&
            (dbConnectionInfo.password === '' || dbConnectionInfo.password == null || dbConnectionInfo.password === undefined)) {

            //custom url and username need password
            alert("Insert db password to complete credentials!");

            return false;
        }

        if (dbConnectionInfo.url === '' || dbConnectionInfo.url == null)
            dbConnectionInfo.url = null;

        if (dbConnectionInfo.username === '' || dbConnectionInfo.username == null)
            dbConnectionInfo.username = null;

        if (dbConnectionInfo.password === '' || dbConnectionInfo.password == null || dbConnectionInfo.password === undefined)
            dbConnectionInfo.password = null;

        return true;
    };

    self.validateForm = function (form) {
        return self.validateSQL(form.queryText) &&
            self.validateCron(form.cron) &&
            form.description.length > 1 &&
            form.comparisonOperator !== '' &&
            form.referenceValue !== '' &&
            form.queryType !== '' &&
            form.isEnable != null && form.isEnable !== '' &&
            self.validateDbConnectionInfo(form.dbConnectionInfo);
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

    $scope.$on("$destroy", function () {
        document.querySelectorAll('.material-tooltip').forEach(e => e.parentNode.removeChild(e))
    })
});