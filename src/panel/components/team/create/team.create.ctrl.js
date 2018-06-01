'use strict';

angular.module('app.ctrl').controller('teamCreateController', function (userService, teamService, $timeout) {
    const self = this;

    self.teamForm = {
        name: '',
        leader: '',
        searchTerm: '',
        members: []
    };

    self.users = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";
    }();

    self.create = function () {
        if (!self.validateForm(self.teamForm)) {
            alert("Invalid form");
            return;
        }

        const team = {
            name: self.teamForm.name,
            leader: {id: self.teamForm.leader.id},
            members: []
        };

        angular.forEach(self.teamForm.members, function (member) {
            team.members.push({id: member.id});
        });

        console.log(team);

        teamService.create(team, function () {
            alert("Team created");
            window.location.href = "#/team/list";
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
        self.users.push(user);
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
});