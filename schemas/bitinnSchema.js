 'use strict'

 const mongoose = require('mongoose')

 let BitinnSchema = new mongoose.Schema({
  title:String,
  url:String,
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
 })

 BitinnSchema.pre('save',function (next) {
   if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
   }else{
    this.meta.updateAt = Date.now()
   }

   next()
 })

 BitinnSchema.statics = {
  fetch:function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findByUrl:function (url , cb) {
    return this
      .findOne({url:url})
      .exec(cb)
  }
 }

 module.exports = BitinnSchema