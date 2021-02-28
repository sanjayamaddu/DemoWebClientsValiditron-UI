(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngAnimate','ngMaterial','ngMessages','ui.bootstrap','ae-datetimepicker'])
        .config(config)
		.run(run)
		
    function config($stateProvider, $urlRouterProvider,$mdDateLocaleProvider) {
	/**	
	$mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('L') : '';
    };

    
    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
*/

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
                    url: '/edit/:refid/:id',
                    templateUrl: 'subjects/add-edit.html',
                    controller: 'Subjects.AddEditController',
                    controllerAs: 'vm'
                })
	.state('relationships', {
                url: '/checkin',
                templateUrl: 'relationships/main.html',
                controller: 'Relationships.MainController',
                controllerAs: 'vm'
            })
                .state('relationships.add', {
                    url: '/add',
                    templateUrl: 'relationships/add-edit.html',
                    controller: 'Relationships.AddEditController',
                    controllerAs: 'vm'
                })
				.state('relationships.edit', {
                    url: '/edit/:id',
                    templateUrl: 'relationships/add-edit.html',
                    controller: 'Relationships.AddEditController',
                    controllerAs: 'vm'
                })
				.state('relationships.checkin', {
                    url: '/add/:covidcareID',
                    templateUrl: 'relationships/add-edit.html',
                    controller: 'Relationships.AddEditController',
                    controllerAs: 'vm'
                })

    }

    function run($rootScope, SubjectService) {
        // add some initial subjects
       // if (SubjectService.GetAll().length === 0) {
         //   SubjectService.Save({ firstname: 'Boardies', lastname: '25.00' });
           // SubjectService.Save({ firstname: 'Singlet', lastname: '9.50' });
            //SubjectService.Save({ firstname: 'Thongs (Flip Flops)', lastname: '12.95' });
        //}

        // track current state for active tab
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
        });
    }

})();