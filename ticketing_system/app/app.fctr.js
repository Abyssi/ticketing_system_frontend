'use strict';

var appFctr = angular.module('app.fctr', []);

appFctr.config(function ($provide) {
    appFctr.register = {factory: $provide.factory};
});