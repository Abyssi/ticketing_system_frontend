'use strict';

angular.module('app.ctrl').controller('teamCreateController', function (userService, teamService, $timeout) {
    const self = this;

    self.teamForm = {
        name: '',
        leader: '',
        members: []
    };

    self.users = [];

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        userService.list(0, 50, function (response) {
            self.users = response.data.content;
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid list");
        });
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

    self.validateForm = function (form) {
        return form.name.length > 1 &&
            form.members.length > 1;
    };

    self.addMember = function (user) {
        self.teamForm.members.push(user);
        self.users.splice(self.findById(self.users, user.id), 1);
    };

    self.removeMember = function (user) {
        self.teamForm.members.splice(self.findById(self.teamForm.members, user.id), 1);
        self.users.push(user);
        if (self.teamForm.leader === user) self.removeLeader();
    };

    self.setLeader = function (user) {
        self.teamForm.leader = user;
    };

    self.removeLeader = function () {
        self.teamForm.leader = '';
    };

    self.findById = function (list, id) {
        for (let i = 0; i < list.length; i++)
            if (list[i].id === id)
                return i;
        return -1;
    };
});