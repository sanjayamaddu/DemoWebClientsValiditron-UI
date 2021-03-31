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
            SubjectService.fetchSessionsByID("session_createparent").then(
                function(d) {
                   if (d.log!=null && d.log!=""){
										vm.fhirlogpatients="*-*-*-* Register user *-*-*-*\n\n";
										vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
										SubjectService.fetchSessionsByID("session_getparents").then(
                function(d) {
                    if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* Fetch user data to populate user table *-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
										SubjectService.fetchSessionsByID("session_getparent_covid_id").then(
                function(d) {
                    if (d.log!=null && d.log!=""){
										vm.fhirlogpatients+="*-*-*-* Fetch and view data for single user *-*-*-*\n\n";
						                vm.fhirlogpatients+= d.log;
										vm.fhirlogpatients+= '\n\n\n';
										}
                    },
                function(errResponse){
                    console.error('Error while fetching Clinics');
                    
                }
            );
                    },
                function(errResponse){
                    console.error('Error while fetching Clinics');
                    
                }
            );
                    },
                function(errResponse){
                    console.error('Error while fetching Clinics');
                    
                }
            );
            //setOrganisionNameByID($rootScope.clinicID);
        }
        
    }

})();