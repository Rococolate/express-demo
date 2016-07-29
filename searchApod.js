'use strict'
const request = require('request');
const mongoose = require('mongoose')
const ApodModel = require('./models/apodModel')
const yesterday = require('./lib/yesterday')
const dateFormat = require('./lib/dateFormat')


mongoose.connect('mongodb://localhost/apod')

ApodModel.fetch(function (err,apod) {
  apod.sort(function (a,b) {
    return dateSort(a.date,b.date)
  })

  console.log('==============s=============================s=============================s=============================s=============================s=============================s=============================s===============')
  console.log(apod)
  console.log('==============e=============================e=============================e=============================e=============================e=============================e=============================e=============================e===============')
  

})

function dateSort (a,b) {
  return new Date(a) - new Date(b)
}