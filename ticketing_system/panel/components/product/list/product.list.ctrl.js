'use strict';

angular.module('app.ctrl').register.controller('productListController', function ($routeParams, userService, ticketService, productService) {
    const self = this;

    self.products = [];
    self.currentPage = $routeParams.page;
    self.totalPages = -1;

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        productService.list(self.currentPage - 1, 10, function (response) {
            self.products = response.data.content;
            self.totalPages = response.data.totalPages;
        }, function () {
            alert("Invalid get");
        });
    }();

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

});