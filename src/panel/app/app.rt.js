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
        .when('/ticket/list/:page/:searchTerm', {
            templateUrl: 'components/ticket/list/ticket.list.tmpl.html',
            controller: 'ticketListController as ticketListController'
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
        .when('/query/create/custom', {
            templateUrl: 'components/query/create/custom/query.custom.create.tmpl.html',
            controller: 'queryCustomCreateController as queryCustomCreateController'
        })

        .when('/query/create/tree_path/type', {
            templateUrl: 'components/query/create/tree_path_generation/query_type/query.type.tmpl.html',
            controller: 'queryTypeController as queryTypeController'
        })

        .when('/query/create/tree_path/table/list/:page', {
            templateUrl: 'components/query/create/tree_path_generation/table/list/table.list.tmpl.html',
            controller: 'queryTableListController as queryTableListController'
        })
        .when('/query/create/tree_path/table/list', {redirectTo: '/query/create/tree_path/table/list/1'})

        .when('/query/edit/:id', {
            templateUrl: 'components/query/edit/query.edit.tmpl.html',
            controller: 'queryEditController as queryEditController'
        })
        .when('/query/list/:page', {
            templateUrl: 'components/query/list/query.list.tmpl.html',
            controller: 'queryListController as queryListController'
        })
        .when('/query/list', {redirectTo: '/query/list/1'})

        .when('/target/create', {
            templateUrl: 'components/target/create/target.create.tmpl.html',
            controller: 'targetCreateController as targetCreateController'
        })
        .when('/target/edit/:id', {
            templateUrl: 'components/target/edit/target.edit.tmpl.html',
            controller: 'targetEditController as targetEditController'
        })
        .when('/target/list/:page', {
            templateUrl: 'components/target/list/target.list.tmpl.html',
            controller: 'targetListController as targetListController'
        })
        .when('/target/list', {redirectTo: '/target/list/1'})

        .otherwise({redirectTo: '/profile'});
});