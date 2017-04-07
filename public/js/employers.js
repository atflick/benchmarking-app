let dropData = {
  states: ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
  sizes: ["2-50", "51-99", "100-249", "250+"],
  industries: ["Non-Profit/Association", "Professional Services", "Technology", "Manufacturing/Construction", "Other"],
  regions: ["Mid-Atlantic", "Mid-West", "Northeast", "West", "South"],
  plan_types: ["hmo", "ppo", "pos", "hdhp"]

}

let colors = ["#2b5876", "#49535A", "#2a6875", "#464776", "#0062A3", "#323539"]

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
    'ErMedicalFactory',
    EmployerShowCtrlFunction
  ])
  .controller('medicalCompareCtrl', [
    '$stateParams',
    '$state',
    'EmployerFactory',
    'ErMedicalFactory',
    'CategoryFactory',
    MedicalCompareCtrlFunction
  ])


function EmployersIndexCtrlFunction($state, EmployerFactory) {
  this.employers = EmployerFactory.query()

  this.propertyName = 'name';
  this.reverse = false;
  this.sortBy = (propertyName) => {
    this.reverse = (this.propertyName === propertyName) ? !this.reverse : false;
    this.propertyName = propertyName;
  }

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

  this.filterBy = (employer) => {
    if (this.filters.length === 0) {
      return employer
    } else if (this.filters.indexOf(employer.size) !== -1) {
      return employer
    }  else if (this.filters.indexOf(employer.industry) !== -1) {
      return employer
    }  else if (this.filters.indexOf(employer.region) !== -1) {
      return employer
    } else {
      return
    }
  }
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

function EmployerShowCtrlFunction($stateParams, $state, EmployerFactory, ErMedicalFactory) {
  this.employer = EmployerFactory.get({id: $stateParams.id})
  this.medPlans = ErMedicalFactory.query({id: $stateParams.id})
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

function MedicalCompareCtrlFunction($stateParams, $state, EmployerFactory, ErMedicalFactory, CategoryFactory) {
  this.activePlan = {}
  this.sizeData = {}
  this.industryData = {}
  this.regionData = {}
  this.chartEmployers = []
  this.colors = colors
  this.employer = EmployerFactory.get({id: $stateParams.id})
  this.medPlans = ErMedicalFactory.query({id: $stateParams.id}, (res) => {
    this.activePlan = res[0]
    this.updateData()
  })

  this.setActivePlan = () => {
    this.updateData()
  }

  this.updateData = (callback) => {
    CategoryFactory.query({
      type: this.activePlan.type,
      category: "employer.size",
      subcategory: this.employer.size
    }, (res) => {
      this.sizeData = new MedicalPlanData(res)
      console.log("size data:", this.sizeData);
      CategoryFactory.query({
        type: this.activePlan.type,
        category: "employer.industry",
        subcategory: this.employer.industry
      }, (res) => {
        this.industryData = new MedicalPlanData(res)
        console.log("industry data:",this.industryData);
        CategoryFactory.query({
          type: this.activePlan.type,
          category: "employer.region",
          subcategory: this.employer.region
        }, (res) => {
          this.regionData = new MedicalPlanData(res)
          console.log("region:", this.regionData);
          this.updateGraphData(this.sizeData, this.industryData, this.regionData)
          this.chartEmployers = [this.activePlan.name, this.employer.size, this.employer.industry, this.employer.region]
        })
      })
    })
  }

  this.setActivePlan()
  this.barData = {
    labels: ['Office Visit Co-Pay', 'Specialist Visit Co-Pay', 'Urgent Care Co-Pay', 'Emergency Room Co-Pay'],
    series: [],

  }

  this.barTwoData = {
    labels: ['Deductible - Individual', 'Deductible - Family', 'Plan Maximum - Individual', 'Plan Maximum - Family'],
    series: [],

  }

  this.updateGraphData = (sizeData, industryData, regionData) => {
    this.barData.series = [], this.barTwoData.series = []
    let plansArr = [this.activePlan, sizeData, industryData, regionData]
    plansArr.forEach((plan) => {
      let singlePlanArr = []
      singlePlanArr.push(plan.office, plan.specialist, plan.uc, plan.er)
      this.barData.series.push(singlePlanArr)
      singlePlanArr = []
      singlePlanArr.push(plan.ded_ee, plan.ded_f, plan.oop_ee, plan.oop_f)
      this.barTwoData.series.push(singlePlanArr)
    })
    console.log(this.barData.series);
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

  this.dropData = dropData


}
