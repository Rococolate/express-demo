'use strict'

const BitinnModel = require('../models/bitinnModel')

function saveBitinnToDB (url,data,savecb,nosavecb) {
  let _Bitinn = {}

  BitinnModel.findByUrl(url,function (err,Bitinn) {
    if(err){
      console.log(err)
    }
    if(Bitinn != null){
      if(typeof nosavecb == 'function'){
        nosavecb()
      }
      return false
    }else{
      _Bitinn = new BitinnModel({
        title:data.title,
        url:data.href
      })

      _Bitinn.save(function (err,Bitinn) {
        if(err){
          console.log(err)
        }
        console.log('Bitinn=====>',Bitinn)
        console.log('savecb=====>')
        if(typeof savecb == 'function'){
          savecb()
        }
      })
    }
  })
}

module.exports = saveBitinnToDB