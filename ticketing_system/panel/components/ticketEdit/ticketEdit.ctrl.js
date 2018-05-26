'use strict';

angular.module('app.ctrl').register.controller('ticketEditController', function ($routeParams, userService, ticketService) {
    const self = this;

    self.ticket = {};
    self.ticketId = $routeParams.id;

    self.init = function () {
        ticketService.get(self.currentPage, function (response) {
            self.tickets = response.data.content;
            self.totalPages = response.data.totalPages;
        }, function () {
            alert("Invalid get");
        });
    }();
});