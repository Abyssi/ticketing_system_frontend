'use strict';

angular.module('app.ctrl').controller('recordListController', function ($routeParams, recordService, userService) {
    const self = this;

    self.searchTerm = $routeParams.searchTerm == null ? '' : $routeParams.searchTerm;
    self.records = [];
    self.currentPage = $routeParams.page;
    self.totalPages = -1;


    self.search = function () {
        recordService.search(self.searchTerm.toUpperCase(), self.currentPage - 1, 3, function (response) {
            self.records = response.data.content;
            self.totalPages = response.data.totalPages;
        }, function () {
            self.records = [];
            self.totalPages = 0;
        });
    };

    self.formatRecords = function () {

        angular.forEach(self.records, function (record) {

            record.payloads[0].json = JSON.parse(record.payloads[0].json);

        })

    };

    self.reset = function () {
        recordService.list(self.currentPage - 1, 3, function (response) {
            self.records = response.data.content;

            self.formatRecords();

            self.totalPages = response.data.totalPages;
        }, function () {
            alert("Invalid get");
            self.records = [];
            self.totalPages = 0;
        });
    };

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

    self.set = function (page) {
        if (page != null) self.currentPage = page;
        self.searchTerm === '' ? self.reset() : self.search();
    };

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";
        M.AutoInit();
        self.set();
    }();

});