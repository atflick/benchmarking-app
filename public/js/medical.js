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
  this.colors = colors

  // Bar Graph features
  this.barData = {
    labels: ['Office Visit Co-Pay', 'Specialist Visit Co-Pay', 'Urgent Care Co-Pay', 'Emergency Room Co-Pay'],
    series: [],

  }

  this.barTwoData = {
    labels: ['Deductible - Individual', 'Deductible - Family', 'Plan Maximum - Individual', 'Plan Maximum - Family'],
    series: [],

  }

  this.chartEmployers = []
  // everytime someone clicks compare, this function grabs each employer that is selected
  // and pushes the data to the series arrays for each bar graph
  this.compare = () => {
    this.barData.series = [], this.barTwoData.series = [], this.chartEmployers = []
    this.plansToCompare = this.medPlans.filter((plan) => plan.checked)
    this.plansToCompare.forEach((plan) => {
      this.chartEmployers.push(`${plan.employer.name} ${plan.type.toUpperCase()}`)
      let planInfo = [], planInfoTwo = []
      planInfo.push(plan.office, plan.specialist, plan.uc, plan.er)
      this.barData.series.push(planInfo)
      planInfoTwo.push(plan.ded_ee, plan.ded_f, plan.oop_ee, plan.oop_f)
      this.barTwoData.series.push(planInfoTwo)
    })
  }

  this.barOptions = {
    seriesBarDistance: 25,
    axisY: {
      // offset: 10,
      labelInterpolationFnc: function(value) {
        return '$' + value;
      }
    }
  }
  this.barTwoOptions = {
    seriesBarDistance: 25,
    // horizontalBars: true,
    axisY: {
      // offset: 10,
      labelInterpolationFnc: function(value) {
        return '$' + value;
      }
    }
  }

  this.barResponsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }]
  ]

  this.events = {
    draw: function(obj) {
      console.log(obj);
    }
  }

  // sorting functionality
  this.propertyName = 'name';
  this.reverse = false;
  this.sortBy = (propertyName) => {
    this.reverse = (this.propertyName === propertyName) ? !this.reverse : false;
    this.propertyName = propertyName;
  }

  // everytime checkbox is clicked this function runs and either adds/removes from
  // the filters array which is
  this.filters = []
  this.dropData = dropData
  this.updateFilter = (filter) => {
    let x = 0;
    if (this.filters.indexOf(filter)  === -1) {
      return this.filters.push(filter)
    } else {
      x = this.filters.indexOf(filter)
      this.filters.splice(x, 1)
    }
  }
  // every ng-repeat iteration checks the plan to see if values match with whats
  // in the filters array
  this.filterBy = (plan) => {
    if (this.filters.length === 0) {
      return plan
    } else if (this.filters.indexOf(plan.employer.size) !== -1 || this.filters.indexOf(plan.type) !== -1) {
      return plan
    }  else {
      return
    }
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
      $state.go('employersShow', {id: $stateParams.id})
    })
  }
}
