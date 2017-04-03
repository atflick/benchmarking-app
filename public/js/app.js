angular
  .module('touchstone', [
    'ui.router',
    'ngResource'
  ])
  .config([
    '$stateProvider',
    RouterFunction
  ])
  .factory('EmployerFactory', [
    '$resource',
    EmployerFactoryFunction
  ])
  .factory('MedicalFactory', [
    '$resource',
    MedicalFactoryFunction
  ])
  .factory('ErMedicalFactory', [
    '$resource',
    ErMedicalFactoryFunction
  ])

// Routes
  function RouterFunction($stateProvider) {
    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: 'js/ng-views/welcome.html'
      })
      .state('employersIndex', {
        url: '/employers',
        templateUrl: 'js/ng-views/employers/index.html',
        controller: 'employersIndexCtrl',
        controllerAs: 'vm'
      })
      .state('employersNew', {
        url: '/employers/new',
        templateUrl: 'js/ng-views/employers/new.html',
        controller: 'employersNewCtrl',
        controllerAs: 'vm'
      })
      .state('employersShow', {
        url: '/employers/:id',
        templateUrl: 'js/ng-views/employers/show.html',
        controller: 'employersShowCtrl',
        controllerAs: 'vm'
      })
      .state('medicalIndex', {
        url: '/medical',
        templateUrl: 'js/ng-views/medical/index.html',
        controller: 'medicalIndexCtrl',
        controllerAs: 'vm'
      })
      .state('medicalNew', {
        url: '/employers/:id/new_medical',
        templateUrl: 'js/ng-views/medical/new.html',
        controller: 'medicalNewCtrl',
        controllerAs: 'vm'
      })
      .state('medicalEdit', {
        url: '/employers/:id/medical/:plan_id',
        templateUrl: 'js/ng-views/medical/edit.html',
        controller: 'medicalEditCtrl',
        controllerAs: 'vm'
      })
  }

// Factories
  function EmployerFactoryFunction($resource) {
    return $resource('api/employers/:id', {}, {
      update: { method: 'PUT' }
    })
  }
  function MedicalFactoryFunction($resource) {
    return $resource('api/medical/:id', {}, {
      update: { method: 'PUT' }
    })
  }
  function ErMedicalFactoryFunction($resource) {
    return $resource('api/employer/medical/:id', {}, {
      update: { method: 'PUT' }
    })
  }
