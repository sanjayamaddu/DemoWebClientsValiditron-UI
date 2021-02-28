(function () {
    'use strict';

    angular
        .module('app').controller('Subjects.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, SubjectService,$rootScope) {
        var vm = this;

        $scope.subject_error_show=false;
		$scope.subject_error="";
        $scope.isDisabled = false;
        $scope.referralClinics=[];
		$scope.referralClinicNames=[];

        vm.title = 'Set Referral Clinic';
        vm.selectedreferralClinicName=$rootScope.clinicName;
        vm.subject = {};
        vm.saveClinic = saveClinic;

        initController();

        function initController() {
            SubjectService.fetchAllClinics().then(
                function(d) {
                    angular.forEach(d, function(value, key) {
                        $scope.referralClinics.push(value);
                        $scope.referralClinicNames.push(value.referralClinicName);
                    });
                    },
                function(errResponse){
                    console.error('Error while fetching Clinics');
                    
                }
            );
            //setOrganisionNameByID($rootScope.clinicID);
        }
        function setOrganisionIDByName(name){
			angular.forEach($scope.referralClinics, function(value, key) {
				if(value.referralClinicName==name){
					$rootScope.clinicID=parseInt(value.referralClinicID);
				}
			});
		}
        // function setOrganisionNameByID(id){
		// 	angular.forEach($scope.referralClinics, function(value, key) {
		// 		if(value.referralClinicID==id){
		// 			$rootScope.clinicName=value.referralClinicName;
		// 		}
		// 	});
		// }
        function saveClinic() {
       setOrganisionIDByName(vm.selectedreferralClinicName);
       $rootScope.clinicName=vm.selectedreferralClinicName;
       $state.go('subjects');

        }
    }

})();