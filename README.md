# simple-angular-grid
Just another data grid built with angular 1.4.8. 
It is a very simple data grid which supports sorting, filtering, adding, editing & deleting rows and column hide show functionalities.
## Getting Started
Simply copy paste dist/data-grid.js in your project. It is not minified.
Include this file in your main html page.
e.g.
```
index.html
<script src="components/data-grid.js"></script>
```
Inject dataGrid module in your app.
```
app.js
var myApp = angular.module('myApp', ['ngRoute', 'dataGrid']);
```
Finally use <data-grid></data-grid> directive to add grid in your page.
```
<data-grid data="employees" headers="headers"></data-grid>
```
data-grid directive uses to two attributes, viz. 1. data 2. headers
Create headers for grid and data in your controller.
```
myApp.controller('homeCtrl', ['$scope', function ($scope) {
    $scope.headers = {
        name: 'Name',
        company: 'Company',
        role: 'Role',
        skills: 'Skills',
        test: 'Test'
    };
    $scope.employees = [{
        company: 'Umbrella Corporation',
        role: '' +
        'MTS',
        name: 'Amaan',
        skills: 'C',
        test: 'Test'
    }, {
    ....
```
### Example
Please refer following plunkr.
```
http://plnkr.co/edit/ODjlD4SZKB6yG7XTY5Ap?p=preview
```
