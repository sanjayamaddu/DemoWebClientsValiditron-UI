(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngAnimate','ngMaterial','ngMessages','ui.bootstrap'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
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
                    url: '/edit/:id',
                    templateUrl: 'subjects/add-edit.html',
                    controller: 'Subjects.AddEditController',
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
