'use strict';

angular.module('app.ctrl').controller('queryWhereClausesController', function (userService, queryService, queryBuilderService, $timeout, $routeParams) {

    const self = this;

    self.whereClauseForm = {
        comparisonSign : '',
        comparisonValue : ''
    };

    self.tableName = $routeParams.table;

    self.columnName = $routeParams.column;

    self.queryText = "";


    self.updateQueryText = function(whereClauseForm, modality){

        var q = queryBuilderService.get();

        self.queryText = q.queryText;

        if(whereClauseForm.comparisonValue === "null") {

            if (whereClauseForm.comparisonSign === "!=") {

                self.queryText += "IS NOT NULL";

            } else if (whereClauseForm.comparisonSign === "=") {

                self.queryText += "IS NULL";

            }

        } else if(whereClauseForm.comparisonValue === "false"){

            self.queryText += whereClauseForm.comparisonSign + " FALSE";

        } else if(whereClauseForm.comparisonValue === "true" ){

            self.queryText += whereClauseForm.comparisonSign + "TRUE";

        } else if(whereClauseForm.comparisonSign === "LIKE") {

            self.queryText += whereClauseForm.comparisonSign + " '" + whereClauseForm.comparisonValue + "%'";

        } else {

            self.queryText += whereClauseForm.comparisonSign + " '" + whereClauseForm.comparisonValue + "'";

        }

        switch (modality) {

            case "and":

                self.queryText += " AND ";

                break;

            case "or":

                self.queryText += " AND ";

                break;

            default:

                self.queryText += ";";

                break;

        }

        q.queryText = self.queryText;

        queryBuilderService.set(q);

    };

    self.goNext = function(modality) {

        //validate form
        if (!self.validateForm(self.whereClauseForm)) {

            alert("Where clause not complete, please insert both comparison sign and comparison value!")

            return;

        }

        self.updateQueryText(self.whereClauseForm, modality);

        switch (modality) {

            case "and":
            case "or":

                window.location.href = "#/query/create/tree_path/table/list/" + self.tableName;

                break;

            default:

                window.location.href = "#/query/create/tree_path/create";

                break;
        }

    };

    self.validateForm = function(whereClauseForm) {

        return whereClauseForm.comparisonSign != null
                && whereClauseForm.comparisonSign !== ""
                && whereClauseForm.comparisonValue != null
                && whereClauseForm.comparisonValue !== "";

    };


    self.init = function () {

        if (!userService.isLogged()) window.location.href = "../";

        $timeout(function () {
            M.AutoInit();
        });

    }();


});