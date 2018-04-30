(function () {
  'use strict';
  angular
    .module('com.module.users')
    .service('UserService', function ($state, CoreService, User, gettextCatalog) {

this.find = function () {
        return User.find({   filter: {
        include: [
          'roles'
        ]
      }}).$promise;
      };

      this.findById = function (id) {
        return User.findById({filter: {
        include: [
          'roles'
        ]
      },
          id: id
        }).$promise;
      };

      this.upsert = function (user) {
        return User.upsert(user).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('User saved'),
              gettextCatalog.getString('Your user is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving user '),
              gettextCatalog.getString('This user could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            User.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('User deleted'),
                gettextCatalog.getString('Your user is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting user'),
                gettextCatalog.getString('Your user is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };


      this.getFormFields = function (formType) {
        var genders = {
        0: 'Male',
        1: 'Female'
      };
        var form = [
          {
            key: 'username',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Username'),
              required: true
            }
          },
                 {
            key: 'user_type',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('User Type'),
              options: [
        {
          "name": "Vender",
          "value": "vendor"
        },
        {
          "name": "customer",
          "value": "customer"
        },
                  {
          "name": "staff",
          "value": "staff"
        }
      ]
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Email'),
              required: true
            }
          },
          {
            key: 'firstname',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('First name'),
              required: true
            }
          },
          {
            key: 'lastname',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Last name'),
              required: true
            }
          },
          {
            key: 'phone',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('phone'),
              required: true
            }
          }
        ];
        if (formType === 'add') {
          form.push({
            key: 'password',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Password'),
              required: true
            }
          });
        }
        return form;
      };

    });

})();
