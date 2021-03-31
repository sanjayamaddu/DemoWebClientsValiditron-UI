(function () {
    'use strict';

    angular
        .module('app').controller('Fhirlogs.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, FhirlogService) {
        var vm = this;

		 $scope.twinTypes = ["MZ","DZ"];



        
        vm.fhirlog = {};
       

        initController();

        function initController() {
            
            FhirlogService.fetchSessionsByID('session_getparents')
						            .then(
						            function(d) {
						                vm.fhirlog = d.log;
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
        );
        }

		

        
    }

})();