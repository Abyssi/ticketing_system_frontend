'use strict';

var appSrvc = angular.module('app.srvc', ['ngCookies', 'base64']);

appSrvc.config(function ($provide) {
    appSrvc.register = {service: $provide.service};
});