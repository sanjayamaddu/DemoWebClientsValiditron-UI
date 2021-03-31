(function () {
    'use strict';

    angular
        .module('app').controller('Twintypes.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, TwintypeService,SubjectService) {
        var vm = this;

		 $scope.twinTypes = ["MZ","DZ"];



        vm.title = 'Set Twin Relationship';
        vm.twintype = {}
        vm.subject = {};
        vm.saveTwintype = saveTwintype;
		$scope.twintype_error_show=false;
		$scope.twintype_error="";
		vm.changeRelativeList=changeRelativeList;
		vm.siblings=[];
  vm.fhirlogpatients = '';
  vm.createpatients = '';
        initController();

        function initController() {
			
			TwintypeService.fetchSessionsByID('session_createparent')
						            .then(
						            function(d) {
										if (d.log!=null && d.log!=""){
										vm.fhirlogpatients="*-*-*-* Register user *-*-*-*\n\n";
										vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
									TwintypeService.fetchSessionsByID('session_getparents')
						            .then(
						            function(d) {
						                if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* Fetch user data to populate user table *-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
										
										TwintypeService.fetchSessionsByID('session_createcheckin')
						            .then(
						            function(d) {
						                if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* *-*-*-* *-*-*-* Create check-in *-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
										
										TwintypeService.fetchSessionsByID('session_getencounters')
						            .then(
						            function(d) {
						                 if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* Fetch check-in data to populate check-in table *-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
										TwintypeService.fetchSessionsByID('session_getparent_covid_id')
						            .then(
						            function(d) {
						                 if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* Fetch data for user with CovidCare ID*-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
										TwintypeService.fetchSessionsByID('session_getencounter_fhir_id')
						            .then(
						            function(d) {
						                 if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* *-*-*-* Fetch data for check-in with ID*-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
									
        );
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
									
        );
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
									
        );
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
									
        );
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
									
        );
										
						            },
						            function(errResponse){
						                console.error('Error while fetching subjects');
						            }
        );
		 
         
		
		
		
		
		
        
									
		
		
		
        
        };

		function changeRelativeList(subjectUID){
           vm.siblings=[];
		  SubjectService.fetchAllSiblingsBySubject(subjectUID)
						            .then(
						            function(d) {
						              
										vm.siblings=d.subjectUids;
										
						            },
						            function(errResponse){
						                console.error('Error while fetching siblings');
						            }
        );

		};

        function saveTwintype() {
            // save twintype
            TwintypeService.createTwintype(vm.twintype).then(
            function(d) {
                vm.twintype = d;
				$scope.twintype_error_show=false;
				$state.go('twintypes');
				 // redirect to subjects view
				 $scope.$emit('twintypes-updated');
				 // emit event so list controller can refresh
            },
            function(errResponse){
                console.error('Error while fetching twintypes');
				$scope.twintype_error=errResponse.data;
				$scope.twintype_error_show=true;
            }
        );

           
        }
    }

})();