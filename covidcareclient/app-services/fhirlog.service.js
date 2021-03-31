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
	  var GETSESSIONSFHIRLOG='getsessionfhirlog/';
	  var GETNEXTCOVIDCAREID='getnaxtavailablacovidcareid'
      //new call to validate covidcare id
      var GETCOVIDCAREIDS='getcovidcareids';
      
	
    function Service($filter,$http,$q) {

        var service = {};
        
        service.fetchSessionsByID = fetchSessionsByID;
		

        return service;
        
	
	function fetchSessionsByID(refID) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+GETSESSIONSFHIRLOG+'/'+id
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
