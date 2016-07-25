/*
  date and endDate had format by (YYYY-MM-DD)
 */

function lessThanEndDate (date,endDate) {
  var a = date.split('-')
  a.forEach((item,index,array)=>{
    array[index] = Number(item)
  })

  var b = endDate.split('-')
  b.forEach((item,index,array)=>{
    array[index] = Number(item)
  })

  console.log("a:",a)
  console.log("b:",b)
  console.log("date:",date)
  console.log("endDate:",endDate)

  if(a[0] > b[0]) return false
  if(a[1] > b[1]) return false
  if(a[2] > b[2]) return false

  return true

}

module.exports = lessThanEndDate