'use strict';

angular.module('app.ctrl').controller('profileController', function (userService) {
    const self = this;

    self.profileForm = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '', roles: ''};

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";
        userService.self(function (response) {
            self.profileForm.firstName = response.data["firstName"];
            self.profileForm.lastName = response.data["lastName"];
            self.profileForm.email = response.data["email"];
            self.profileForm.roles = angular.toJson(response.data["roles"]);
        }, function () {
            userService.logout(function () {
                window.location.href = "../";
            });
            alert("Invalid self");
        });
    }();

    self.update = function () {
        if (!self.validateForm(this.profileForm)) {
            alert("Invalid form");
            return;
        }

        const user = {
            firstName: self.profileForm.firstName,
            lastName: self.profileForm.firstName,
            email: self.profileForm.email,
            password: self.profileForm.password,
            roles: self.profileForm.roles

        };

        userService.update(user.email, "email", user, function () {
            alert("Profile updated");
        }, function () {
            alert("Invalid update");
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