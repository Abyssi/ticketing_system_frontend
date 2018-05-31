'use strict';

angular.module('app.fltr').filter('toPrettyCron', function () {
    return function (cronString) {
        return prettyCron.toString(cronString);
    };
});