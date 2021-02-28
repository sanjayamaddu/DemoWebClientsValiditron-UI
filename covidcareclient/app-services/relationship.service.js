(function () {
    'use strict';

    angular
        .module('app')
        .factory('RelationshipService', Service);
    var REST_SERVICE_URI = 'https://demo.validitron.com.au/covidcareservice/api/';
	//var REST_SERVICE_URI = 'http://localhost:8080/covidcare/';
	var REST_SERVICE_URI_RESOURCE = 'getencounterlistasdisplayrow/';
	var REST_SERVICE_URI_RESOURCE_CREATE = 'postencounterobservationsanddetectedissues/';
	var GETENCOUNTERBYCOVIDCAREID='getencounterbyresourceid/';
	
    function Service($filter,$http,$q) {

        var service = {};
        service.fetchAllRelationships = fetchAllRelationships;
		service.fetchRelationshipByID=fetchRelationshipByID;
		service.createSubject = createSubject;
       return service;
	
	function fetchRelationshipByID(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+GETENCOUNTERBYCOVIDCAREID+id
			 )
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching encounter');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	  function fetchAllRelationships() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+REST_SERVICE_URI_RESOURCE
			 
        //withCredentials: true,
        //headers:{ 'Authorization':  'Basic ' + btoa('demo-studyadmin@ark.org.au' + ":" + 'StudyAdmin@1')}}
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
	
	

    function createSubject(subject) {
        var deferred = $q.defer();
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
     }
})();
