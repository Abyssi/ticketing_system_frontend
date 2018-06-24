angular.module('app.ctrl').controller('queryTableListController', function (userService, queryService, queryBuilderService, $timeout, $routeParams) {
    const self = this;

    self.tables = [];

    self.filteredTables = [];

    self.dbConnectionInfo = {
        url: null,
        username: null,
        password: null
    };

    self.generalColumn = {
        name: "General Query (select this line to perform query without where clauses)",
        selected: false
    };

    self.queryText = "SELECT count(*) FROM ";

    // select table feature flag
    self.selectable = true;

    // append modality feature flag
    self.appendMood = false;

    //get tables metadata using db connection info
    self.refreshTables = function(dbConnectionInfo) {

        if (dbConnectionInfo == null) {

            dbConnectionInfo = {
                url: null,
                username: null,
                password: null
            };

        } else {

            if (dbConnectionInfo.url == null || dbConnectionInfo.url === '') {
                dbConnectionInfo.url = null;
            }

            if (dbConnectionInfo.username == null || dbConnectionInfo.username === '') {
                dbConnectionInfo.username = null;
            }

            if (dbConnectionInfo.password == null || dbConnectionInfo.password === '') {
                dbConnectionInfo.password = null;
            }

        }

        self.getTablesMetadata(dbConnectionInfo);

    };

    self.getTablesMetadata = function (dbConnectionInfo) {
        if (!userService.isLogged()) {

            //refresh query because there is a problem in login
            queryBuilderService.refresh();

            window.location.href = "../";

        }

        queryService.getTablesMetadata(dbConnectionInfo, function (response) {

            self.tables = response.data;

            if (!self.appendMood) {

                self.filteredTables = [];

                [].push.apply(self.filteredTables, self.tables);


            } else {

                var table = self.tables.filter(function (t) {
                    return t.name === $routeParams.table;
                });

                if (table == null) {
                    alert("Error: try again from beginning");

                    //redirect to query path beginning
                    window.location.href = "/query/create/tree_path/type";
                }

                self.selectTable(table[0], dbConnectionInfo);

            }
        }, function () {
            alert("Invalid tables metadata");
        });

    };

    self.resetTableColumns = function (table) {

        table.columns = [];

        table.columns.push(self.generalColumn);

    };

    self.selectTable = function (table, dbConnectionInfo) {

        //select table only if selectable flag is true
        if (self.selectable) {

            //if table is already selected, deselect it and return
            if (table.selected) {
                table.selected = false;

                //restore tables
                self.filteredTables = [];
                [].push.apply(self.filteredTables, self.tables);
                return;
            }

            angular.forEach(self.tables, function (t) {

                t.selected = false;

            });


            table.selected = true;

            //filter tables
            self.filteredTables = [table];

        } else {
            //filter tables
            self.filteredTables = [table];
        }

        self.getTableColumnsMetadata(table.name, dbConnectionInfo);

    };

    self.selectColumn = function (table, column) {

        //if column is already selected, deselect it and return
        if (column.selected) {
            column.selected = false;
            return;
        }

        angular.forEach(table.columns, function (c) {

            c.selected = false;

        });

        column.selected = true;

        if (column === self.generalColumn) {
            self.goToSummary(table, self.dbConnectionInfo);
        } else {
            self.goToWhereClauses(table, column, self.dbConnectionInfo);
        }


    };

    self.goToSummary = function (table, dbConnectionInfo) {

        if (confirm("Table selected: " + table.name + ". Go on?")) {

            self.updateQueryDbConnectionInfo(dbConnectionInfo);

            self.updateQueryText(table);

            window.location.href = "#/query/create/tree_path/create";

        }

    };

    self.goToWhereClauses = function (table, column, dbConnectionInfo) {

        if (confirm("Table selected: " + table.name + ", Column selected: " + column.name + ". Go on?")) {

            self.updateQueryDbConnectionInfo(dbConnectionInfo);

            self.updateQueryText(table, column);

            window.location.href = "#/query/create/tree_path/where_clauses/" + table.name + "/" + column.name;

        }

    };

    self.updateQueryDbConnectionInfo = function(dbConnectionInfo) {

        var q = queryBuilderService.get();

        q.dbConnectionInfo = dbConnectionInfo;

        queryBuilderService.set(q)

    };

    self.updateQueryText = function (table, column) {

        // use append feature
        if (self.appendMood) {

            var q = queryBuilderService.get();

            //check column != null
            if (column == null) {

                alert("no column selected!")

                //TODO do something
            }

            q.queryText += column.name + " ";

            queryBuilderService.set(q);

            return;
        }

        //update query text
        self.queryText += table.name;

        //check also if is not undefined
        if (column != null) {

            self.queryText += " WHERE " + column.name + " ";

        }

        var q = queryBuilderService.get();

        q.queryText = self.queryText;

        queryBuilderService.set(q);


    };


    self.getTableColumnsMetadata = function (tableName, dbConnection) {
        if (!userService.isLogged()) window.location.href = "../";

        queryService.getTableColumnsMetadata(tableName, dbConnection, function (response) {

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

    self.getDbConnectionInfo = function() {

        var q = queryBuilderService.get();

        self.dbConnectionInfo = q.dbConnectionInfo;

    };

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        if ($routeParams.table === "0") {

            //charge table from system's db
            self.refreshTables(null);

        } else {

            //update db connection info
            self.getDbConnectionInfo();

            self.refreshTables(self.dbConnectionInfo);

            //single table feature
            self.selectable = false;

            //append feature
            self.appendMood = true;
        }

            $timeout(function () {
                M.AutoInit();
            });

    }();
});