(function () {
    'use strict';

    angular
        .module('app')
        .controller('Subjects.MainController', Controller);

    function Controller($scope, SubjectService,$rootScope) {
        var vm = this;
        $scope.vitalsignalertList = ["immediateEmergency","immediateAbnormality","trendNegative","trendEmergency","safe"];
		$scope.mentalhealthalertList =["mentalNegative","mentalSafe"];
		
				 
		$scope.rangelist = ["Before","After"];
        vm.subjects = [];
		vm.search={};
        vm.deleteSubject = deleteSubject;
	    vm.viewby = "10";
	    vm.totalItems = vm.subjects.length;
	    vm.currentPage = 4;
	    vm.itemsPerPage = 10;
	    vm.maxSize = 5; //Number of pager buttons to show
	    vm.setPage = setPage;
		vm.pageChanged = pageChanged;
		vm.setItemsPerPage = setItemsPerPage;
        vm.ClinicName=$rootScope.clinicName;
		vm.fetchNewAlerts=fetchNewAlerts;
		vm.clearAllFilter=clearAllFilter;
		vm.searchAlerts=searchAlerts;
		vm.lasupdateDate=null;
		
        $scope.CurrentDate=new Date();
	  


        initController();

        function initController() {
            loadSubjects();

            // reload subjects when updated
            $scope.$on('subjects-updated', loadSubjects);
        }
		
		function clearAllFilter(){
			vm.search.name=null;
			vm.search.email=null;
			vm.search.phone=null;
			vm.search.vitalSignAlertCode=null;
			vm.search.mentalHealthAlertCode=null;
			vm.search.dateCondition=null;
			vm.search.dateTime=null;
		}
		
		function searchAlerts() {
           	vm.subjects=[];
            $scope.CurrentDate = new Date();
			vm.search.clinicID=$rootScope.clinicID;
			SubjectService.searchAlerts(vm.search).then(
            function(d) {
                vm.subjects = d;
				vm.totalItems = vm.subjects.length;
            },
            function(errResponse){
                console.error('Error while searching alerts');
            }
        );

            //vm.subjects = SubjectService.fetchAllSubjects();
        }
		
		function fetchNewAlerts() {
           	
           $scope.CurrentDate = new Date();
			
			SubjectService.fetchNewAlerts($rootScope.clinicID).then(
            function(d) {
                vm.lasupdateDate= d.updated;
            },
            function(errResponse){
                console.error('Error while fetching new alters');
            }
        );

            //vm.subjects = SubjectService.fetchAllSubjects();
        }

        function loadSubjects() {
           			vm.search.clinicID=$rootScope.clinicID;
			SubjectService.searchAlerts(vm.search).then(
            function(d) {
                vm.subjects = d;
				vm.totalItems = vm.subjects.length;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );

            //vm.subjects = SubjectService.fetchAllSubjects();
        }

        function deleteSubject(id) {
            SubjectService.Delete(id);
            loadSubjects();
        }


       function setPage (pageNo) {
		vm.currentPage = pageNo;
	   };

       function pageChanged() {
			console.log('Page changed to: ' + vm.currentPage);
	   };

	   
	  function  setItemsPerPage(num) {
		  vm.itemsPerPage = num;
		  vm.currentPage = 1; //reset to first page
	  };
    }

})();