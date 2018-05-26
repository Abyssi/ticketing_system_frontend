'use strict';

var appFltr = angular.module('app.fltr', []);

appFltr.config(function ($filterProvider) {
    appFltr.register = {filter: $filterProvider.register};
});