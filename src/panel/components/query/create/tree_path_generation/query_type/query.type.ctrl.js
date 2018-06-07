'use strict'

angular.module('app.ctrl').controller('queryTypeController', function (userService, $timeout) {
    const self = this;

    self.init = function () {

        if (!userService.isLogged()) window.location.href = "../";

    }();

});