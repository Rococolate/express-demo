 'use strict'

 const mongoose = require('mongoose')

 let ApodSchema = new mongoose.Schema({
  date:String,
  explanation:String,
  hdurl:String,
  media_type:String,
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

 ApodSchema.pre('save',function (next) {
   if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
   }else{
    this.meta.updateAt = Date.now()
   }

   next()
 })

 ApodSchema.statics = {
  fetch:function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findByDate:function (date , cb) {
    return this
      .findOne({date:date})
      .exec(cb)
  }
 }

 module.exports = ApodSchema