(function () {
    'use strict';

    angular
        .module('app')
        .factory('SubjectService', Service);
    var REST_SERVICE_URI = 'https://demo.validitron.com.au/covidcareservice/api/';
	//var REST_SERVICE_URI = 'http://localhost:8080/covidcareservice/api/';
	 var REST_SERVICE_URI_RESOURCE = 'getpatients';
	 var REST_SERVICE_URI_REFERRALS='getreferrals/';
	 var REST_SERVICE_URI_RESOURCE_CREATE = 'postpatient/';
	  var GETPATIENTSBYCOVIDCAREID='getpatientbyreferralandcovidcareid/';
	  var GETNEXTCOVIDCAREID='getnaxtavailablacovidcareid'
      //new call to validate covidcare id
      var GETCOVIDCAREIDS='getcovidcareids';
	
    function Service($filter,$http,$q) {

        var service = {};
        
        service.fetchAllSubjects = fetchAllSubjects;
		service.fetchSubjectByID=fetchSubjectByID;
		service.createSubject = createSubject;
		service.fetchAllClinics = fetchAllClinics;
		service.fetchAllCovidCareIDs=fetchAllCovidCareIDs;
		service.getNextCovidCareID=getNextCovidCareID;
		//service.updateSubject = updateSubject;
		//service.fetchAllSiblingsBySubject=fetchAllSiblingsBySubject;
		//service.fetchAllSubjectsWithSiblings=fetchAllSubjectsWithSiblings;
      

        return service;

        
	
	function fetchSubjectByID(refID,id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+GETPATIENTSBYCOVIDCAREID+refID+'/'+id
			 )
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
function getNextCovidCareID() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+GETNEXTCOVIDCAREID
			 )
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

   


function fetchAllClinics() {
        var deferred = $q.defer();
		//subject.referralClinicId=3155;
		
		
        $http.get(REST_SERVICE_URI+REST_SERVICE_URI_REFERRALS
			
		)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
		
		
        return deferred.promise;
    }


function fetchAllSubjects() {
        var deferred = $q.defer();
		//subject.referralClinicId=3155;
		
				
        $http.get(REST_SERVICE_URI+REST_SERVICE_URI_RESOURCE
			
		)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
		
		
        return deferred.promise;
    }

	  
	  
	

    function createSubject(subject) {
        var deferred = $q.defer();
		//subject.referralclinicId=1652;
		
		
        $http.post(REST_SERVICE_URI+REST_SERVICE_URI_RESOURCE_CREATE, subject
			
		)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
		
		
        return deferred.promise;
    }

    function fetchAllCovidCareIDs() {
        var deferred = $q.defer();
		//subject.referralClinicId=3155;
		
				
        $http.get(REST_SERVICE_URI+GETCOVIDCAREIDS
			
		)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
		
		
        return deferred.promise;
    }

     
    function updateSubject(subject, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, subject)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }


        // private functions

        function getSubjects() {
            if (!localStorage.subjects) {
                localStorage.subjects = JSON.stringify([]);
            }

            return JSON.parse(localStorage.subjects);
        }

        function setSubjects(subjects) {
            localStorage.subjects = JSON.stringify(subjects);
        }
    }
})();
