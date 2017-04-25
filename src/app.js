/*
 * Created on 27-01-2017.
 * */
var myApp = angular.module('myApp', ['ngRoute', 'dataGrid']);
myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
}]);