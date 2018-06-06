angular.module('app.ctrl').controller('queryTableListController', function (userService, queryService,$timeout) {
    const self = this;

    self.tables = [];

    self.tableColumns = [];

    self.getTablesMetadata = function() {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.getTablesMetadata(function (response) {
            self.tables = response.data;
        }, function () {
            alert("Invalid tables metadata");
        });

    };

    self.getTableColumnsMetadata = function(tableName) {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.getTableColumnsMetadata(tableName, function (response) {
            self.tableColumns = response.data;
        }, function () {
            alert("Invalid table columns metadata");
        });

    };

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.getTablesMetadata(function (response) {
            self.tables = response.data;
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid tables metadata");
        });
    }();
});