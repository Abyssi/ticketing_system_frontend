'use strict';

angular.module('app.srvc').service('userService', function ($http, $q, $cookies, $base64) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.USER_API_ENDPOINT = 'api/v1/users/';

    // API

    self.register = function (user, success, error) {
        self.httpAsync($http.put(self.SERVER_URI + self.USER_API_ENDPOINT, user), success, function (response) {
            console.log("Error during registration");
            if (error != null) error(response);
        });
    };

    self.update = function (term, type, user, success, error) {
        self.httpAsync($http.post(self.SERVER_URI + self.USER_API_ENDPOINT + term + "?type=" + type, user), success, function (response) {
            console.log("Error during update");
            if (error != null) error(response);
        });
    };

    self.self = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.USER_API_ENDPOINT + "self"), success, function (response) {
            console.log("Error during self");
            if (error != null) error(response);
        });
    };

    self.list = function (page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.USER_API_ENDPOINT + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during list");
            if (error != null) error(response);
        });
    };

    self.search = function (email, page, pageSize, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.USER_API_ENDPOINT + "search/" + email + "?page=" + page + (pageSize != null ? "&pageSize=" + pageSize : "")), success, function (response) {
            console.log("Error during list");
            if (error != null) error(response);
        });
    };

    self.metadata = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.USER_API_ENDPOINT + "metadata"), success, function (response) {
            console.log("Error during metadata");
            if (error != null) error(response);
        });
    };

    self.get = function (term, type, success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.USER_API_ENDPOINT + term + "?type=" + type), success, function (response) {
            console.log("Error during get");
            if (error != null) error(response);
        });
    };

    self.delete = function (term, type, success, error) {
        self.httpAsync($http.delete(self.SERVER_URI + self.USER_API_ENDPOINT + +term + "?type=" + type), success, function (response) {
            console.log("Error during delete");
            if (error != null) error(response);
        });
    };

    // Authentication

    self.isLogged = function () {
        return $cookies.get("access_token") != null;
    };

    self.login = function (user, success, error) {
        const encodedAuth = $base64.encode("clientId:BkjmTpIYMWKVPBz");

        const req = {
            method: 'POST',
            url: self.SERVER_URI + "oauth/token",
            headers: {
                "Authorization": "Basic " + encodedAuth,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            transformRequest: self.urlEncode,
            data: {username: user.username, password: user.password, grant_type: 'password'}
        };

        self.httpAsync($http(req), function (response) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                $cookies.put("access_token", response.data.access_token, {path: '/'});
                if (success != null) success(response);
            },
            function (response) {
                console.log("Error during login");
                if (error != null) error(response);
            });
    };

    self.logout = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + "oauth/revoke-token"), function (response) {
            $http.defaults.headers.common.Authorization = null;
            $cookies.remove("access_token", {path: '/'});
            if (success != null) success(response);
        }, function (response) {
            console.log("Error during logout");
            if (error != null) error(response);
        });
    };

    // Initialization

    self.init = function () {
        if (self.isLogged())
            $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get("access_token");
    }();

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

    self.urlEncode = function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    self.hasRole = function (checkRole) {
        var rolesList = [];
        self.self(function (response) {
            angular.forEach(response.data["roles"], function (value, key) {
                rolesList.push(value.name);
                console.log(value.name);
            })
        }, function () {
            userService.logout(function () {
                window.location.href = "../";
            });
            alert("Invalid self");
        });
        return rolesList[0] === checkRole;
    }

});