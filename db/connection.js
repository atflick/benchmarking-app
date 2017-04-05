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
    _id: {
      type: String,
      'default': shortid.generate
    },
    name: String,
    type: String,
    ded_ee: Number,
    ded_f: Number,
    oop_ee: Number,
    oop_f: Number,
    office: Number,
    specialist: Number,
    uc: Number,
    er: Number,
    employer_id: String,
    employer: Object
  }
)

mongoose.model('Employer', EmployerSchema)
mongoose.model('MedicalPlan', MedicalPlanSchema)
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/touchstone')

module.exports = mongoose
