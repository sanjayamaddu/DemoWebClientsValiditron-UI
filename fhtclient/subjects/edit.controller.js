(function () {
    'use strict';

    angular
        .module('app').controller('Subjects.EditController', Controller);

    function Controller($scope, $state, $stateParams, SubjectService,$rootScope) {
        var vm = this;

        $scope.subject_error_show=false;
		$scope.subject_error="";
        $scope.isDisabled = false;
        $scope.referralClinics=[];
		vm.fhirlogpatients='';

        vm.title = 'Set Referral Clinic';
        //vm.selectedreferralClinicName=$rootScope.clinicName;
        vm.subject = {};
        

        initController();

        function initController() {
            SubjectService.fetchSessionsByID("session_fht_getpatient").then(
                function(d) {
                    if (d.log!=null && d.log!=""){
										vm.fhirlogpatients="*-*-*-* Fetching alert data for "+$rootScope.clinicName+" clinic *-*-*-*\n\n";
										vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
                                        SubjectService.fetchSessionsByID("session_fht_getencounters").then(
                                            function(d) {
                                                if (d.log!=null && d.log!=""){
                                                                    // vm.fhirlogpatients+="*-*-*-* Fetching alert data for "+$rootScope.clinicName+" clinic *-*-*-*\n\n";
                                                                    vm.fhirlogpatients+= d.log;
                                                                    vm.fhirlogpatients+= '\n\n\n';
                                         }SubjectService.fetchSessionsByID("session_fht_getdetectedissue").then(
                                            function(d) {
                                                if (d.log!=null && d.log!=""){
                                                                    // vm.fhirlogpatients+="*-*-*-* Fetching alert data for "+$rootScope.clinicName+" clinic *-*-*-*\n\n";
                                                                    vm.fhirlogpatients+= d.log;
                                                                    vm.fhirlogpatients+= '\n\n\n';
                                         }

                                                },
                                            function(errResponse){
                                                console.error('Error while fetching ');
                                              
                                            }
                                        );

                                                },
                                            function(errResponse){
                                                console.error('Error while fetching ');
                                              
                                            }
                                        );
			
                    },
                function(errResponse){
                    console.error('Error while fetching');
                    
                }
            );
             

            //setOrganisionNameByID($rootScope.clinicID);
        }
        
    }

})();