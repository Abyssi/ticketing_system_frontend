'use strict';

angular.module('app.ctrl').controller('logoutController', function (userService) {
    const self = this;
    self.init = function () {
        userService.logout(function () {
            window.location.href = "../"
        });
    }();
});