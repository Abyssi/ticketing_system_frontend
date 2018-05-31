'use strict';

angular.module('app.rt', ['ngRoute']).config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/register', {
            templateUrl: 'components/register/register.tmpl.html',
            controller: 'registerController as registerController'
        })
        .when('/login', {
            templateUrl: 'components/login/login.tmpl.html',
            controller: 'loginController as loginController'
        })
        .otherwise({redirectTo: '/login'});
});