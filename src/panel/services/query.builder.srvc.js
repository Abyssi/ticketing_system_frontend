'use strict';

angular.module('app.srvc').service('queryBuilderService', function () {

    const self = this;

    self.query = null;

    self.refresh = function () {

        self.query = null;

    };

    self.get = function () {

        return self.query;

    };

    self.set = function (q) {

        self.query = q;

    };


});