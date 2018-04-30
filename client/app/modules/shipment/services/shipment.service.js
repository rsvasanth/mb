(function () {
  'use strict';
  angular
  .module('com.module.shipment')
    .service('ShipmentService', function ($http, CoreService, Shipment, gettextCatalog) {

      this.find = function () {
        return Shipment.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };


    });

})();
