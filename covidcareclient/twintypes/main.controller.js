(function () {
    'use strict';

    angular
        .module('app')
        .controller('Twintypes.MainController', Controller);

    function Controller($scope,$sce) {
        var vm = this;
        vm.title = 'Search Pedigree';
        
       

        function initController() {
         

            // reload products when updated
            $scope.$on('relationships-updated', loadSubjects );
        }

        function loadSubjects() {

			
                 }
				 
				 

        function clear() {
             vm.pedigree = {};
		    vm.subjectUID= {};
        }
    }


})();