(function () {
    'use strict';

    angular
        .module('app')
		   .controller('Relationships.AddEditController', Controller)
		


    function Controller($scope, $state, $stateParams,RelationshipService,SubjectService) {
        var vm = this;

        $scope.apetheliclistValues = ["NOTATALL","SEVERALDAYS","MORETHANHALFDAYS"];
        $scope.promptedbylist = ["Dashboard","Push notification"];
		$scope.drycoughlist = ["None","Rare","Frequent","Constant"];
		$scope.feverlist = ["None","Rare","Frequent","Constant"];
		$scope.fatiguelist = ["None","Rare","Frequent","Constant"];
		$scope.shortnessbreathlist = ["None","Rare","Frequent","Constant"];
		$scope.lackofsmellist = ["None","Rare","Frequent","Constant"];
		$scope.apetheliclist = ["Not at all","Several days","More than half the days"];
		$scope.depressedlist = ["Not at all","Several days","More than half the days"];
		$scope.anxiouslist = ["Not at all","Several days","More than half the days"];
		$scope.worriedlist = ["Not at all","Several days","More than half the days"];
		$scope.vitalsignlist = ["safe","trendEmergency","trendNegative","immediateAbnormality","immediateEmergency"];
		$scope.mentalhealthalertlist = ["mentalSafe","mentalNegative"];
		 
		
        vm.title = 'Create CovidCare Check-in';
        vm.encounter = {};
		vm.subject = {};
		vm.encounter.covidObservationlst=[];
		vm.encounter.covidDetectedIssuelst=[];
		
        vm.saveencounter = saveencounter;
        $scope.encounter_error_show=false;
		$scope.encounter_error="";
        $scope.isRelDisabled = false;
		$scope.IsCovidCareIDExist=false;
		$scope.IsTempraturePositive=false;
		 
		vm.heartrate="";
		vm.respiratoryrate="";
		vm.singlebreathcount="";
		vm.temperature="";
		vm.oxygen="";
		vm.drycough="None";
		vm.fever="None";
		vm.fatigue="None";
		vm.shortnessofbreath="None";
		vm.lackofsmell="None";
		vm.apathetic="Not at all";
		vm.depressed="Not at all";
		vm.anxious="Not at all";
		vm.worried="Not at all";
		vm.vitalsign="safe";
		vm.mentalhealth="mentalSafe";
		vm.covidcareIDS=[];
		$scope.isSaveVisible=true;
		vm.encounter.checkinDateTime = new Date();
        vm.options = '{format:"DD.MM.YYYY HH:mm"}';
         $('#datetimepicker2').datetimepicker({format: 'DD/MM/YYYY HH:mm'});
		
        initController();

        function initController() {
           		if ($stateParams.id) {
		$scope.isSaveVisible = false;
		$scope.isDisabled = true;
                vm.title = 'Create CovidCare Check-in';
               	RelationshipService.fetchRelationshipByID($stateParams.id).then(
            function(d) {
                vm.encounter = d;
				
				var dt = new Date(d.checkinDateTime);
				var reasonPromptedBy=d.reasonOrPromptedBy;
				vm.encounter.checkinDateTime=dt;
				vm.encounter.reasonOrPromptedBy= titleCaseWord(reasonPromptedBy.substr(24,reasonPromptedBy.length));

				angular.forEach(d.covidObservationlst, function(value, key) {
					setObservationList(value);
				});
				angular.forEach(d.covidDetectedIssuelst, function(value, key) {
					setDetectedList(value);
				});
				},
            function(errResponse){
                console.error('Error while fetching encounter');
				$scope.encounter_error=errResponse.data;
				$scope.encounter_error_show=true;
            }
        );
		
		 }
		 else if ($stateParams.covidcareID){
			 vm.encounter.covidcareID=$stateParams.covidcareID;
		 }
		 else{
		 $scope.isDisabled = false;
		
            }

			SubjectService.fetchAllSubjects()
			            .then(
			            function(d) {
			                vm.subjects = d;
			            },
			            function(errResponse){
			                console.error('Error while fetching Users');
			            }
        );
        }
		
		function setDetectedList(value){
			
			if (	value.name=='immediateEmergency' || value.name=='immediateAbnormality' || value.name=='trendNegative' || value.name=='trendEmergency' || value.name=='safe' )
		{
			vm.vitalsign=value.name;
		}
		
		if (	value.name=='mentalNegative' || value.name=='mentalSafe' )
		
		{
			vm.mentalhealth=value.name;
		}
		}
		
	function setObservationList(value){
		
		if (value.name=='HEART_RATE')
		 {
			vm.heartrate=parseInt(value.value);
		 }
		if (value.name=='RESPIRATORY_RATE')
		 {
			vm.respiratoryrate=parseInt(value.value);
		 }
		
		if (value.name=='SINGLE_BREATH_COUNT')
		{
			vm.singlebreathcount=parseInt(value.value);
		 }
		 
		if (value.name=='OXYGEN_SATURATION')
		 {
			vm.oxygen=parseInt(value.value);
		 }
		if (value.name=='TEMPERATURE')
		 {
			vm.temperature=value.value;
		 }
		 
		 
		if (value.name=='DRY_COUGH')
		 {
			vm.drycough=capitalizeFirstLetter(value.value);
		

		 }
		 
		if (value.name=='FATIGUE')
		 {
			vm.fatigue=capitalizeFirstLetter(value.value);
		 }
		 
		if (value.name=='FEVER')
		 {
			vm.fever=capitalizeFirstLetter(value.value);
		 }
		 
		if (value.name=='SHORTNESS_OF_BREATH')
		 {
			vm.shortnessofbreath=capitalizeFirstLetter(value.value);
		 }
		 
		if (value.name=='LACK_OF_SMELL_OR_TASTE')
		 {
			vm.lackofsmell=capitalizeFirstLetter(value.value);
		 }
		

		if (value.name=='APATHETIC')
		 {
			 vm.apathetic=value.value;
		  
		
		 }
		 if (value.name=='DEPRESSED')
		 {
			 vm.depressed=value.value;
		  
		
		 }
		 if (value.name=='ANXIOUS')
		 {
		vm.anxious=value.value;
		 }
		 if (value.name=='WORRIED')
		 {
			
			vm.worried=value.value;
		
		 }
		
		 
		}
		
	function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

      
	  function setObservation(){
		
		var covidobservation={};
		covidobservation.name='HEART_RATE';
		covidobservation.value=vm.heartrate;
		covidobservation.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation);
		
		var covidobservation1={};
		covidobservation1.name='RESPIRATORY_RATE';
		covidobservation1.value=vm.respiratoryrate;
		covidobservation1.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation1);
		 
		var covidobservation2={};
		covidobservation2.name='SINGLE_BREATH_COUNT';
		covidobservation2.value=vm.singlebreathcount;
		covidobservation2.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation2);
		
		var covidobservation3={};
		covidobservation3.name='DRY_COUGH';
		covidobservation3.value=angular.uppercase(vm.drycough);
		vm.encounter.covidObservationlst.push(covidobservation3);
		 
		var covidobservation4={};
		covidobservation4.name='OXYGEN_SATURATION';
		covidobservation4.value=vm.oxygen;
		covidobservation4.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation4);
		 
		var covidobservation5={};
		covidobservation5.name='FATIGUE';
		covidobservation5.value=angular.uppercase(vm.fatigue);
		covidobservation5.effectiveDateTime=new Date();
		
		vm.encounter.covidObservationlst.push(covidobservation5);
		 
		var covidobservation6={};
		covidobservation6.name='FEVER';
		covidobservation6.value=angular.uppercase(vm.fever);
		covidobservation6.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation6);
		 
		var covidobservation7={};
		covidobservation7.name='SHORTNESS_OF_BREATH';
		covidobservation7.value=angular.uppercase(vm.shortnessofbreath);
		covidobservation7.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation7);
		 
		var covidobservation8={};
		covidobservation8.name='LACK_OF_SMELL_OR_TASTE';
		covidobservation8.value=angular.uppercase(vm.lackofsmell);
		covidobservation8.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation8);
		
		var covidobservation9={};
		covidobservation9.name='APATHETIC';
		covidobservation9.value=getValueFromEnum(vm.apathetic);
		covidobservation9.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation9);
		
		var covidobservation10={};
		covidobservation10.name='DEPRESSED';
		covidobservation10.value=getValueFromEnum(vm.depressed);
		covidobservation10.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation10);
		
		var covidobservation11={};
		covidobservation11.name='ANXIOUS';
		covidobservation11.value=getValueFromEnum(vm.anxious);
		covidobservation11.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation11);
		 
		var covidobservation12={};
		covidobservation12.name='WORRIED';
		covidobservation12.value=getValueFromEnum(vm.worried);
		covidobservation12.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation12);

		
		var covidobservation13={};
		covidobservation13.name='TEMPERATURE';
		if (Boolean(vm.temperature)){
			covidobservation13.value=vm.temperature;
		covidobservation13.effectiveDateTime=new Date();
		vm.encounter.covidObservationlst.push(covidobservation13);}
  //this will be true when the str is not empty nor null nor undefined


		
		
		
		var vitalcovidDetectedIssue={}
		vitalcovidDetectedIssue.name=vm.vitalsign;
		vitalcovidDetectedIssue.effectiveDateTime=new Date();
		//mental
		var mentalCovidDetectedIssue={};
		mentalCovidDetectedIssue.name=vm.mentalhealth;
		mentalCovidDetectedIssue.effectiveDateTime=new Date();
		vm.encounter.covidDetectedIssuelst.push(vitalcovidDetectedIssue);
		vm.encounter.covidDetectedIssuelst.push(mentalCovidDetectedIssue);
			
		
		 }
		 
		function getValueFromEnum(name){
			
				if (name=="Not at all"){
					return "NOTATALL";
				}
				if (name=="Several days"){
					return "SEVERALDAYS";
				}
				if (name=="More than half the days"){
					return "MORETHANHALFDAYS";
				}
			}
		
        function saveencounter() {
            // save product
		setObservation();
       RelationshipService.createSubject(vm.encounter).then(
            function(d) {
                vm.encounter = d;
				$scope.subject_error_show=false;
				$state.go('relationships');
				 // redirect to subjects view
				 $scope.$emit('relationships-updated');
				 // emit event so list controller can refresh
            },
            function(errResponse){
                console.error('Error while fetching encounters');
				$scope.encounter_error=errResponse.data;
				$scope.encounter_error_show=true;
            }
        );


   }
   $scope.$watch('vm.encounter.covidcareID', function(newval, oldval){
			  
			  
		if (newval!=undefined && newval!="" && newval!=null){
			
						
			SubjectService.fetchAllCovidCareIDs().then(
            function(d) {
								
				vm.covidcareIDS = d;
							if(vm.covidcareIDS.indexOf(newval) !== -1) {
						$scope.IsCovidCareIDExist=false;
						
						}
						else{
							$scope.IsCovidCareIDExist=true;

			            }
               
				
				},
            function(errResponse){
                console.error('Error while fetching Clinics');
				
            }
        );
			
			
		
		}

});

$scope.$watch('vm.temperature', function(newval, oldval){
			  
			  
		if (newval!=undefined && newval!="" && newval!=null){
			
						var decimal=  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/

; 
						if(String(newval).match(decimal)) 
						{ 
							$scope.IsTempraturePositive=false;
						}
						
						else{
							$scope.IsTempraturePositive=true;

			            }
               
				
				}

});
   
   function titleCaseWord(word) {
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
    }

})();
