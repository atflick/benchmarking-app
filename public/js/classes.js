let plans = [
  {deductible: 300},
  {deductible: 500},
  {deductible: 300},
  {deductible: 1000},
  {deductible: 500}
]


class MedicalPlanData {
  constructor(data) {
    this.deductibles = []
    data.forEach((plan) => this.deductibles.push(plan.deductible))
    this.averageDeductible = this.average(this.deductibles)
  }

  average(arr) {
    let sum = arr.reduce((a, b) => a + b, 0)
    return sum / arr.length
  }
}
