'use strict';

angular.module('app.srvc').register.service('ticketService', function ($http, $q, $cookies, userService) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.TICKET_API_ENDPOINT = 'api/v1/tickets/';

    self.get = function (page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.TICKET_API_ENDPOINT + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during get");
            if (error != null) error(response);
        });
    };

    self.create = function (ticket, success, error) {
        self.httpAsync($http.put(self.SERVER_URI + self.TICKET_API_ENDPOINT, ticket), success, function (response) {
            console.log("Error during create");
            if (error != null) error(response);
        });
    };

    self.metadata = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.TICKET_API_ENDPOINT + "metadata"), success, function (response) {
            console.log("Error during metadata");
            if (error != null) error(response);
        });
    };

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

    self.init = function () {
        if (userService.isLogged())
            $http.defaults.headers.common["Authorization"] = 'Bearer ' + $cookies.get("access_token");
    }();
});