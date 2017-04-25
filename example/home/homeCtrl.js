/**
 * Created by Amaan on 27-01-2017.
 */
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
        name: 'Test User',
        company: 'Wayne Enterprises, Inc.',
        role: 'SMTS',
        skills: 'B',
        test: 'Test'
    }, {
        name: 'New Test User',
        company: 'Queen Industries',
        role: 'PM',
        skills: 'A'
    }, {
        name: 'Old Guy',
        company: 'Cyberdyne Systems',
        role: 'DM',
        skills: 'NA'
    }];
}]);