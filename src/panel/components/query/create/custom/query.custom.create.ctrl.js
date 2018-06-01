
angular.module('app.ctrl').controller('queryCustomCreateController', function (userService, queryService, $timeout) {
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

    self.priorities = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

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

    self.validateSQL = function(sql) {
        return true;
    };

    self.validateCron = function(cron) {
        return true;
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
});