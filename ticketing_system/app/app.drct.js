'use strict';

var appDrct = angular.module('app.drct', []);

appDrct.config(function ($compileProvider) {
    appDrct.register = {directive: $compileProvider.directive};
});