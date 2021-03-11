(function () {
    'use strict';

    angular
        .module('app')
        .controller('Subjects.MainController', Controller);

    function Controller($scope, SubjectService, $rootScope, $mdDateLocale) {
        var vm = this;
        $scope.vitalsignalertList = ["safe", "trendEmergency", "trendNegative", "immediateAbnormality", "immediateEmergency"];
        $scope.mentalhealthalertList = ["mentalSafe", "mentalNegative"];


        $scope.rangelist = ["Before", "On", "After"];
        vm.subjects = [];
        vm.search = {};
        vm.deleteSubject = deleteSubject;
        vm.viewby = "10";
        vm.totalItems = vm.subjects.length;
        vm.currentPage = 4;
        vm.itemsPerPage = 10;
        vm.maxSize = 5; //Number of pager buttons to show
        vm.setPage = setPage;
        vm.pageChanged = pageChanged;
        vm.setItemsPerPage = setItemsPerPage;
        vm.ClinicName = $rootScope.clinicName;
        vm.fetchNewAlerts = fetchNewAlerts;
        vm.clearAllFilter = clearAllFilter;
        vm.searchAlerts = searchAlerts;
        vm.lasupdateDate = null;

        $scope.CurrentDate = new Date();
        vm.search.dateCondition = "After";

        initController();

        function initController() {
            //loadSubjects();
            fetchNewAlerts();

            // reload subjects when updated
            $scope.$on('subjects-updated', refreshSubjects);
            $mdDateLocale.formatDate = function (date) {
                // return date ? moment(date).format('L') : '';
                return date ? moment(date).format('DD/MM/YYYY') : '';

            };

            /**
             * @param dateString {string} string that can be converted to a Date
             * @returns {Date} JavaScript Date object created from the provided dateString
             */
            $mdDateLocale.parseDate = function (dateString) {
                var m = moment(dateString, 'DD/MM/YYYY', true);

                if (!m.isValid()) {
                    $scope.IsSymptomIncorrectFormat = true;
                }
                else {
                    $scope.IsSymptomIncorrectFormat = false;
                }
                return m.isValid() ? m.toDate() : new Date(NaN);
            };

        }

        function clearAllFilter() {
            vm.search.name = null;
            vm.search.email = null;
            vm.search.phone = null;
            vm.search.vitalSignAlertCode = null;
            vm.search.mentalHealthAlertCode = null;
            vm.search.dateCondition = "After";
            vm.search.dateTime = null;
            SubjectService.searchAlerts(vm.search).then(
                function (d) {
                    vm.subjects = d;
                    vm.totalItems = vm.subjects.length;
                },
                function (errResponse) {
                    console.error('Error while fetching Users');
                });
        }

        function searchAlerts() {
            vm.subjects = [];
            $scope.CurrentDate = new Date();
            vm.search.clinicID = $rootScope.clinicID;
            SubjectService.searchAlerts(vm.search).then(
                function (d) {
                    vm.subjects = d;
                    vm.totalItems = vm.subjects.length;
                },
                function (errResponse) {
                    console.error('Error while searching alerts');
                }
            );

            //vm.subjects = SubjectService.fetchAllSubjects();
        }

        function fetchNewAlerts() {

            $scope.CurrentDate = new Date();
            SubjectService.fetchNewAlerts($rootScope.clinicID).then(
                function (d) {
                    vm.lasupdateDate = d.updated;
                    loadSubjects();

                },
                function (errResponse) {
                    console.error('Error while fetching new alters');
                }
            );

            //vm.subjects = SubjectService.fetchAllSubjects();
        }


        function refreshSubjects() {
            vm.search.clinicID = $rootScope.clinicID;
            clearAllFilter();
            fetchNewAlerts();
            //vm.subjects = SubjectService.fetchAllSubjects();
        }
        function loadSubjects() {
            vm.search.clinicID = $rootScope.clinicID;

            SubjectService.searchAlerts(vm.search).then(
                function (d) {
                    vm.subjects = d;
                    vm.totalItems = vm.subjects.length;

                },
                function (errResponse) {
                    console.error('Error while fetching Users');
                }
            );

            //vm.subjects = SubjectService.fetchAllSubjects();
        }

        function deleteSubject(id) {
            SubjectService.Delete(id);
            loadSubjects();
        }


        function setPage(pageNo) {
            vm.currentPage = pageNo;
        };

        function pageChanged() {
            console.log('Page changed to: ' + vm.currentPage);
        };


        function setItemsPerPage(num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first page
        };
    }

})();