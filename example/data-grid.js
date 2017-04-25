/*
 * Created by Anaab on 27-01-2017.
 * */
var dataGrid = angular.module('dataGrid', []);
//Directive for displaying Data Grid
dataGrid.directive("grid", ['$window', '$timeout', function ($window, $timeout) {
    return {
        controller: function ($scope) {
            //Sort by, Sort Order, Columns to display and Rows to edit variables
            $scope.reverse = false;
            $scope.orderBy = '';
            $scope.showColumnMenu = false;
            var firstKey = '';


            //Filter By initialization
            $scope.search = angular.copy($scope.headers);
            angular.forEach($scope.search, function (value, key) {
                firstKey = firstKey == '' ? key : firstKey;
                $scope.search[key] = '';
            });
            //Sort By initialization
            $scope.orderBy = firstKey;

            //Row Id
            var counter = 0;
            //Row Id, Row to edit and Row checked variables for object
            angular.forEach($scope.data, function (value, key) {
                value['id'] = counter++;
                value['editRow'] = false;
                value['checked'] = false;

                //Adding empty key, value if key does not exist
                angular.forEach($scope.search, function (childValue, key) {
                    if (value[key] === undefined) {
                        value[key] = '';
                    }
                });
            });

            //Columns to display initialization
            $scope.view = angular.copy($scope.search);
            angular.forEach($scope.view, function (value, key) {
                $scope.view[key] = true;
            });

            //Sort By and Sort Order function
            $scope.sort = function (orderBy) {
                $scope.reverse = $scope.orderBy == orderBy && $scope.reverse == false;
                $scope.orderBy = orderBy;
            };

            //Toggle event for Columns Menu Icon
            $scope.showHideColumns = function () {
                $scope.showColumnMenu = !$scope.showColumnMenu;
            };

            //Edit click event
            var originalData = [];
            $scope.edit = function (id) {
                var originalIndex = originalData.indexBy('id', id);
                var dataIndex = $scope.data.indexBy('id', id);

                if (originalIndex == -1) {
                    originalData.push(angular.copy($scope.data[dataIndex]));
                } else {
                    originalData[originalIndex] = angular.copy($scope.data[dataIndex]);
                }
                $scope.data[dataIndex].editRow = !$scope.data[dataIndex].editRow;
                if (!$scope.data[dataIndex].editRow) {
                    $scope.message = 'Successfully saved row.';
                    $timeout(function () {
                        $scope.message = '';
                    }, 4000);
                }
            };

            //Edit cancel event
            $scope.editCancel = function (id) {
                var originalIndex = originalData.indexBy('id', id);
                var dataIndex = $scope.data.indexBy('id', id);

                angular.copy(originalData[originalIndex], $scope.data[dataIndex]);
            }; 

            //Add row event
            $scope.add = function () {
                //Resetting Sort
                $scope.reverse = false;
                $scope.orderBy = '';

                //Resetting filter
                angular.forEach($scope.search, function (value, key) {
                    $scope.search[key] = '';
                });

                var tempRow = angular.copy($scope.search);
                tempRow['id'] = counter++;
                tempRow['editRow'] = true;
                tempRow['checked'] = false;

                $scope.data.push(tempRow);
            };

            //Delete checked rows event
            $scope.delete = function () {
                var checkedCount = $scope.data.filter(function (row) {
                    return row.checked;
                }).length;
                if (checkedCount == 0) {
                    $scope.message = 'Please select atleast one row to delete.';
                    $timeout(function () {
                        $scope.message = '';
                    }, 4000);
                    return;
                }
                var confirm = $window.confirm('Do you want to delete selected row/s?');
                if (confirm) {
                    $scope.data = $scope.data.filter(function (row) {
                        return !row.checked;
                    });
                    $scope.message = 'Successfully deleted selected row/s.';
                    $timeout(function () {
                        $scope.message = '';
                    }, 4000);
                }
            };

            //Toggle All checkboxes
            $scope.toggleAll = function () {
                $scope.data.forEach(function (value, key) {
                    value['checked'] = $scope.allSelected;
                });
            };

            //Custom array method to find index by key, value pair
            Array.prototype.indexBy = function (name, value) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i][name] == value) {
                        return i;
                    }
                }
                return -1;
            };
        },
        restrict: 'E',
        scope: {
            data: '=data',
            headers: '=headers'
        },
        template: "<!DOCTYPE html><html lang=\"en\"><head>    <meta charset=\"UTF-8\">    <style>        body {            color: #444;            font: 100%/30px 'Helvetica Neue', helvetica, arial, sans-serif;            text-shadow: 0 1px 0 #fff;        }        #container {            width: 100%;            float: left;        }        strong {            font-weight: bold;        }        em {            font-style: italic;        }        table {            background: #f5f5f5;            border-collapse: separate;            box-shadow: inset 0 1px 0 #fff;            font-size: 12px;            line-height: normal;            text-align: left;            width: inherit;        }        th {            background: linear-gradient(#777, #444);            border: 1px solid #555;            box-shadow: inset 0 1px 0 #999;            color: #fff;            font-weight: bold;            padding: 10px 15px;            text-shadow: 0 1px 0 #000;            cursor: pointer;        }        td {            border: 1px solid #fff;            padding: 10px 15px;        }        tr:nth-child(odd) td {            background: #f1f1f1;        }        .columns-icon > .line {            background-color: #f1f1f1;            height: 2px;            display: block;        }        .columns-icon > .line + .line {            margin-top: 8px;        }        div.menu {            float: inherit;            z-index: 10;            width: 150px;            height: 200px;            overflow-y: scroll;            top: 0;            left: 0;            right: 0;            bottom: 0;            background: linear-gradient(#777, #444);            border: 1px solid #555;            box-shadow: inset 0 1px 0 #999;            color: #fff;            font-weight: bold;            padding: 10px 15px;            text-shadow: 0 1px 0 #000;            margin-top: 2px;            font-size: 12px;        }        ul.menu {            text-align: left;            margin: 0;            padding: 0;        }        input.grid-button {            background: #f5f5f5;            border-collapse: separate;            box-shadow: inset 0 1px 0 #fff;            font-size: 12px;        }    </style></head><div id=\"container\">    <div style=\"font-size: small\">        <input type=\"button\" ng-click=\"add()\" value=\"Add Row\" class=\"grid-button\" title=\"Add Row\">        <input type=\"button\" ng-click=\"delete()\" value=\"Delete Rows/s\" class=\"grid-button\"               title=\"Delete selected Row/s\">        Sort by: {{headers[orderBy]}} - {{reverse ? 'Descending' : 'Ascending'}}        <div>{{message}}</div>    </div>    <div style=\"position: relative;float: left\">        <table>            <!-- BEGIN: Display Header Row -->            <thead>            <th>                <input type=\"checkbox\" ng-model=\"allSelected\" ng-click=\"toggleAll()\" title=\"Select All/Deselect All\">            </th>            <!-- Display Dynamic Header Row -->            <th ng-repeat=\"(key, value) in headers\" ng-click=\"sort(key)\" ng-if=\"view[key]\" title=\"Sort/Reverse Sort\">                {{value}}            </th>            <!-- Display Columns Menu Icon -->            <th ng-click=\"showHideColumns()\" title=\"Show/Hide Columns\">                <div class=\"columns-icon\" style=\"width: 20px\">                    <span class=\"line\"></span>                    <span class=\"line\"></span>                    <span class=\"line\"></span>                </div>            </th>            </thead>            <!-- END: Display Header Row -->            <!-- BEGIN: Display Body Rows -->            <tbody>            <tr>                <td></td>                <!-- Display Dynamic Filter Input Boxes -->                <td ng-repeat=\"(key, value) in headers\" ng-if=\"view[key]\">                    <input type=\"text\" ng-model=\"search[key]\" title=\"Filter column\">                </td>                <td></td>            </tr>            <!-- Display Dynamic Rows -->            <tr ng-repeat=\"row in data | filter:search | orderBy: orderBy : reverse\">                <!-- Display Checkboxes -->                <td>                    <input type=\"checkbox\" ng-model=\"row['checked']\" title=\"Select/Deselect Row\">                </td>                <!-- Display Dynamic Row Data -->                <td ng-repeat=\"(key, value) in headers\" ng-if=\"view[key]\">                    <div ng-if=\"!row['editRow']\">{{row[key] || ''}}</div>                    <div ng-if=\"row['editRow']\"><input type=\"text\" ng-model=\"row[key]\"></div>                </td>                <!-- Display Edit, Save and Cancel Links -->                <td>                    <a href=\"\" ng-click=\"edit(row['id'])\" title=\"{{row['editRow'] ? 'Save Row' : 'Edit Row'}}\">{{row['editRow']                        ? 'Save' : 'Edit'}}</a>                    <br>                    <a href=\"\" ng-click=\"editCancel(row['id'])\" ng-if=\"row['editRow']\" title=\"Cancel\">Cancel</a>                </td>            </tr>            </tbody>            <!-- END: Display Body Rows -->        </table>    </div>    <!-- Display Columns Menu -->    <div ng-if=\"showColumnMenu\" class=\"menu\">        <ul class=\"menu\" ng-repeat=\"(key, value) in headers\">            <input type=\"checkbox\" ng-model=\"view[key]\">{{value}}        </ul>    </div></div></html>"
    };
}]);