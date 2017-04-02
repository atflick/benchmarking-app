angular.module('touchstone')
  .controller('medicalNewCtrl', [
    '$stateParams',
    '$state',
    'MedicalFactory',
    'EmployerFactory',
    MedicalNewCtrlFunction
  ])
  .controller('medicalShowCtrl', [
    '$stateParams',
    '$state',
    'MedicalFactory',
    'EmployerFactory',
    MedicalShowCtrlFunction
  ])

function MedicalNewCtrlFunction($stateParams, $state, MedicalFactory, EmployerFactory) {
  this.newMedPlan = new MedicalFactory()
  this.newMedPlan.employer_id = $stateParams.id
  this.createReload = () => {
    this.newMedPlan.$save().then(() => {
      $state.reload()
    })
  }
  this.createShow = () => {
    this.newMedPlan.$save().then((plan) => {
      $state.go('employersShow', {id: plan.employer_id})
    })
  }
  this.employer = EmployerFactory.get({id: $stateParams.id})
}

function MedicalShowCtrlFunction($stateParams, $state, MedicalFactory, EmployerFactory) {
  this.employer = EmployerFactory.get({id: $stateParams.id})
  this.medPlan = MedicalFactory.get({id: $stateParams.plan_id})
}
