'use strict';

angular.module('app.fltr').filter('toPrettyCron', function () {
    return function (cronString) {
        return cronstrue.toString(cronString, {locale: "en"});
    };
});