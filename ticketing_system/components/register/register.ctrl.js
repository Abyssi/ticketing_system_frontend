'use strict';

angular.module('app.ctrl').register.controller('registerController', function (userService) {
    const self = this;

    self.registerForm = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

    self.register = function () {
        if (!self.validateForm(this.registerForm)) {
            alert("Invalid form");
            return;
        }

        const user = {
            firstName: self.registerForm.firstName,
            lastName: self.registerForm.firstName,
            email: self.registerForm.email,
            password: self.registerForm.password
        };

        userService.register(user, function () {
            alert("Account registered");
            window.location.href = "#/login";
        }, function () {
            alert("Invalid register");
        });
    };

    self.validateForm = function (form) {
        return form.firstName.length > 1 &&
            form.lastName.length > 1 &&
            form.email.length > 1 &&
            form.password.length > 1 &&
            form.confirmPassword.length > 1 &&
            form.password === form.confirmPassword;
    };

});