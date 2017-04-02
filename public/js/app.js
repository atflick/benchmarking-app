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
  }

// Factories
  function EmployerFactoryFunction($resource) {
    return $resource('api/employers/:id', {}, {
      update: { method: 'PUT' }
    })
  }
