'use strict';

angular.module('app.ctrl').controller('queryCreateController', function (userService, $timeout) {
    const self = this;

    self.toQueryCreation = function(href) {

        //go to next step
        window.location.href = href;

    };

    self.init = function () {

        if (!userService.isLogged()) window.location.href = "../";

    }();

});