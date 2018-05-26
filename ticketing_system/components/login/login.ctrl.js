'use strict';

angular.module('app.ctrl').register.controller('loginController', function (userService) {
    const self = this;

    self.loginForm = {email: '', password: ''};

    self.init = function () {
        if (userService.isLogged()) window.location.href = "panel";
    }();

    self.login = function () {
        if (!self.validateForm(this.loginForm)) {
            alert("Invalid form");
            return;
        }

        const user = {
            username: self.loginForm.email,
            password: self.loginForm.password,
        };

        userService.login(user, function () {
            window.location.href = "panel";
        }, function () {
            alert("Invalid login");
        });
    };

    self.validateForm = function (form) {
        return form.email.length > 1 && form.password.length > 1;
    };
});