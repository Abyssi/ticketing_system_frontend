'use strict';

var appCtrl = angular.module('app.ctrl', ['ngRoute']);

appCtrl.config(function ($controllerProvider) {
    appCtrl.register = {controller: $controllerProvider.register};
});