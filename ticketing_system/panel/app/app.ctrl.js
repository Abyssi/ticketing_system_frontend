'use strict';

var appCtrl = angular.module('app.ctrl', []);

appCtrl.config(function ($controllerProvider) {
    appCtrl.register = {controller: $controllerProvider.register};
});