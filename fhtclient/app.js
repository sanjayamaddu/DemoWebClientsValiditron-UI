(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngAnimate','ngMaterial','ngMessages','ui.bootstrap','ae-datetimepicker'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider,$mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('L') : '';
          };
      
          
          $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
          };



        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
             .state('subjects', {
                url: '/',
                templateUrl: 'subjects/main.html',
                controller: 'Subjects.MainController',
                controllerAs: 'vm'
            })
          .state('subjects.add', {
                    url: '/add',
                    templateUrl: 'subjects/add-edit.html',
                    controller: 'Subjects.AddEditController',
                    controllerAs: 'vm'
                })
          .state('subjects.edit', {
                    url: '/edit',
                    templateUrl: 'subjects/edit.html',
                    controller: 'Subjects.EditController',
                    controllerAs: 'vm'
                });
	}

    function run($rootScope, SubjectService) {
          $rootScope.clinicID=1858;
          $rootScope.clinicName="Kane Medical";
        // track current state for active tab
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
        });
    }

})();
