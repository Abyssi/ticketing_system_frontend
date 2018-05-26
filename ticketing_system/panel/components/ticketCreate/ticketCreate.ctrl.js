'use strict';

angular.module('app.ctrl').register.controller('ticketCreateController', function (userService, ticketService, $timeout) {
    const self = this;

    self.ticketForm = {
        visibility: {
            id: ''
        },
        description: '',
        assignee: {
            id: ''
        },
        category: {
            id: ''
        },
        title: '',
        target: {
            id: ''
        },
        customerPriority: {
            id: ''
        }
    };

    self.visibilities = [];
    self.assignees = [];
    self.categories = [];
    self.targets = [];
    self.priorities = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        ticketService.metadata(function (response) {
            self.visibilities = response.data.visibilities;
            self.assignees = response.data.assignees;
            self.categories = response.data.categories;
            self.targets = response.data.targets;
            self.priorities = response.data.priorities;
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid metadata");
        });
    }();

    self.create = function () {
        if (!self.validateForm(this.ticketForm)) {
            alert("Invalid form");
            return;
        }

        const ticket = self.ticketForm;

        console.log(ticket);
        ticketService.create(ticket, function () {
            alert("Ticket created");
            window.location.reload();
        }, function () {
            alert("Invalid create");
        });
    };

    self.validateForm = function (form) {
        return form.title.length > 1 &&
            form.description.length > 1;
    };
});