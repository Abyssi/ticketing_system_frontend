'use strict';

angular.module('app.ctrl').controller('targetEditController', function ($routeParams, userService, ticketService, targetService) {
    const self = this;

    self.targetForm = {
        title: '',
        version: ''
    };
    self.targetId = $routeParams.id;


    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        targetService.get(self.targetId, function (response) {
            self.targetForm.version = response.data.version;
            self.targetForm.name = response.data.name;
        }, function () {
            alert("Invalid get");
        });

    }();

    self.update = function () {
        if (!self.validateForm(this.targetForm)) {
            alert("Invalid form");
            return;
        }

        const product = self.targetForm;

        targetService.update(self.targetId, product, function () {
            alert("Target updated");
            window.location.reload();
        }, function () {
            alert("Invalid update");
        });
    };

    self.validateForm = function (form) {
        return form.name.length > 1 &&
            form.version.length > 1;
    };

});