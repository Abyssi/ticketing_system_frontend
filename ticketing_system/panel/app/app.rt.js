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
        return route(basePath + "/" + name + ".tmpl.html", controller, null, (services == null ? [] : services).concat([basePath + "/" + name + ".ctrl.js"]));
    };

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/profile', resolveRoute("components/profile", "profile", "profileController as profileController", ["services/user.srvc.js"]))
        .when('/logout', resolveRoute("components/logout", "logout", "logoutController as logoutController", ["services/user.srvc.js"]))

        .when('/ticket/create', resolveRoute("components/ticket/create", "ticket.create", "ticketCreateController as ticketCreateController", ["services/user.srvc.js", "services/ticket.srvc.js"]))
        .when('/ticket/edit/:id', resolveRoute("components/ticket/edit", "ticket.edit", "ticketEditController as ticketEditController", ["services/user.srvc.js", "services/ticket.srvc.js"]))
        .when('/ticket/list/:page', resolveRoute("components/ticket/list", "ticket.list", "ticketListController as ticketListController", ["services/user.srvc.js", "services/ticket.srvc.js"]))
        .when('/ticket/list', {redirectTo: '/ticket/list/1'})

        .otherwise({redirectTo: '/profile'});
});