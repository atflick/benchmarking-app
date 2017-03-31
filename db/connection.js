const mongoose = require('mongoose')
var shortid = require('shortid');

var EmployerSchema = new mongoose.Schema(
  {
    employer_id: {
      type: String,
      'default': shortid.generate
    },
    name: String,
    industry: String,
    state: String,
    size: String,
    region: String
  }
)
var MedicalPlanSchema = new mongoose.Schema(
  {
    plan_id: {
      type: String,
      'default': shortid.generate
    },
    type: String,
    ded_ee: Number,
    ded_f: Number,
    oop_ee: Number,
    oop_f: Number,
    office: Number,
    specialist: Number,
    uc: Number,
    er: Number,
    employer_id: String
  }
)

mongoose.model('Employer', EmployerSchema)
mongoose.model('MedicalPlan', MedicalPlanSchema)
mongoose.connect('mongodb://localhost/touchstone')

module.exports = mongoose
