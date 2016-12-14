'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.sensors = [];
    this.socket = socket.socket;
  }

  $onInit() {
    this.$http.get('/api/sensors').then(response => {

      this.sensors = response.data;

      for(var index in this.sensors) {
        this.socket.on('data_arrived:' + this.sensors[index]._id, data => {
           for (var i = 0; i < this.sensors.length; i++) {
             if(this.sensors[i]._id == data.sensor) {
               this.sensors[i].last_read_value = data.value;
               this.sensors[i].last_read_date = data.date;
             }
           }
         });
        this.loadSensorData(index);
      }

    });
  }

  loadSensorData(_i) {
    this.$http.get('/api/sensor_data/get_last_read/' + this.sensors[_i]._id)
    .then(res => {

      this.sensors[_i].last_read_value = 'N/A';
      this.sensors[_i].last_read_date = 'N/A';

      if(res.data.length > 0) {
        this.sensors[_i].last_read_value = res.data[0].value;
        this.sensors[_i].last_read_date = res.data[0].date;
      }
    });
  }

}

angular.module('siteCurApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
