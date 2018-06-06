'use strict'

angular.module('app.ctrl').controller('queryCreateController', function (userService, $timeout) {
    const self = this;

    self.init = function () {

        if (!userService.isLogged()) window.location.href = "../";

    }();

});