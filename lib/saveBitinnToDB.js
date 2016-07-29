'use strict'

const BitinnModel = require('../models/bitinnModel')

function saveBitinnToDB (url,data,cb) {
  let _Bitinn = {}

  BitinnModel.findByUrl(url,function (err,Bitinn) {
    if(err){
      console.log(err)
    }
    if(Bitinn != null){
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
        console.log('cb=====>')
        if(typeof cb == 'function'){
          cb()
        }
      })
    }
  })
}

module.exports = saveBitinnToDB