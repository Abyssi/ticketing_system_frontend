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

<<<<<<< HEAD
        .when('/team/create', resolveRoute("components/team/create", "team.create", "teamCreateController as teamCreateController", ["services/user.srvc.js", "services/team.srvc.js"]))
        .when('/team/edit/:id', resolveRoute("components/team/edit", "team.edit", "teamEditController as teamEditController", ["services/user.srvc.js", "services/team.srvc.js"]))
        .when('/team/list/:page', resolveRoute("components/team/list", "team.list", "teamListController as teamListController", ["services/user.srvc.js", "services/team.srvc.js"]))
        .when('/team/list', {redirectTo: '/team/list/1'})

        .when('/query/create', resolveRoute("components/query/create", "query.create", "queryCreateController as queryCreateController", ["services/user.srvc.js", "services/query.srvc.js"]))
        .when('/query/edit/:id', resolveRoute("components/query/edit", "query.edit", "queryEditController as queryEditController", ["services/user.srvc.js", "services/query.srvc.js"]))
        .when('/query/list/:page', resolveRoute("components/query/list", "query.list", "queryListController as queryListController", ["services/user.srvc.js", "services/query.srvc.js"]))
        .when('/query/list', {redirectTo: '/query/list/1'})
=======
        .when('/product/create', resolveRoute("components/product/create", "product.create", "productCreateController as productCreateController", ["services/user.srvc.js", "services/ticket.srvc.js", "services/product.srvc.js"]))
        .when('/product/edit/:id', resolveRoute("components/product/edit", "product.edit", "productEditController as productEditController", ["services/user.srvc.js", "services/ticket.srvc.js", "services/product.srvc.js"]))
        .when('/product/list/:page', resolveRoute("components/product/list", "product.list", "productListController as productListController", ["services/user.srvc.js", "services/ticket.srvc.js", "services/product.srvc.js"]))
        .when('/product/list', {redirectTo: '/product/list/1'})

>>>>>>> origin/master

        .otherwise({redirectTo: '/profile'});
});