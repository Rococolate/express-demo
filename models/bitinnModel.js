'use strict'

const mongoose = require('mongoose')

const BitinnSchema = require('../schemas/bitinnSchema')

let BitinnModel = mongoose.model('BitinnModel',BitinnSchema)

module.exports = BitinnModel