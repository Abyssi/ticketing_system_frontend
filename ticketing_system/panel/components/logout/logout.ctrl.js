'use strict';

angular.module('app.ctrl').register.controller('logoutController', function (userService) {
    const self = this;
    self.init = function () {
        userService.logout(function () {
            window.location.href = "../"
        });
    }();
});