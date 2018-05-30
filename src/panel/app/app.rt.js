'use strict';

angular.module('app.rt', ['ngRoute']).config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/profile', {
            templateUrl: 'components/profile/profile.tmpl.html',
            controller: 'profileController as profileController'
        })
        .when('/logout', {
            templateUrl: 'components/logout/logout.tmpl.html',
            controller: 'logoutController as logoutController'
        })

        .when('/ticket/create', {
            templateUrl: 'components/ticket/create/ticket.create.tmpl.html',
            controller: 'ticketCreateController as ticketCreateController'
        })
        .when('/ticket/edit/:id', {
            templateUrl: 'components/ticket/edit/ticket.edit.tmpl.html',
            controller: 'ticketEditController as ticketEditController'
        })
        .when('/ticket/list/:page', {
            templateUrl: 'components/ticket/list/ticket.list.tmpl.html',
            controller: 'ticketListController as ticketListController'
        })
        .when('/ticket/list', {redirectTo: '/ticket/list/1'})

        .when('/team/create', {
            templateUrl: 'components/team/create/team.create.tmpl.html',
            controller: 'teamCreateController as teamCreateController'
        })
        .when('/team/edit/:id', {
            templateUrl: 'components/team/edit/team.edit.tmpl.html',
            controller: 'teamEditController as teamEditController'
        })
        .when('/team/list/:page', {
            templateUrl: 'components/team/list/team.list.tmpl.html',
            controller: 'teamListController as teamListController'
        })
        .when('/team/list', {redirectTo: '/team/list/1'})

        .when('/query/create', {
            templateUrl: 'components/query/create/query.create.tmpl.html',
            controller: 'queryCreateController as queryCreateController'
        })
        .when('/query/edit/:id', {
            templateUrl: 'components/query/edit/query.edit.tmpl.html',
            controller: 'queryEditController as queryEditController'
        })
        .when('/query/list/:page', {
            templateUrl: 'components/query/list/query.list.tmpl.html',
            controller: 'queryListController as queryListController'
        })
        .when('/query/list', {redirectTo: '/query/list/1'})

        .when('/product/create', {
            templateUrl: 'components/product/create/product.create.tmpl.html',
            controller: 'productCreateController as productCreateController'
        })
        .when('/product/edit/:id', {
            templateUrl: 'components/product/edit/product.edit.tmpl.html',
            controller: 'productEditController as productEditController'
        })
        .when('/product/list/:page', {
            templateUrl: 'components/product/list/product.list.tmpl.html',
            controller: 'productListController as productListController'
        })
        .when('/product/list', {redirectTo: '/product/list/1'})

        .otherwise({redirectTo: '/profile'});
});