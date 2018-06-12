'use strict';

angular.module('app.drct').directive('adaptiveTextArea', function () {
    return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, element, attr) {
            var update = function() {
                var height = element[0].scrollHeight > 0 ? element[0].scrollHeight : 150;
                element.css('height', (height < 150 ? height : 150) + 'px');
            };

            scope.$watch(element[0].value, update);
            element.bind("input change selectionchange propertychange", update);

        }
    };
});