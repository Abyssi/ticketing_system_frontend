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
        .when('/profile', resolveRoute("components/", "profile", "profileController as profileController", ["services/user.srvc.js"]))
        .when('/logout', resolveRoute("components/", "logout", "logoutController as logoutController", ["services/user.srvc.js"]))
        .when('/ticketList', {redirectTo: '/ticketList/1'})
        .when('/ticketList/:page', resolveRoute("components/", "ticketList", "ticketListController as ticketListController", ["services/user.srvc.js", "services/ticket.srvc.js"]))
        .when('/ticketCreate', resolveRoute("components/", "ticketCreate", "ticketCreateController as ticketCreateController", ["services/user.srvc.js", "services/ticket.srvc.js"]))
        .when('/ticketEdit/:id', resolveRoute("components/", "ticketEdit", "ticketEditController as ticketEditController", ["services/user.srvc.js", "services/ticket.srvc.js"]))

        .otherwise({redirectTo: '/profile'});
});