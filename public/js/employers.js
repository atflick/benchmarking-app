angular.module('touchstone')
  .controller('employersIndexCtrl', [
    '$state',
    'EmployerFactory',
    EmployersIndexCtrlFunction
  ])
  .controller('employersShowCtrl', [
    '$stateParams',
    '$state',
    'EmployerFactory',
    EmployerShowCtrlFunction
  ])





function EmployersIndexCtrlFunction($state, EmployerFactory) {

}

function EmployerShowCtrlFunction($stateParams, $state, EmployerFactory) {
  
}
