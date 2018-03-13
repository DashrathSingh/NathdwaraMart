
var app = angular.module('NathdwaraMartApp', ['ngRoute', 'ngSanitize', 'LocalStorageModule', 'angular-loading-bar', 'ngCordova', 'ui.sortable']);

app.config(function ($routeProvider) {

  

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/shop", {
        controller: "shopController",
        templateUrl: "app/views/shop.html"
    });

    $routeProvider.when("/detail", {
        controller: "detailController",
        templateUrl: "app/views/detail.html"
    });

    $routeProvider.when("/contact", {
        controller: "contactController",
        templateUrl: "app/views/contact.html"
    });

    $routeProvider.when("/about", {
        controller: "aboutController",
        templateUrl: "app/views/about.html"
    });

    $routeProvider.when("/around", {
        controller: "aboutController",
        templateUrl: "app/views/around.html"
    });

    $routeProvider.when("/darshan", {
        controller: "darshanController",
        templateUrl: "app/views/darshan.html"
    });

    $routeProvider.when("/bus", {
        controller: "busController",
        templateUrl: "app/views/bus.html"
    });
    $routeProvider.when("/train", {
        controller: "trainController",
        templateUrl: "app/views/train.html"
    });

    $routeProvider.when("/news", {
        controller: "newsController",
        templateUrl: "app/views/news.html"
    });

    

    $routeProvider.otherwise({ redirectTo: "/login" });

});


var serviceBase = 'http://nm.myratlam.com/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});


app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

// factory for all messages 
app.factory('log', function () {
    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-right',
    };
    return {
        success: function (text) {
            toastr.success(text, "Success");
        },
        error: function (text) {
            toastr.error(text, "Error");
        },
        info: function (text) {
            toastr.info(text, "Info");
        },
        warning: function (text) {
            toastr.warning(text, "Warning");
        },
    };
});


