'use strict';

angular.module('app.ctrl').controller('userListController', function ($routeParams, userService) {
    const self = this;

    self.searchTerm = $routeParams.searchTerm == null ? '' : $routeParams.searchTerm;
    self.users = [];
    self.currentPage = $routeParams.page;
    self.totalPages = -1;


    self.search = function () {
        userService.search(self.searchTerm, self.currentPage - 1, 5, function (response) {
            self.users = response.data.content;
            self.totalPages = response.data.totalPages;
        }, function () {
            self.users = [];
            self.totalPages = 0;
        });
    };


    self.reset = function () {
        userService.list(self.currentPage - 1, 5, function (response) {
            self.users = response.data.content;
            self.totalPages = response.data.totalPages;
        }, function () {
            alert("Invalid get");
            self.users = [];
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

    self.delete = function (userId) {
        if (confirm("Are you sure you want to delete this user?")) {
            userService.delete(userId, 'id', function () {
                alert("User deleted");
                window.location.href = "#/user/list";
            }, function () {
                alert("Invalid delete");
            });
        }
    };

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";
        M.AutoInit();
        self.set();
    }();

});