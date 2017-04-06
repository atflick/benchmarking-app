


class MedicalPlanData {
  constructor(data) {
    this.ded_ee = this.dataSetter('ded_ee', data)
    this.ded_f = this.dataSetter('ded_f', data)
    this.oop_ee = this.dataSetter('oop_ee', data)
    this.oop_f = this.dataSetter('oop_f', data)
    this.office = this.dataSetter('office', data)
    this.specialist = this.dataSetter('specialist', data)
    this.uc = this.dataSetter('uc', data)
    this.er = this.dataSetter('er', data)
  }

  dataSetter(key, data) {
    let allVals = []
    data.forEach((item) => {
      allVals.push(item[key])
    })
    return this.average(allVals)
  }

  average(arr) {
    let sum = arr.reduce((a, b) => a + b, 0)
    return sum / arr.length
  }
}
