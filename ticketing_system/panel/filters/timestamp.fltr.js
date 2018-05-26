'use strict';

angular.module('app.fltr').filter('toYear', function () {
    return function (dateString) {
        var diff = new Date() - new Date(dateString);
        return Math.floor(diff * 1.15741e-8) + " days ago";
    };
});