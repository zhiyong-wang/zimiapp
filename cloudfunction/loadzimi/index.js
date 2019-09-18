// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let clint_zimis
  let zimis

  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'selectzimi',   
  }).then(res => {
   let  _zimis = res.result.data
    console.log("selectzimi")
   //console.log(_zimis)
    for (let i = 0; i < _zimis.length; i++) {
      _zimis[i].jiejue = false;
    }

    this.zimis=_zimis
   
  }).catch(err => {
    console.log("error: " + err) // handle error
  })
  
  console.log(this.zimis)
  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'setzimi',
    data:
    {zimis:this.zimis}
  }).then(res => {
    console.log(res.result.board)
    this.clint_zimis = {"board":res.result.board,"questions":res.result.questions}

  }).catch(err => {
    console.log("error: " + err) // handle error
  })
console.log(this.clint_zimis)
return this.clint_zimis
  
}