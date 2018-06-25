'use strict';

angular.module('app.srvc').service('recordService', function ($http, $q) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.RECORD_API_ENDPOINT = 'api/v1/records/';

    // API

    self.get = function (id, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.RECORD_API_ENDPOINT + id), success, function (response) {
            console.log("Error during get");
            if (error != null) error(response);
        });
    };

    self.list = function (page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.RECORD_API_ENDPOINT + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during list");
            if (error != null) error(response);
        });
    };

    self.search = function (tag, page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.RECORD_API_ENDPOINT + "search/" + tag + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during list");
            if (error != null) error(response);
        });
    };

    self.metadata = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.RECORD_API_ENDPOINT + "metadata"), success, function (response) {
            console.log("Error during metadata");
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