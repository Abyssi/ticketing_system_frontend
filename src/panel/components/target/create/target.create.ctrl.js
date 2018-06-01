'use strict';

angular.module('app.ctrl').controller('targetCreateController', function (userService, ticketService, targetService, $timeout) {
    const self = this;

    self.targetForm = {
        name: '',
        version: ''
    };

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        ticketService.metadata(function (response) {
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid metadata");
        });
    }();

    self.create = function () {
        if (!self.validateForm(this.targetForm)) {
            alert("Invalid form");
            return;
        }

        const product = self.targetForm;

        targetService.create(product, function () {
            alert("Target created");
            window.location.href = "#/target/list";
        }, function () {
            alert("Invalid create");
        });
    };

    self.validateForm = function (form) {
        return form.name.length > 1 &&
            form.version.length > 1;
    };
});