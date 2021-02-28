(function () {
    'use strict';

    angular
        .module('app').controller('Subjects.AddEditController', Controller)		
		.directive('customValidate', Validator);

	function Validator() {
			return {
		restrict: 'A',
		require: 'ngModel',
		
    link: linkFunc,
  };

  function linkFunc($scope, element, $attrs, ctrl) {
	 
    
	if ($attrs.ngModel=="vm.subject.age"){
    ctrl.$validators.number = function(value) {
     return (value === undefined  || value === "" || (Number.isInteger(+value) &&(value >= 1 && value <= 120)));
    }
	}
	if ($attrs.ngModel=="vm.subject.postcode"){
    ctrl.$validators.fourdigits = function(value) {
      // imagine other validation data here
	 
      return  (value === undefined  || value === "" ||  /^\d{4}$/.test(value));
     
    }
	}
	

    
  }
}
		



    function Controller($scope, $state, $stateParams, SubjectService,$mdDateLocale) {
        var vm = this;

		$scope.referralcode = ["Alive","Deceased","Unknown"];
		$scope.gendertypes = ["Male","Female","Unknown"];
		$scope.testresults = ["Negative","Positive"];
        $scope.subject_error_show=false;
		$scope.subject_error="";
        $scope.isDisabled = false;
		$scope.isSytemStartDateDisabled=true;
		$scope.IsTestDateError = false;
		$scope.IsSymptomIncorrectFormat=false;
		$scope.isSytemStartEntered=false;
		$scope.IsCovidCareIDExist=false;
		

		
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
		vm.subject.registerdDate = new Date();
        vm.options = '{format:"DD.MM.YYYY HH:mm"}'
		vm.subject.covidObservationlst=[];
        vm.saveSubject = saveSubject;
		vm.createCheckin=createCheckin;
		vm.maxDate= initMaxDate();

     $('#datetimepicker1').datetimepicker({format: 'DD/MM/YYYY HH:mm'});
		
		
		$scope.isSaveVisible=true;
		$scope.isChckinVisible=false;
		$scope.referralClinics=[];
		$scope.referralClinicIDs=[];
		$scope.referralClinicNames=[];
		$scope.allCovidCareIDs=[];
		$scope.symptomChangeV=false;
		
		$scope.symptomChange=function() {
        $scope.symptomChangeV=true;;
    };
		
		$mdDateLocale.formatDate = function(date) {
      return date ? moment(date).format('L') : '';
    };

    /**
     * @param dateString {string} string that can be converted to a Date
     * @returns {Date} JavaScript Date object created from the provided dateString
     */
    $mdDateLocale.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
	  if (!m.isValid()){
				$scope.IsSymptomIncorrectFormat=true;
			}
			else{
				$scope.IsSymptomIncorrectFormat=false;
			}
      return m.isValid() ? m.toDate() : new Date(NaN);
    };

		
		

	
	
	

		

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
		
		
    function initMaxDate() {
    return new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
}



		function initController() {

			if ($stateParams.id) {
				$scope.isSaveVisible = false;
				$scope.isChckinVisible = true;
				$scope.isDisabled = true;
				$scope.IsCovidCareIDExist=false;
				vm.title = 'CovidCare User Details';
				SubjectService.fetchSubjectByID($stateParams.refid, $stateParams.id).then(
					function (d) {
						var dt = new Date(d.registerdDate);
						//d.covidObservationlst
						angular.forEach(d.covidObservationlst, function (value, key) {
							setObservationList(value);
						});


						vm.subject = d;
						vm.subject.registerdDate = new Date(dt);
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
		
			
		function checkStartDate() {
			vm.isSytemStartDate=false;
			
			
          }
		  
	$scope.$watch('vm.symptomstartDate', function(newval, oldval){
			  
		$scope.IsTestDateError=false;
        $scope.isSytemStartDateDisabled=true;	
		$scope.isSytemStartEntered=false;		
		if (newval!=undefined && newval!="" && newval!=null){
			
			$scope.isSytemStartDateDisabled=false;
			$scope.isSytemStartEntered=true;
		
			}
		else{
		       vm.testDate=null;
			   vm.testResult=null;
			   $scope.IsSymptomIncorrectFormat=false;
		  }
		
		if (newval!=undefined && newval!="" && newval!=null && newval!=undefined && vm.testDate!="" && vm.testDate!=null && vm.testDate !=undefined)
		{	  
			if(vm.newval > vm.testDate) {
        			$scope.IsTestDateError=true;
			}
		
		}
	

});

$scope.$watch('vm.subject.covidCareId', function(newval, oldval){
			  
			  
		if (newval!=undefined && newval!="" && newval!=null){
			
						
			SubjectService.fetchAllCovidCareIDs().then(
            function(d) {
								
				vm.covidcareIDS = d;
							if(vm.covidcareIDS.indexOf(newval) !== -1) {
						$scope.IsCovidCareIDExist=true;
						
						}
						else{
							$scope.IsCovidCareIDExist=false;

			            }
               
				
				},
            function(errResponse){
                console.error('Error while fetching Clinics');
				
            }
        );
			
			
		
		}
		

});


		$scope.$watch('vm.testDate', function(newval, oldval){
			$scope.IsTestDateError=false;
			if (newval!=undefined && newval!=null && newval!= "" && vm.symptomstartDate != undefined && vm.symptomstartDate !=null){	  
		if(vm.symptomstartDate > newval) {
                			$scope.IsTestDateError=true;
			}}else{$scope.IsTestDateError=false;};
});

    }
	
	

})();
