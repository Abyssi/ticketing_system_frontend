'use strict';

angular.module('app.srvc').service('targetService', function ($http, $q) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.TARGET_API_ENDPOINT = 'api/v1/targets/';

    // API

    self.create = function (target, success, error) {
        self.httpAsync($http.put(self.SERVER_URI + self.TARGET_API_ENDPOINT, target), success, function (response) {
            console.log("Error during create");
            if (error != null) error(response);
        });
    };

    self.get = function (id, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.TARGET_API_ENDPOINT + id), success, function (response) {
            console.log("Error during get");
            if (error != null) error(response);
        });
    };

    self.update = function (id, target, success, error) {
        self.httpAsync($http.post(self.SERVER_URI + self.TARGET_API_ENDPOINT + id, target), success, function (response) {
            console.log("Error during update");
            if (error != null) error(response);
        });
    };

    self.delete = function (id, success, error) {
        self.httpAsync($http.delete(self.SERVER_URI + self.TARGET_API_ENDPOINT + id), success, function (response) {
            console.log("Error during delete");
            if (error != null) error(response);
        });
    };

    self.list = function (page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.TARGET_API_ENDPOINT + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during list");
            if (error != null) error(response);
        });
    };

    // Support functions

    self.httpAsync = function (httpRequest, success, error) {
        const deferred = $q.defer();
        httpRequest.then(
            function (response) {
                if (success != null) success(response);
                deferred.resolve(response);
            },
            function (response) {
                if (error != null) error(response);
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };

});