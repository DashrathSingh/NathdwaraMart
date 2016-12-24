﻿'use strict';
app.controller('loginController', ['$scope','localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope,localStorageService, $location, authService, ngAuthSettings) {


    $scope.categories = [];
    $scope.filterArray = [];
    $scope.Searchstring = "";
    $scope.sortCol = "Sort";
    $scope.sortDir = "desc";
    var _pageSize = 32;
    $scope.CurrentPage = 1;
    $scope.TotalPages = 0;
    $scope.TotalRecords = 0;
    var _TotalRecordsCurrent = 0;
    $scope.CurrentRecordCount = 0;
    $scope.ImageList = [];
    var FileName = "";
    var StreamData = "";
    function CheckScopeBeforeApply() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.isload = true;

    $scope.ImageUrl = serviceBase + "/Images/";



    $scope.Category = { ID: 0, Name: "", Status: "", Sort: "", ImageSrc: "" }

    $scope.GetTempmethod = function () {

        $.ajax({
            url: serviceBase + "/api/BusTimings/1",
          //  data: JSON.stringify(_myObject),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

                console.log(result);
                




            },
            error: function (req) {
                console.log("into error");
            },
            complete: function () {


            }
        });
    }
    $scope.GetCategories = function () {

        

        $scope.isload = true;
        $scope.$apply();
        var _myObject = { pagenumber: $scope.CurrentPage, sortCol: $scope.sortCol, sortDir: $scope.sortDir, filterArray: $scope.filterArray, Searchstring: $scope.Searchstring, pagesize: _pageSize };
        $.ajax({
            url: serviceBase + "/api/Categories/GetAllCategories",
            data: JSON.stringify(_myObject),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {




                $scope.isload = false;
                if (result.Success) {
                    $scope.categories = result.Data;
                    $scope.CurrentPage = result.CurrentPage;
                    $scope.TotalPages = result.TotalPages;
                    $scope.TotalRecords = result.TotalRecords;
                    $scope.CurrentRecordCount = result.CurrentRecordCount;
                }
                else {
                    // toastr.error("Error occurred");
                    //  toastr.error(result.ex);
                }

                CheckScopeBeforeApply();

            },
            error: function (req) {
            },
            complete: function () {


            }
        });
    }

    $scope.InIt = function ()
    {

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
          slidesPerView: 'auto',
           autoplay: 3000,
          autoplayDisableOnInteraction: false,
          
        });
        $scope.GetTempmethod();
        $scope.GetCategories();


    }

    $scope.darshan = function () {
        $location.path('/darshan');
        $scope.$apply();
    }


    $scope.bus = function () {
        $location.path('/bus');
        $scope.$apply();
    }

                



    $scope.train = function () {
    
        $location.path('/train');
        $scope.$apply();
    }

    


    $scope.gotoshop = function (ID) {
        $("#toolbar").show();
        $scope.caID = ID;
        localStorageService.set("CatID", $scope.caID);
        $location.path('/shop');
        $scope.$apply();
    }

    $scope.InIt();

    $scope.listview = false;
    $scope.gridview = true;

    $scope.showheader = function () {

        $(".searcharea").hide();
        $("#toolbar").show();

    }


    $scope.Currentview = localStorageService.get("CurrentView");

    

    if ($scope.Currentview=="List") {
        $scope.listview = true;
        $scope.gridview = false;
    }

    else {

        $scope.listview = false;
        $scope.gridview = true;

    }


    $scope.showlist = function () {

        localStorageService.set("CurrentView", "List");

        $scope.gridview = false;
        $scope.listview = true;
       
    }

    $scope.showgrid = function () {

        localStorageService.set("CurrentView", "Grid");
        $scope.gridview = true;
        $scope.listview = false;

    }

    

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



    function getIncrementor(_Total) {
        if (_Total <= 100) {
            return 10;
        }
        else if (_Total > 100 && _Total < 500) {
            return 20;
        }
        else if (_Total > 500) {
            return 50;
        }
        else {
            return 10;
        }
    }

   
    $(window).scroll(function () {

     
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            if (_pageSize < $scope.TotalRecords) {

         

                _pageSize = _pageSize + getIncrementor(200);
                CheckScopeBeforeApply();
                $scope.GetCategories();
            }
            else {
                // log.info("You have already loaded all data.")
            }

        }

    });
}]);

app.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                element[0].nextElementSibling.remove();
                element[0].style.display = "";
            });
            element.bind('error', function () {
            });
        }
    };
});

app.directive('imageonload1', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                element[0].nextElementSibling.remove();
                element[0].style.display = "";
            });
            element.bind('error', function () {
            });
        }
    };
});
