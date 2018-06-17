'use strict';

angular.module('app.srvc').service('queryService', function ($http, $q) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.QUERY_API_ENDPOINT = 'api/v1/queries/';
    self.TABLES_METADATA_ENDPOINT = 'tables/';
    self.TABLE_COLUMNS_METADATA_ENDPOINT = '/columns';
    self.DISABLE_QUERY_ENDPOINT = "disable/";
    self.ACTIVATE_QUERY_ENDPOINT = "activate/";

    // API

    self.create = function (query, success, error) {
        self.httpAsync($http.put(self.SERVER_URI + self.QUERY_API_ENDPOINT, query), success, function (response) {
            console.log("Error during create");
            if (error != null) error(response);
        });
    };

    self.get = function (id, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.QUERY_API_ENDPOINT + id), success, function (response) {
            console.log("Error during get");
            if (error != null) error(response);
        });
    };

    self.update = function (id, ticket, success, error) {
        self.httpAsync($http.post(self.SERVER_URI + self.QUERY_API_ENDPOINT + id, ticket), success, function (response) {
            console.log("Error during update");
            if (error != null) error(response);
        });
    };

    self.delete = function (id, success, error) {
        self.httpAsync($http.delete(self.SERVER_URI + self.QUERY_API_ENDPOINT + id), success, function (response) {
            console.log("Error during delete");
            if (error != null) error(response);
        });
    };

    self.list = function (page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.QUERY_API_ENDPOINT + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during list");
            if (error != null) error(response);
        });
    };

    self.disableOne = function(id, success, error) {

        self.httpAsync($http.post(self.SERVER_URI + self.QUERY_API_ENDPOINT + self.DISABLE_QUERY_ENDPOINT + id), success, function (response) {
            console.log("Error during query disabling");
            if (error != null) error(response);
        });

    };

    self.activateOne = function(id, success, error) {

        self.httpAsync($http.post(self.SERVER_URI + self.QUERY_API_ENDPOINT + self.ACTIVATE_QUERY_ENDPOINT + id), success, function (response) {
            console.log("Error during query activating");
            if (error != null) error(response);
        });

    };

    self.metadata = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.QUERY_API_ENDPOINT + "metadata"), success, function (response) {
            console.log("Error during metadata");
            if (error != null) error(response);
        });
    };

    self.getTablesMetadata = function (success, error) {

        self.httpAsync($http.get(self.SERVER_URI + self.QUERY_API_ENDPOINT + self.TABLES_METADATA_ENDPOINT), success, function (response) {
            console.log("Error during tables metadata");
            if (error != null) error(response);
        });

    };

    self.getTableColumnsMetadata = function (tableName, success, error) {

        self.httpAsync($http.get(self.SERVER_URI + self.QUERY_API_ENDPOINT + self.TABLES_METADATA_ENDPOINT + tableName + self.TABLE_COLUMNS_METADATA_ENDPOINT), success, function (response) {
            console.log("Error during tables metadata");
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