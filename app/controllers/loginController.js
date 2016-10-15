﻿'use strict';
app.controller('loginController', ['$scope','localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope,localStorageService, $location, authService, ngAuthSettings) {


    $scope.InIt = function ()
    {

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });

      
    }

    $scope.InIt();

    

    $scope.login = function ()
    {
        
        localStorageService.set("ActivityCart", "");

        localStorageService.set("SelectedAction", "");
        localStorageService.set("lastlogindata", "");


        authService.login($scope.loginData).then(function (response)
        {
           
            $scope.GetProfileData();
            //$location.path('/FindItems');
            $location.path('/Accounts');
            
        },
         function (err) {
             $scope.message = err.error_description;
             playBeep();
         });
    };

   
   
}]);
