const express = require('express')
const app = express()
const parser = require('body-parser')
const mongoose = require('./db/connection.js')

const Employer = mongoose.model('Employer')
const MedicalPlan = mongoose.model('MedicalPlan')


app.set('port', process.env.PORT || 3001)

app.use('/assets', express.static('public'))
app.use(parser.json({extended: true}))
app.use(express.static(__dirname + '/public'))

// Employer Routes
app.get('/api/employers', (req, res) => {
  Employer.find({}).then((ers) => {
    res.json(ers)
  })
})

app.get('/api/employers/:id', (req, res) => {
  Employer.findOne({employer_id: req.params.id}).then((er) => {
    res.json(er)
  })
})

app.post('/api/employers', (req, res) => {
  Employer.create(req.body).then((er) => {
    res.json(er)
  })
})

app.delete('/api/employers/:id', (req, res) => {
  Employer.findOneAndRemove({employer_id: req.params.id}).then(() => {
    res.json({success: true})
  })
})

app.put('/api/employers/:id', (req, res) => {
  Employer.findOneAndUpdate({employer_id: req.params.id}, req.body, {new: true}).then((er) => {
    res.json(er)
  })
})

// Medical Plan Routes
app.get('/api/medical', (req, res) => {
  MedicalPlan.find({}).then((plans) => {
    res.json(plans)
  })
})

app.get('/api/employer/medical/:id', (req, res) => {
  MedicalPlan.find({employer_id: req.params.id}).then((plans) => {
    res.json(plans)
  })
})

app.get('/api/medical/:id', (req, res) => {
  MedicalPlan.findOne({_id: req.params.id}).then((plan) => {
    res.json(plan)
  })
})

app.post('/api/medical', (req, res) => {
  MedicalPlan.create(req.body).then((plan) => {
    res.json(plan)
  })
})

app.delete('/api/medical/:id', (req, res) => {
  MedicalPlan.findOneAndRemove({_id: req.params.id}).then(() => {
    res.json({success: true})
  })
})

app.put('/api/medical/:id', (req, res) => {
  MedicalPlan.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then((plan) => {
    res.json(plan)
  })
})

// Angular route
app.get('*', (req, res) => {
  res.sendfile('./public/index.html')
})

app.listen(app.get('port'), () => {
  console.log('App running');
})
