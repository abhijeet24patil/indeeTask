angular.module('indeeApp', ["ui.bootstrap"])
    .controller('videoCtrl', function($scope, $http) {
        $scope.information = {};
        $scope.refreshData = function(formObj) {
            $scope.ArrinfoData = []; //to store objects

            $http.get('data.json').success(function(data) {
                $scope.information = data;
                angular.forEach($scope.information, function(value, key) {
                    $scope.infoData = {}; //object to get new values for data
                    $scope.infoData['ip'] = key;
                    for (var i = 0; i < value.length; i++) {
                        //copy each object from json and put it in new object and then push to new array
                        $scope.infoData['timestamp'] = value[i].timestamp;
                        $scope.infoData['fullView'] = value[i].full_view;
                        $scope.infoData['seek'] = value[i].seek;
                        $scope.infoData['fullLength'] = value[i].full_length;
                        $scope.infoData['ontime'] = value[i].ontime;
                        $scope.infoData['complete'] = value[i].complete;

                        $scope.sBar = [];
                        //if seek is present in object then calculate the seek time and view time.
                        if (value[i].seek != null) {
                            //adds viewed part to display-bar with green color
                            $scope.bar = {};
                            $scope.bar["value"] = (parseInt(value[i].seek[0][0]) / parseInt(value[i].full_length)) * 100;
                            $scope.bar["type"] = "success";
                            $scope.sBar.push($scope.bar);
                            $scope.bar = {};

                            //adds the seek value to display-bar with grey color
                            for (var j = 0; j < value[i].seek.length; j++) {
                                $scope.bar = {};
                                $scope.bar["value"] = ((parseInt(value[i].seek[j][1]) - parseInt(value[i].seek[j][0])) / parseInt(value[i].full_length)) * 100;
                                $scope.bar["type"] = "default";
                                $scope.sBar.push($scope.bar);
                            };

                            //adds the viewed part(betwwen 2 seeks) to the display-bar with green color  
                            for (var k = 1; k < value[i].seek.length; k++) {
                                $scope.bar = {};
                                $scope.bar["value"] = ((parseInt(value[i].seek[(k)][0]) - parseInt(value[i].seek[(k - 1)][1])) / parseInt(value[i].full_length)) * 100;
                                $scope.bar["type"] = "success";
                                $scope.sBar.push($scope.bar);
                            };

                            $scope.infoData['seek'] = $scope.sBar;
                        }

                    };
                    //push each object to array 
                    $scope.ArrinfoData.push($scope.infoData);

                })
            });
            
            if (formObj != 0) {
                $scope.ArrinfoData.push(formObj);
            }
            console.log($scope.ArrinfoData);
        }

        $scope.refreshData(0);
        //to add data from input form
        $scope.addData = function() {
            if ($scope.video.fullView == 1) {
                $scope.video.fullView = true;
            }
            if ($scope.video.fullView == 0) {
                $scope.video.fullView = false;
            }
            $scope.refreshData($scope.video);
        }

        //To clear the form fields
        $scope.clear = function() {
            $scope.video = {};
        }

    });