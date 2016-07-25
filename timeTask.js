'use strict'
const request = require('request');
const mongoose = require('mongoose')
const ApodModel = require('./models/apodModel')
const yesterday = require('./lib/yesterday')
const dateFormat = require('./lib/dateFormat')
const saveApodToDB = require('./lib/saveApodToDB')
const lessThanEndDate = require('./lib/lessThanEndDate')

const endDate = '1995-06-16'


// dev 
// const taskTimeInterval = 1000 
// const limit = 950

// produce
const limit = 500
const taskTimeInterval = 7500


let l = limit


mongoose.connect('mongodb://localhost/apod')

var date = new Date()

timeTask(date)

function timeTask (date) {
  console.log('start====>',dateFormat(date))
  if(lessThanEndDate(dateFormat(date),endDate)) return false
  if(l < limit ) return false
  ApodModel.findByDate(dateFormat(date),function (err,apod) {
      if(err){
        console.log(err)
      }
      console.log('apod=====>',apod)
      if(apod != null){
        timeTask(yesterday(date))
      }else{
        try{
          let url = `https://api.nasa.gov/planetary/apod?hd=true&api_key=1kD6jUfLLv5X8BYHfExJ5e6trif3mCT7pOVnUX4e&date=${dateFormat(date)}`
          request(url,(error,response,body)=>{
            console.log('================')
            console.log(response.headers)
            console.log('================')
            l = Number(response.headers['x-ratelimit-remaining'])
            if(!error && response.statusCode == 200 ){

              let data = JSON.parse(body)
              
                saveApodToDB(dateFormat(date),data,()=>{
                  setTimeout(()=>{
                    timeTask(yesterday(date))
                  },taskTimeInterval)
                })
            }else{
              if(response.statusCode == '400') return false
              console.log(error,response.statusCode)
              setTimeout(()=>{
                timeTask(yesterday(date))
              },taskTimeInterval)
            }
          })
        }catch(e){
          console.log(e)
          return false
        }
      }

    })
}

