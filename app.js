angular.module('indeeApp', ["ui.bootstrap"])
    .controller('videoCtrl', function($scope, $http) {
        //data object to store all informat
        $scope.information = {
            "204.138.240.254": [{
                "full_length": "160.149",
                "full_view": true,
                "timestamp": "2015-12-21 22:50:13",
                "ontime": "55",
                "complete": "159.93"
            }],
            "172.91.132.56": [{
                "full_length": "0",
                "timestamp": "2015-12-22 05:26:50"
            }],
            "216.52.215.232": [{
                "full_length": "160.149",
                "full_view": true,
                "timestamp": "2015-12-22 00:04:51",
                "ontime": "115",
                "complete": "160.01"
            }],
            "64.239.129.250": [{
                "full_length": "160.149",
                "timestamp": "2015-12-21 22:21:46",
                "seek": [
                    ["12.17", "17.31022279411765"],
                    ["18.17", "28.31022279411765"]
                ],
                "pause": "18.05",
                "ontime": "18.05"
            }],
            "166.170.14.89": [{
                "full_length": "160.14833068847656",
                "full_view": true,
                "timestamp": "2015-12-22 00:17:04",
                "complete": "160.14833068847656"
            }],
            "64.15.218.74": [{
                "timestamp": "2015-12-15 20:55:30",
                "pause": "25.69",
                "ontime": "180",
                "seek": [
                    ["25.69", "78.02891724617524"],
                    ["89.54", "127.31033866481224"]
                ],
                "full_length": "5905.557"
            }]
        };

        $scope.ArrinfoData = []; //to store objects
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

        // to add data from input form
        $scope.addData = function() {
            if ($scope.video.fullView == 1) {
                $scope.video.fullView = true;
            }
            if ($scope.video.fullView == 0) {
                $scope.video.fullView = false;
            }

            if ($scope.video.seek.from != null && $scope.video.seek.to != null) {

                $scope.sBar = [];
                //adds viewed part to display-bar with green color
                $scope.bar = {};
                $scope.bar["value"] = (parseInt($scope.video.seek.from) / parseInt($scope.video.fullLength)) * 100;
                $scope.bar["type"] = "success";
                $scope.sBar.push($scope.bar);
                $scope.bar = {};

                //adds the seek value to display-bar with grey color
                $scope.bar["value"] = ((parseInt($scope.video.seek.to) - parseInt($scope.video.seek.from)) / parseInt($scope.video.fullLength)) * 100;
                $scope.bar["type"] = "default";
                $scope.sBar.push($scope.bar);
                $scope.bar = {};

                $scope.bar["value"] = ((parseInt($scope.video.fullLength) - parseInt($scope.video.seek.to)) / parseInt($scope.video.fullLength)) * 100;
                $scope.bar["type"] = "success";
                $scope.sBar.push($scope.bar);

                $scope.video['seek'] = $scope.sBar;
            }

            console.log($scope.video);
            $scope.ArrinfoData.push($scope.video);
        }

        //To clear the form fields
        $scope.clear = function() {
            $scope.video = {};

        }

        $scope.remove = function(index) {
            $scope.ArrinfoData.splice(index, 1);
        }

    });