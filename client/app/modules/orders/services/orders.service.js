(function () {
  'use strict';
  angular
    .module('com.module.orders')
    .service('OrdersService', function ($state, CoreService, Order, gettextCatalog) {

      this.getOrders = function () {
        return Order.find().$promise;
      };

      this.getOrder = function (id) {
        return Order.findById({
          id: id
        }).$promise;
      };



      this.deleteOrder = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Order.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Note deleted'),
                gettextCatalog.getString('Your note is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting note'),
                gettextCatalog.getString('Your note is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'title',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title'),
              required: true
            }
          },
          {
            key: 'body',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Body'),
              required: true
            }
          }
        ];
      };

    });

})();
