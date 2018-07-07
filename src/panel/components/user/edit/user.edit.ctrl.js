'use strict';

angular.module('app.ctrl').controller('userEditController', function ($routeParams, userService, $timeout) {
    const self = this;

    self.userForm = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        company: {
            id: ''
        },
        roles: [{
            id: ''
        }]
    };
    self.userId = $routeParams.id;

    self.rolesList = [];
    self.companies = [];



    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        userService.get(self.userId, 'id', function (response) {
            self.userForm.firstName = response.data.firstName;
            self.userForm.lastName = response.data.lastName;
            self.userForm.email = response.data.email;
            self.userForm.company.id = response.data.company.id.toString();
            self.userForm.roles[0].id = response.data.roles[0].id.toString();
        }, function () {
            alert("Invalid get");
        });

        userService.metadata(function (response) {
            self.companies = response.data.companies;
            self.rolesList = response.data.roles;
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid metadata");
        });

    }();

    self.update = function () {
        if (!self.validateForm(this.userForm)) {
            alert("Invalid form");
            return;
        }

        if(self.userForm.password == null || self.userForm.password === ''){
            delete self.userForm.password;
        }

        const user = self.userForm;


        userService.update(self.userId, 'id', user, function () {
            alert("User updated");
            window.location.href = "#/user/list";
        }, function () {
            alert("Invalid update");
        });
    };
    self.validateForm = function (form) {
        return true;
    };
});