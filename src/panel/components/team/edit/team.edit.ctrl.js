'use strict';

angular.module('app.ctrl').controller('teamEditController', function ($routeParams, userService, teamService, $timeout) {
    const self = this;

    self.teamForm = {
        id: '',
        name: '',
        leader: '',
        searchTerm: ''
    };

    self.users = [];
    self.teamId = $routeParams.id;
    self.members = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        teamService.get(self.teamId, function (response) {
            self.teamForm.name = response.data.name;
            self.teamForm.leader = response.data.leader;
            self.teamForm.members = response.data.members;
        }), function (){
            alert("Invalid get");
        };
    }();

    self.update = function () {
        if (!self.validateForm(this.teamForm)) {
            alert("Invalid form");
            return;
        }

        const team = self.teamForm;

        teamService.update(self.teamId, team, function () {
            alert("Team updated");
            window.location.href = "#/team/list"
        }, function () {
            alert("Invalid update");
        });
    };

    self.create = function () {
        if (!self.validateForm(this.targetForm)) {
            alert("Invalid form");
            return;
        }

        const product = self.targetForm;

        targetService.create(product, function () {
            alert("Target created");
            window.location.href = "#/target/list";
        }, function () {
            alert("Invalid create");
        });
    };

    self.search = function () {
        if (self.teamForm.searchTerm === '') {
            self.users = [];
            return;
        }

        userService.search(self.teamForm.searchTerm, 0, 5, function (response) {
            self.users = response.data.content;
            self.filter();
        }, function () {
            self.users = [];
        });
    };

    self.filter = function () {
        angular.forEach(self.teamForm.members, function (user) {
            var i = self.findById(self.users, user.id);
            if (i !== -1) self.users.splice(i, 1);
        });
    };

    self.validateForm = function (form) {
        return form.name.length > 1 &&
            form.members.length > 1;
    };

    self.addMember = function (user) {
        self.teamForm.members.push(user);
        self.users.splice(self.findById(self.users, user.id), 1);

        self.teamForm.searchTerm = '';
        self.search();
    };

    self.removeMember = function (user) {
        self.teamForm.members.splice(self.findById(self.teamForm.members, user.id), 1);
        if (self.teamForm.leader === user) self.removeLeader();
    };

    self.toggleLeader = function (user) {
        if (self.teamForm.leader === user)
            self.removeLeader();
        else
            self.setLeader(user);
    };

    self.setLeader = function (user) {
        self.removeLeader();
        self.teamForm.leader = user;
    };

    self.removeLeader = function () {
        if (self.teamForm.leader !== '') self.teamForm.leader.checked = false;
        self.teamForm.leader = '';
    };

    self.findById = function (list, id) {
        for (let i = 0; i < list.length; i++)
            if (list[i].id === id)
                return i;
        return -1;
    };

    self.validateForm = function (form) {
        return form.name.length > 1;
    };
});