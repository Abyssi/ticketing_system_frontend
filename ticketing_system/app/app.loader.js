'use strict';

$script('bower_components/angular/angular.js', 'angular');
$script.ready('angular', function () {
    $script(['bower_components/angular-route/angular-route.js', 'bower_components/angular-cookies/angular-cookies.js', 'bower_components/angular-base64/angular-base64.js'], 'angular-dep');

    $script.ready('angular-dep', function () {
        $script(['app/app.cnfg.js', 'app/app.ctrl.js', 'app/app.drct.js', 'app/app.fctr.js', 'app/app.fltr.js', 'app/app.rt.js', 'app/app.srvc.js'], 'ticketing_system-dep');

        $script.ready('ticketing_system-dep', function () {
            $script('app/app.js', function () {
                angular.bootstrap(document, ['app'])
                angular.element(document).find('html').addClass('ng-app');
            });
        });
    });
});




