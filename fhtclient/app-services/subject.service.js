(function () {
    'use strict';

    angular
        .module('app')
        .factory('SubjectService', Service);
    var REST_SERVICE_URI = 'https://demo.validitron.com.au/fhtservice/api/';
	//var REST_SERVICE_URI = 'http://localhost:8080/fhtservice/api/';
	 var REST_SERVICE_URI_RESOURCE = 'getalertsbysearchcriteria/';
	 var FETCHNEWALERTS='fetchnewalerts/';
     var REST_SERVICE_URI_REFERRALS='getreferrals/';
	
    function Service($filter,$http,$q) {

        var service = {};
        //service.fetchAllSubjects = fetchAllSubjects;
        service.fetchAllClinics = fetchAllClinics;
		service.searchAlerts = searchAlerts;
		service.fetchNewAlerts=fetchNewAlerts;

        return service;

        
	
	function searchAlerts(subject) {
		 var deferred = $q.defer();
        $http.post(REST_SERVICE_URI+REST_SERVICE_URI_RESOURCE, subject
       		)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while search alerts');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    

function fetchNewAlerts(clinicId) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+FETCHNEWALERTS+clinicId
			 
       		)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching alerts');
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
      
 }
})();