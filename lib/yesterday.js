function yesterday (date) {
  return new Date(Number(date.getTime()) - (24*60*60*1000))
}

module.exports = yesterday