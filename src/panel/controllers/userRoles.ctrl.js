'use strict';

angular.module('app.ctrl').controller('userRolesController', function (userService) {
    const self = this;

    self.roles = [];


    self.init = function () {
        userService.self(function (response) {
            angular.forEach(response.data["roles"], function(value, key){
                self.roles.push(value.name);
                console.log(value.name);
            })
        }, null
        );
    }();


    self.hasRole = function (roles) {
        for (let i = 0; i < roles.length; i++)
            if (self.roles.indexOf(roles[i]) !== -1) return true;
    };
});