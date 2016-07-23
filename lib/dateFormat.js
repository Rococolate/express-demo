function dateFormat (date) {
  let year = date.getFullYear()
  let mon = Number(date.getMonth()) + 1
  let day = date.getDate()

  return year + '-' + mon + '-' + day
}

module.exports = dateFormat