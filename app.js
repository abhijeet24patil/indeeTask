angular.module('vorisApp', ["ui.bootstrap"])
    .controller('vorisCtrl', function($scope, $http) {
        $scope.ArrinfoData = [];
         
        $http.get('data.json').success(function(data) {
            $scope.information  =  data;
           // console.log($scope.information);
            angular.forEach($scope.information,function(value,key){
                $scope.infoData = {};
                $scope.infoData['ip'] = key; 
                for (var i = 0; i < value.length; i++) {
                    $scope.infoData['timestamp'] = value[i].timestamp;
                    $scope.infoData['fullView'] = value[i].full_view;
                    $scope.infoData['seek'] = value[i].seek;
                    $scope.infoData['fullLength'] = value[i].full_length;
                    $scope.sBar  =  [];

                   if(value[i].seek != null){
                        $scope.bar  =  {};
                        $scope.bar["value"]  =  (parseInt(value[i].seek[0][0])/parseInt(value[i].full_length))*100;
                        $scope.bar["type"]  =  "success";
                        $scope.sBar.push($scope.bar);
                        $scope.bar  =  {};
                        
                        console.log(value[i].seek.length);
                        for (var j = 0; j<value[i].seek.length; j++) {
                             $scope.bar  =  {};    
                             $scope.bar["value"]  =  ((parseInt(value[i].seek[j][1])-parseInt(value[i].seek[j][0])) /parseInt(value[i].full_length))*100;
                             $scope.bar["type"]  =  "default";
                             $scope.sBar.push($scope.bar);                             
                        };

                        for (var k = 1; k<value[i].seek.length; k++) {
                             $scope.bar  =  {};    
                             $scope.bar["value"]  =  ((parseInt(value[i].seek[(k)][0])-parseInt(value[i].seek[(k-1)][1]))/parseInt(value[i].full_length))*100;
                             $scope.bar["type"]  =  "success";
                             $scope.sBar.push($scope.bar);                             
                        };



                        $scope.infoData['seek'] =$scope.sBar;
                    }

                };
                 $scope.ArrinfoData.push($scope.infoData);
                
            })
        });
            //console.log($scope.sBar);
        console.log($scope.ArrinfoData);
         $scope.stacked = [{"value":23.69,"type":"info"},{"value":27,"type":"success"},{"value":27,"type":"danger"}];
    });
