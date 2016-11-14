const moment = require('moment');
var oneDayTime = 24*60*60*1000

function lastDay (num) {
  var num = Number(num)
  if(isNaN(num)) return moment(new Date()).format("YYYY-MM-DD")
  return moment((new Date().getTime() - oneDayTime * num )).format("YYYY-MM-DD")
}

module.exports = lastDay