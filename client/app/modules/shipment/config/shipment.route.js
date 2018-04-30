(function () {
  'use strict';
  angular
    .module('com.module.shipment')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.shipment', {
          abstract: true,
          url: '/shipment',
          templateUrl: 'modules/shipment/views/main.html'
        })
        .state('app.shipment.list', {
          url: '',
          templateUrl: 'modules/shipment/views/list.html',
          controllerAs: 'ctrl',
           controller: function (shipment) {

             this.shipment = shipment;
           },
           resolve: {
             shipment: function (ShipmentService) {

               return ShipmentService.find();
             }
           }
        })

        .state('app.shipment.view', {
          url: '/:id',
          templateUrl: 'modules/shipment/views/view.html'

        })
        .state('app.shipment.delete', {
          url: '/:id/delete',
          template: ''
          });
    });

})();
