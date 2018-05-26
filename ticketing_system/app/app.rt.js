'use strict';

angular.module('app.rt', ['ngRoute']).config(function ($locationProvider, $routeProvider) {

    var route = function (templateUrl, controller, service, dependencies) {
        var route = {};
        if (templateUrl != null) route.templateUrl = templateUrl;
        if (controller != null) route.controller = controller;
        if (service != null) route.service = service;
        if (dependencies != null) {
            route.resolve = {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var deferred = $q.defer();
                    $script(dependencies, function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                }]
            };
        }
        return route;
    };

    var resolveRoute = function (basePath, name, controller, services) {
        return route(basePath + name + "/" + name + ".tmpl.html", controller, null, (services == null ? [] : services).concat([basePath + name + "/" + name + ".ctrl.js"]));
    };

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/register', resolveRoute("components/", "register", "registerController as registerController", ["services/user.srvc.js"]))
        .when('/login', resolveRoute("components/", "login", "loginController as loginController", ["services/user.srvc.js"]))
        .otherwise({redirectTo: '/login'});
});