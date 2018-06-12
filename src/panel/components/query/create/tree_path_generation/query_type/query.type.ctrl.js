'use strict'

angular.module('app.ctrl').controller('queryTypeController', function (userService, queryBuilderService, $timeout) {
    const self = this;

    self.query = {
        queryText: '',
        description: '',
        queryPriority: {
            id: ''
        },
        cron: '',
        comparisonOperator: '',
        referenceValue: '',
        queryType: ''
    };

    self.refreshQuery = function () {

        queryBuilderService.refresh()

    };

    self.setQueryType = function (queryType, href) {

        self.query.queryType = queryType;

        queryBuilderService.set(self.query);

        //go to next step
        window.location.href = href;

    };

    self.init = function () {

        //refresh query in every situation
        self.refreshQuery();

        if (!userService.isLogged()) window.location.href = "../";


    }();

});