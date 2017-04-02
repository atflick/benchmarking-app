let dropData = {
  states: ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
  sizes: ["2-50", "51-99", "100-249", "250+"],
  industries: ["Non-Profit/Association", "Professional Services", "Technology", "Manufacturing/Construction", "Other"],
  regions: ["Mid-Atlantic", "Mid-West", "Northeast", "West", "South"]
}

angular.module('touchstone')
  .controller('employersIndexCtrl', [
    '$state',
    'EmployerFactory',
    EmployersIndexCtrlFunction
  ])
  .controller('employersNewCtrl', [
    '$state',
    'EmployerFactory',
    EmployersNewCtrlFunction
  ])
  .controller('employersShowCtrl', [
    '$stateParams',
    '$state',
    'EmployerFactory',
    EmployerShowCtrlFunction
  ])





function EmployersIndexCtrlFunction($state, EmployerFactory) {
  this.employers = EmployerFactory.query()
}

function EmployersNewCtrlFunction($state, EmployerFactory) {
  this.newEmployer = new EmployerFactory()
  this.createReload = () => {
    this.newEmployer.$save().then(() => {
      $state.reload()
    })
  }
  this.createShow = () => {
    this.newEmployer.$save().then((er) => {
      $state.go('employersShow', {id: er.employer_id})
    })
  }
  this.dropData = dropData
}

function EmployerShowCtrlFunction($stateParams, $state, EmployerFactory) {
  this.employer = EmployerFactory.get({id: $stateParams.id})
  this.update = () => {
    this.employer.$update({id: $stateParams.id}, (er) => {
      // $state.go('employersShow', {id: er.employer_id})
    })
  }
  this.delete = () => {
    this.employer.$delete({id: $stateParams.id}).then(() => {
      $state.go('employersIndex')
    })
  }
  this.dropData = dropData
}
