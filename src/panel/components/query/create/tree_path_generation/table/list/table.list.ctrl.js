angular.module('app.ctrl').controller('queryTableListController', function (userService, queryService, $timeout) {
    const self = this;

    self.tables = [];

    self.generalColumn = {
        name: "General Query (select this line to perform query without where clauses)",
        selected: false
    };

    self.getTablesMetadata = function () {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.getTablesMetadata(function (response) {
            self.tables = response.data;
        }, function () {
            alert("Invalid tables metadata");
        });

    };

    self.resetTableColumns = function(table) {

        table.columns = [];

        table.columns.push(self.generalColumn);

    };

    self.selectTable = function(table) {

        //if table is already selected, deselect it and return
        if (table.selected) {
            table.selected = false;
            return;
        }

        angular.forEach(self.tables, function (t) {

            t.selected = false;

        });


        table.selected = true;

    };

    self.selectColumn = function(table, column) {

        //if column is already selected, deselect it and return
        if (column.selected) {
            column.selected = false;
            return;
        }

        angular.forEach(table.columns, function (c) {

            c.selected = false;

        });

        column.selected = true;

    };

    self.getTableColumnsMetadata = function (tableName) {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.getTableColumnsMetadata(tableName, function (response) {

            angular.forEach(self.tables, function (table) {

                if (table.name === tableName) {

                    self.resetTableColumns(table);

                    [].push.apply(table.columns, response.data);

                }

            });
            //self.tables.columns = response.data;
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