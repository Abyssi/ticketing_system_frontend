'use strict';

angular.module('app.ctrl').controller('queryListController', function ($routeParams, userService, queryService, $timeout) {
    const self = this;

    self.queries = [];
    self.currentPage = $routeParams.page;
    self.totalPages = -1;

    self.range = function (min, max) {
        var res = [];
        for (var i = min; i <= max; i++)
            res.push(i);
        return res;
    };

    self.getPages = function () {
        var givenMin = 1;
        var givenMax = self.totalPages;
        var maxCount = 5; // it should be odd

        var min = self.currentPage - (maxCount - 1) / 2;
        min = min < givenMin ? givenMin : min;
        var max = min + maxCount - 1;
        max = max > givenMax ? givenMax : max;
        min = (max - maxCount + 1);
        min = min < givenMin ? givenMin : min;
        return self.range(min, max);
    };

    self.setQueryDetails = function(query, details) {

        query.comparisonOperator = details.comparisonOperator;

        query.queryPriority = details.queryPriority;

        query.queryType = details.queryType;

        query.referenceValue = details.referenceValue;

        query.dbConnectionInfo = details.dbConnectionInfo;

    };

    self.delete = function(query) {

        queryService.delete(query.id, function (response) {

            self.getCurrentPage();

        }, function (error) {

            alert("Error while deleting query");

        });

    };

    self.getCurrentPage = function() {

        queryService.list(self.currentPage - 1, null, function (response) {
            self.queries = response.data.content;
            self.totalPages = response.data.totalPages;

        }, function () {
            alert("Invalid get");
        });

    };

    self.getMoreInfo = function (query) {

        queryService.get(query.id, function (response) {

            angular.forEach(self.queries, function (q) {

                if (q.id === response.data.id) {

                    self.setQueryDetails(q, response.data);

                }

            });

        }, function () {
            alert("Invalid get details");
        });
    };

    self.disable = function(query) {

        if (!query.active) {
            alert("Query already disable!")
            return
        }

        queryService.disableOne(query.id, function (response) {

            //disable query locally
            query.active = false;

        }), function(error) {

            alert("Error while disabling query");

        };

    };

    self.activate = function(query) {

        if (query.active) {
            alert("Query already active!")
            return
        }

        queryService.activateOne(query.id, function (response) {

            //activate query locally
            query.active = true;

        }), function(error) {

            alert("Error while activating query");

        };
    };


    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        M.AutoInit();

        queryService.list(self.currentPage - 1, null, function (response) {
            self.queries = response.data.content;
            self.totalPages = response.data.totalPages;

        }, function () {
            alert("Invalid get");
        });
    }();

});