function dateFormat (date) {
  let year = date.getUTCFullYear()
  let mon = Number(date.getUTCMonth()) + 1
  let day = date.getUTCDate()
  if(mon < 10) mon = '0' + mon
  return year + '-' + mon + '-' + day
}

module.exports = dateFormat