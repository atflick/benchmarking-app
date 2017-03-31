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


// Medical Plan Routes


app.get('*', (req, res) => {
  res.sendfile('./public/index.html')
})

app.listen(app.get('port'), () => {
  console.log('App running');
})
