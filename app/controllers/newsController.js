'use strict';
app.controller('newsController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {

    $scope.isloader = true;
    $scope.GetNewsLists = function () {
      
      

        debugger;
        $.ajax({
            url: serviceBase + "/api/News/GetNewsData",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

               

             
                $scope.Newslist = result;


                $scope.$apply();

            },
            error: function (req) {
                $scope.isloader = false;
            },
            complete: function () {

                $scope.isloader = false;
            }
        });
    }

    $scope.GetNewsLists();
   
}]);

app.filter('jsonDate', ['$filter', function ($filter) {
    return function (input, format) {

        return (input) ? $filter('date')(input, format) : '';
    };
}]);
