angular.module('touchstone')
  .controller('medicalIndexCtrl', [
    '$state',
    'MedicalFactory',
    MedicalIndexCtrlFunction
  ])
  .controller('medicalNewCtrl', [
    '$stateParams',
    '$state',
    'MedicalFactory',
    'EmployerFactory',
    MedicalNewCtrlFunction
  ])
  .controller('medicalEditCtrl', [
    '$stateParams',
    '$state',
    'MedicalFactory',
    'EmployerFactory',
    MedicalEditCtrlFunction
  ])

function MedicalIndexCtrlFunction($state, MedicalFactory) {
  this.medPlans = MedicalFactory.query()
  this.limit = 5
  this.numChecked = 0
  this.plansToCompare = []
  this.checkChanged = (plan) => {
    plan.checked ? this.numChecked++ : this.numChecked--
  }
  this.compare = () => {
    this.plansToCompare = this.medPlans.filter((plan) => plan.checked)
    console.log(this.plansToCompare);
  }
}

function MedicalNewCtrlFunction($stateParams, $state, MedicalFactory, EmployerFactory) {
  this.newMedPlan = new MedicalFactory()
  this.employer = EmployerFactory.get({id: $stateParams.id})
  this.newMedPlan.employer_id = $stateParams.id
  this.newMedPlan.employer = this.employer
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

function MedicalEditCtrlFunction($stateParams, $state, MedicalFactory, EmployerFactory) {
  this.employer = EmployerFactory.get({id: $stateParams.id})
  this.medPlan = MedicalFactory.get({id: $stateParams.plan_id})
  this.medPlan.employer = this.employer
  this.update = () => {
    this.medPlan.$update({id: $stateParams.plan_id}, (plan) => {
      $state.go('employersShow', {id: plan.employer_id})
    })
  }
  this.delete = () => {
    this.medPlan.$delete({id: $stateParams.plan_id}).then(() => {
      $state.go('employersShow', {}, {id: $stateParams.id})
    })
  }
}
