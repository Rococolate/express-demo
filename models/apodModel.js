'use strict'

const mongoose = require('mongoose')

const ApodSchema = require('../schemas/apodSchema')

let ApodModel = mongoose.model('ApodModel',ApodSchema)

module.exports = ApodModel