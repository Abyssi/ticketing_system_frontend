'use strict';

angular.module('app.srvc').service('productService', function ($http, $q) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.PRODUCT_API_ENDPOINT = 'api/v1/products/';

    // API

    self.create = function (product, success, error) {
        self.httpAsync($http.put(self.SERVER_URI + self.PRODUCT_API_ENDPOINT, product), success, function (response) {
            console.log("Error during create");
            if (error != null) error(response);
        });
    };

    self.get = function (id, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.PRODUCT_API_ENDPOINT + id), success, function (response) {
            console.log("Error during get");
            if (error != null) error(response);
        });
    };

    self.update = function (id, product, success, error) {
        self.httpAsync($http.post(self.SERVER_URI + self.PRODUCT_API_ENDPOINT + id, product), success, function (response) {
            console.log("Error during update");
            if (error != null) error(response);
        });
    };

    self.delete = function (id, success, error) {
        self.httpAsync($http.delete(self.SERVER_URI + self.PRODUCT_API_ENDPOINT + id), success, function (response) {
            console.log("Error during delete");
            if (error != null) error(response);
        });
    };

    self.list = function (page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.PRODUCT_API_ENDPOINT + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
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