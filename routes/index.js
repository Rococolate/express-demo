'use strict'

var express = require('express');
var router = express.Router();

const request = require('request');
let dateFormat = require('../lib/dateFormat')
let ApodModel = require('../models/apodModel')
let saveApodToDB = require('../lib/saveApodToDB')


/* GET home page. */
router.get('/', function(req, res, next) {
  let today = dateFormat(new Date())
  res.render('index', { title: 'Apod' , today : today });
});

/* GET home page. */
router.get('/apod', function(req, res, next) {
  console.log(req.query)
  let reqDate = ''
  if(req.query.date) reqDate = req.query.date
  let url = `https://api.nasa.gov/planetary/apod?hd=true&api_key=1kD6jUfLLv5X8BYHfExJ5e6trif3mCT7pOVnUX4e${reqDate != '' ? '&date=' + reqDate : '' }`
  console.log(url)

  let findDate = reqDate == "" ? dateFormat(new Date()) : reqDate
  console.log('findDate:',findDate)
  ApodModel.findByDate(findDate,function (err,apod) {
    if(err){
      console.log(err)
    }
    console.log('apod=====>',apod)
    if(apod != null){
      res.json({
            code: '0000',
            msg: 'success',
            data: apod
        })
    }else{
      try{
        request(url,(error,response,body)=>{
          console.log('error:',error,'body',body)
          console.log('================')
          console.log(response.headers)
          console.log('================')
          console.log(Number(response.headers['x-ratelimit-remaining']))
          console.log('================')
          console.log('response.statusCode',response.statusCode)
          console.log('================')

          if(!error && response.statusCode == 200 ){

            let data = JSON.parse(body)
            
              saveApodToDB(findDate,data)
              res.json({
                code:'0000',
                msg:'success',
                data:data
              })
          }else{
            let data = JSON.parse(body)
            res.json({
                code:data.code,
                msg:data.msg,
                data:{}
              })
          }
        })
      }catch(e){
        console.log(e)
      }
    }

  })

  
  
});




module.exports = router;
