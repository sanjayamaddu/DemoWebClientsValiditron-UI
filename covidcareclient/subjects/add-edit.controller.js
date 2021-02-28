(function () {
    'use strict';

    angular
        .module('app').controller('Subjects.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, SubjectService) {
        var vm = this;

		$scope.referralcode = ["Alive","Deceased","Unknown"];
		$scope.gendertypes = ["Male","Female","Unknown"];
		$scope.testresults = ["Negative","Positive"];
        $scope.subject_error_show=false;
		$scope.subject_error="";
        $scope.isDisabled = false;
		$scope.consentStatuses = ["Consented","Not Consented","Ineligible Refused","Withdrawn","Pending"];
		vm.contactoptout=false;
		vm.lungcondtition=false;
		vm.cardcondtition=false;
		vm.smoker=false;
		vm.diabetes=false;
		vm.hypertenstion=false;
		vm.overweight=false;
		vm.hypertenstion=false;
        vm.pregnant=false;
		vm.status = true;
		//vm.Organizations=[];

        vm.title = 'Register CovidCare User';
        vm.subject = {};
		vm.subject.covidObservationlst=[];
        vm.saveSubject = saveSubject;
		vm.createCheckin=createCheckin;
		
		$scope.isSaveVisible=true;
		$scope.isChckinVisible=false;
		$scope.referralClinics=[];
		$scope.referralClinicIDs=[];
		$scope.referralClinicNames=[];
		$scope.allCovidCareIDs=[];
		//$scope.referralClinic=$scope.referralClinics[1];
		SubjectService.fetchAllClinics().then(
            function(d) {
								
				//vm.Organizations=d;
				angular.forEach(d, function(value, key) {
					$scope.referralClinics.push(value);
					$scope.referralClinicIDs.push(value.referralClinicID);
					$scope.referralClinicNames.push(value.referralClinicName);
				});
               
				
				},
            function(errResponse){
                console.error('Error while fetching Clinics');
				
            }
        );
		SubjectService.fetchAllCovidCareIDs().then(
            function(d) {
								
				//vm.Organizations=d;
				angular.forEach(d, function(value, key) {
					$scope.allCovidCareIDs.push(value);
				});
				},
            function(errResponse){
                console.error('Error while fetching covid ids');
				
            }
        );



		
        vm.covidObservation={};
        initController();
		
		
    



		function initController() {

			if ($stateParams.id) {
				$scope.isSaveVisible = false;
				$scope.isChckinVisible = true;
				$scope.isDisabled = true;
				vm.title = 'CovidCare User Details';
				SubjectService.fetchSubjectByID($stateParams.refid, $stateParams.id).then(
					function (d) {
						var dt = new Date(d.registerdDate);
						//d.covidObservationlst
						angular.forEach(d.covidObservationlst, function (value, key) {
							setObservationList(value);
						});


						vm.subject = d;
						vm.subject.registerdDate = dt;
						vm.subject.selectedreferralClinicName=d.covidOrganization.referralClinicName
					},
					function (errResponse) {
						console.error('Error while fetching Users');
						$scope.subject_error = errResponse.data;
						$scope.subject_error_show = true;
					}
				);

			} else {
				$scope.isDisabled = false;

			}
			//vm.subjects = SubjectService.fetchAllSubjects();
		}
		
		function setObservationList(value) {
			if (value.name == 'CONTACT_OPT_OUT' && value.value == 'Yes') {
				vm.contactoptout = true;
			}
			if (value.name == 'HAS_LUNG_CONDITION' && value.value == 'Yes') {
				vm.lungcondtition = true;
			}

			if (value.name == 'HAS_CARDIOVASCULAR_CONDITION' && value.value == 'Yes') {
				vm.cardcondtition = true;
			}

			if (value.name == 'IS_SMOKER' && value.value == 'Yes') {
				vm.smoker = true;
			}

			if (value.name == 'HAS_DIABETES' && value.value == 'Yes') {
				vm.diabetes = true;
			}

			if (value.name == 'IS_OVERWEIGHT' && value.value == 'Yes') {
				vm.overweight = true;
			}

			if (value.name == 'HAS_HYPERTENSION' && value.value == 'Yes') {
				vm.hypertenstion = true;
			}

			if (value.name == 'IS_PREGNANT' && value.value == 'Yes') {
				vm.pregnant = true;
			}
			if (value.name == 'SYMPTOM_START_DATE') {
				vm.symptomstartDate = new Date(value.value);
			}
			if (value.name == 'TEST_RESULT') {
				vm.testResult = value.value;
			}
			if (value.name == 'TEST_DATE') {
				vm.testDate = new Date(value.value);
			}

		}
          
		function setObservation() {
			if (vm.contactoptout) {
				var covidobservation = {};
				covidobservation.name = 'CONTACT_OPT_OUT';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'CONTACT_OPT_OUT';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.lungcondtition) {
				var covidobservation = {};
				covidobservation.name = 'HAS_LUNG_CONDITION';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'HAS_LUNG_CONDITION';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.cardcondtition) {
				var covidobservation = {};
				covidobservation.name = 'HAS_CARDIOVASCULAR_CONDITION';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'HAS_CARDIOVASCULAR_CONDITION';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.smoker) {
				var covidobservation = {};
				covidobservation.name = 'IS_SMOKER';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'IS_SMOKER';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.diabetes) {
				var covidobservation = {};
				covidobservation.name = 'HAS_DIABETES';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'HAS_DIABETES';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.overweight) {
				var covidobservation = {};
				covidobservation.name = 'IS_OVERWEIGHT';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'IS_OVERWEIGHT';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.hypertenstion) {
				var covidobservation = {};
				covidobservation.name = 'HAS_HYPERTENSION';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'HAS_HYPERTENSION';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.pregnant) {
				var covidobservation = {};
				covidobservation.name = 'IS_PREGNANT';
				covidobservation.value = 'Yes';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			else {
				var covidobservation = {};
				covidobservation.name = 'IS_PREGNANT';
				covidobservation.value = 'No';
				vm.subject.covidObservationlst.push(covidobservation);
			}
			if (vm.symptomstartDate) {
				var covidobservation = {};
				covidobservation.name = 'SYMPTOM_START_DATE';
				covidobservation.value = vm.symptomstartDate;
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.testResult) {
				var covidobservation = {};
				covidobservation.name = 'TEST_RESULT';
				covidobservation.value = vm.testResult;
				vm.subject.covidObservationlst.push(covidobservation);
			}

			if (vm.testDate) {
				var covidobservation = {};
				covidobservation.name = 'TEST_DATE';
				covidobservation.value = vm.testDate;
				vm.subject.covidObservationlst.push(covidobservation);
			}
		}

		function saveSubject() {
			getOrganisionByName(vm.subject.selectedreferralClinicName);
			setObservation();
			if (!isAlreadyCovidCardIDExists(vm.subject.covidCareId)) {
				SubjectService.createSubject(vm.subject).then(
					function (d) {
						vm.subjects = d;

						$scope.subject_error_show = false;
						$state.go('subjects');
						// redirect to subjects view
						$scope.$emit('subjects-updated');
						// emit event so list controller can refresh
					},
					function (errResponse) {
						console.error('Error while saving users');
						$scope.subject_error = errResponse.data;
						$scope.subject_error_show = true;
					}
				);
			} else {
				$scope.subject_error_show = true;
				$scope.subject_error = "This CovidCareID " + vm.subject.covidCareId + " already exists."
			}

		}
		function getOrganisionByName(name){
			angular.forEach($scope.referralClinics, function(value, key) {
				if(value.referralClinicName==name){
					vm.subject.covidOrganization=value;
				}
			});
		}
		function isAlreadyCovidCardIDExists(id){
			if($scope.allCovidCareIDs.indexOf(id)!==-1){
				return true;
			}else{
				return false;
			}
		}
		function createCheckin() {
		$state.go("relationships.checkin",{ "covidcareID": vm.subject.covidCareId });
        }
    }

})();
