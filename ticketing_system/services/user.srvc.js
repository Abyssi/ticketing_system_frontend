'use strict';

angular.module('app.srvc').register.service('userService', function ($http, $q, $cookies, $base64) {
    const self = this;

    self.SERVER_URI = 'http://localhost:8200/';
    self.USER_API_ENDPOINT = 'api/v1/users/';

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
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data["access_token"];
                $cookies.put("access_token", response.data["access_token"], {path: '/'});
                if (success != null) success(response);
            },
            function (response) {
                console.log("Error during login");
                if (error != null) error(response);
            });
    };

    self.isLogged = function () {
        return $cookies.get("access_token") != null;
    };

    self.logout = function (success) {
        $http.defaults.headers.common.Authorization = null;
        $cookies.remove("access_token", {path: '/'});
        if (success != null) success();
    };

    self.register = function (user, success, error) {
        self.httpAsync($http.put(self.SERVER_URI + self.USER_API_ENDPOINT + "register", user), success, function (response) {
            console.log("Error during registration");
            if (error != null) error(response);
        });
    };

    self.self = function (success, error) {
        self.httpAsync($http.get(self.SERVER_URI + self.USER_API_ENDPOINT + "self"), success, function (response) {
            console.log("Error during self");
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

    self.urlEncode = function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    self.init = function () {
        if (self.isLogged())
            $http.defaults.headers.common["Authorization"] = 'Bearer ' + $cookies.get("access_token");
    }();

});