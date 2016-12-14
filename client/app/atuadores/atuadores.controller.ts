'use strict';

(function() {

class AtuadoresController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket.socket;

    this.lampada = false;
    this.irrigacao = false;
    this.ventilacao = false;
  }

  $onInit() {
    console.log(this.socket);
    this.socket.on('lampada_state', function (data) {
      console.log(data);
      this.lampada = data;
    });

    this.socket.on('irrigacao_state', function (data) {
      console.log(data);
      this.irrigacao = data;
    });

    this.socket.on('ventilacao_state', function (data) {
      console.log(data);
      this.ventilacao = data;
    });

  }

  onLampadaChange(state) {
    this.lampada = state;
    this.socket.emit('on_change_lampada', this.lampada);
    console.log('mitted', this.lampada);
  }

  onIrrigacaoChange(state) {
    this.irrigacao = state;
    this.socket.emit('on_change_irrigacao', this.irrigacao);
  }

  onVentilacaoChange(state) {
    this.ventilacao = state;
    this.socket.emit('on_change_ventilacao', this.ventilacao);
  }

}

angular.module('siteCurApp')
  .component('atuadores', {
    templateUrl: 'app/atuadores/atuadores.html',
    controller: AtuadoresController
  });

})();
