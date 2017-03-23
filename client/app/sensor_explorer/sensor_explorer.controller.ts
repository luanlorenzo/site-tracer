'use strict';
(function(){

  class SensorExplorerComponent {
    constructor($http, Auth, $state) {
      this.Auth = Auth;
      this.$http = $http;
      this.$state = $state;
      this.sensors = [];
    }

    $onInit() {
      this.$http.get('/api/sensors').then(response => {
        this.sensors = response.data;
      });
    }
  }

  class ManageSensorComponent {
    /*var errors: [];
    var submitted: false;*/

    constructor($http, Auth, $state, $filter) {
      this.Auth = Auth;
      this.$http = $http;
      this.$state = $state;
      this.$filter = $filter;

      if(this.$state.params.id) {
        this.$http.get('/api/sensors/' + this.$state.params.id)
        .then(response => {
          this.sensor = response.data;
        })
        .catch(err => {
          console.log(err);
        });
      }

      this.dates = {
        date_start: new Date(),
        date_end: new Date()
      };

      this.open = {
        date_start: false,
        date_end: false,
      };

    }

    $onInit() {
      var totalWidth = $('#chart_area').parent().width();
      $('#chart_area').width(totalWidth);
    }

    openCalendar(e, date) {
        this.open[date] = true;
    }

    loadData() {
      this.$http({
        url: '/api/sensor_data/get_sensor_data/' + this.$state.params.id,
        method: 'GET',
        params: {
          id: this.$state.params.id,
          date_start: this.dates.date_start,
          date_end: this.dates.date_end
        }
      })
      .then(response => {
        this.sensor_data = response.data.results;
        this.downloadCsvLink = response.data.csvFilename;
        this.series = [this.sensor.name];
        this.data = [];
        this.labels = [];
        this.options = {
          labels: {
            generateLabels: function (chart) {
              console.log(chart);
            }
          }
        };

        var _data = [];
        for (let i = 0; i < this.sensor_data.length ; i++) {
            _data.push(this.sensor_data[i].value);
            if(this.sensor.idSensor == 100)
            {
              this.labels.push(this.sensor_data[i].value2);
            }
            else
            {
              this.labels.push(this.$filter('date')(this.sensor_data[i].date, 'dd/MM/yyyy HH:mm'));
            }
        }
        this.data.push(_data);

      })
      .catch(err => {
        console.log(err);
      });
    }

  }

  angular.module('siteCurApp')
  .component('sensorExplorer', {
    templateUrl: 'app/sensor_explorer/sensor_explorer.html',
    controller: SensorExplorerComponent
  })
  .component('sensorExplorerRead', {
    templateUrl: 'app/sensor_explorer/sensor_explorer_read.html',
    controller: ManageSensorComponent
  });

})();
