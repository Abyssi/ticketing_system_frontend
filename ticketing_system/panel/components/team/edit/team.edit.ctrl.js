'use strict';

angular.module('app.ctrl').register.controller('teamEditController', function ($routeParams, userService, ticketService, $timeout) {
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
    self.ticketId = $routeParams.id;

    self.visibilities = [];
    self.assignees = [];
    self.categories = [];
    self.targets = [];
    self.priorities = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        ticketService.get(self.ticketId, function (response) {
            self.ticketForm.visibility.id = response.data.visibility.id.toString();
            self.ticketForm.description = response.data.description;
            self.ticketForm.assignee.id = response.data.assignee.id.toString();
            self.ticketForm.category.id = response.data.category.id.toString();
            self.ticketForm.title = response.data.title;
            self.ticketForm.target.id = response.data.target.id.toString();
            self.ticketForm.customerPriority.id = response.data.customerPriority.id.toString();
        }, function () {
            alert("Invalid get");
        });

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

    self.update = function () {
        if (!self.validateForm(this.ticketForm)) {
            alert("Invalid form");
            return;
        }

        const ticket = self.ticketForm;

        ticketService.update(self.ticketId, ticket, function () {
            alert("Ticket updated");
            window.location.href = "#/team/list";
            }, function () {
            alert("Invalid update");
        });
    };

    self.delete = function () {
        if (confirm("Are you sure you want to delete this team?")) {
            ticketService.delete(self.ticketId, function () {
                alert("Team deleted");
                window.location.href = "#/team/list";
            }, function () {
                alert("Invalid delete");
            });
        }
    };

    self.validateForm = function (form) {
        return form.title.length > 1 &&
            form.description.length > 1;
    };
});