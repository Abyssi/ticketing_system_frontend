'use strict';

angular.module('app.drct').directive('sidebarActiveLink', function ($location) {
    return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, elem) {
            //after the route has changed
            scope.$on("$routeChangeSuccess", function () {
                var hrefs = ['/#' + $location.path(),
                    '#' + $location.path(), //html5: false
                    $location.path()]; //html5: true

                angular.forEach(elem.find('a'), function (a) {
                    a = angular.element(a);
                    a.parent().removeClass('active');
                    a.parent().parent().parent().removeClass('opened');
                    a.parent().parent().parent().parent().removeClass('active');
                    a.parent().parent().parent().parent().find("a.collapsible-header").removeClass('active');
                });

                angular.forEach(elem.find('a'), function (a) {
                    a = angular.element(a);
                    if (-1 !== hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active');
                        a.parent().parent().parent().addClass('opened');
                        a.parent().parent().parent().parent().addClass('active');
                        a.parent().parent().parent().parent().find("a.collapsible-header").addClass('active');
                    }
                });

            });
        }
    }
});