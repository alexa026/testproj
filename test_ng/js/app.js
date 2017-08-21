var app = angular.module("reedsy_test", []);

app.directive('timeDirective', function () {
    return {
        require: '^ngModel',
        restrict: 'A',
        scope: {},
        templateUrl: 'directives/time.html',
        link: function (scope, elm, attrs, ctrl) {
            scope.listOfMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            createWatchers();

            function assignToSeparated(givenDate) {
                var date = new Date(givenDate);
                scope.day = date.getDate();
                scope.month = date.getMonth();
                scope.year = date.getFullYear();
            }

            function createWatchers() {
                scope.$watchGroup(['day', 'month', 'year'], function (values) {
                   ctrl.$setViewValue(new Date(values[2], values[1], values[0]).getTime());
                });
            }

            function setDatesOfMonth(date) {
                scope.daysInMonth = moment(date).daysInMonth();
            }

            function parsing(value) {
                assignToSeparated(value);
                setDatesOfMonth(value);
                return value;
            }

            ctrl.$formatters.push(parsing);

            ctrl.$parsers.push(parsing);

            scope.number = function (num) {
                return new Array(num);
            }
        }
    };
});


app.controller("testCtrl", function ($scope) {
    $scope.selectedDate = new Date().getTime();

    $scope.setCustomTime = function() {
        $scope.selectedDate = new Date('01-02-2012').getTime();
    }

});