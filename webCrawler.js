'use strict'
const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const BitinnModel = require('./models/bitinnModel')
const saveBitinnToDB = require('./lib/saveBitinnToDB')
const schedule = require('node-schedule')

const nodemailer = require('nodemailer');

const service = require('./_s/_message').service
const user = require('./_s/_message').user
const pass = require('./_s/_message').pass

const url = 'https://bitinn.net'
const transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: service,
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: user,
        //这里密码不是qq密码，是你设置的smtp密码
        pass: pass
    }
});

mongoose.connect('mongodb://localhost/bitinn')

// let jTime = {second:30}
let jTime = {minute:30}
let j = schedule.scheduleJob(jTime, function(){
  console.log(`Time for tea! ${new Date()}`)
  isBitinnHasNewArticle()
})

function isBitinnHasNewArticle () {
  

  request(url,(error,response,body)=>{

    console.log('======================>body<===================')
    console.log(body)

    let cb = function  ($) {

      let aArray = likeArrayToArray($('h2.entry-title a'))
      console.log('==================aArray===============')
      console.log(aArray)
      let aInfo = []

      aArray.forEach((item,index,array)=>{
        let info = {
          href:item.attribs.href,
          title:item.children[0].data
        }

        var mailOptions = {
            from:user , // 发件地址
            to:user , // 收件列表
            subject: `比特客栈又有新更新！${item.children[0].data}`, // 标题
            //text和html两者只支持一种
            // text: 'Hello world ?', // 标题
            html: `<h1>比特客栈又有新更新！</h1>
                    <h2><a href='${item.attribs.href}'>${item.children[0].data}</a></h2>
            ` // html 内容
        };

        saveBitinnToDB(item.attribs.href,info,()=>{
          transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  return console.log(error);
              }
              console.log('Message sent: ' + info.response);

          });
        })
      })
    }

    filterChapters(body,cb)
    
  })
}



function likeArrayToArray (obj) {
  let array = []
  for(let i = 0 ; i < obj.length ; i++ ){
    array.push(obj[i])
  }
  return array
}

function filterChapters (html,cb) {
  let $ = cheerio.load(html)
  if(typeof cb == 'function' ){
    cb($)
  }
}
