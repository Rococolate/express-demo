'use strict'

const ApodModel = require('../models/apodModel')

function saveApodToDB (date,data,cb) {
  let _apod = {}

  ApodModel.findByDate(date,function (err,apod) {
    if(err){
      console.log(err)
    }
    if(apod != null){
      return false
    }else{
      _apod = new ApodModel({
        date:data.date,
        explanation:data.explanation,
        hdurl:data.hdurl,
        media_type:data.media_type,
        title:data.title,
        url:data.url
      })

      _apod.save(function (err,apod) {
        if(err){
          console.log(err)
        }
        console.log('apod=====>',apod)
        console.log('cb=====>')
        if(typeof cb == 'function'){
          cb()
        }
      })
    }
  })
}

module.exports = saveApodToDB