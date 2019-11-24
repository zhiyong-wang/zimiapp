// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  let clint_zimis
  let zimis
  let roomId=event.roomId
  let resDatalength
  await db.collection('gamerooms').where({
    _id: roomId
  }).get()
    .then(res => {
      console.log(res)
      resDatalength = res.data.length
      
    })

  if (roomId == '' || resDatalength==0){
   let oldRooms
   await db.collection('gamerooms').where({ userId: openid}).get()
   .then(res=>{
     oldRooms=res.data
   })
if(oldRooms){
for(let room of oldRooms){
  await db.collection('gamerooms').doc(room._id).remove()
    .then(console.log(room._id)
   )
}
}

  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'selectzimi',   
  }).then(res => {
   let  _zimis = res.result.data
    //console.log("selectzimi")
    for (let i = 0; i < _zimis.length; i++) {
      _zimis[i].jiejue = false;
      _zimis[i].index =i;
    }

    zimis=_zimis
   
  }).catch(err => {
    console.log("error: " + err) // handle error
  })

  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'creatRoom',
    data:
      { zimis: zimis }
  }).then(res => {
    roomId = res.result._id
   
   console.log(roomId)
  }).catch(err => {
    console.log("error: " + err) // handle error
  })
 }
 


  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'setzimi',
    data:
      { roomId: roomId}
  }).then(res => {
   // console.log(res.result.board)
    this.clint_zimis = {"roomId":roomId,"board":res.result.board,"questions":res.result.questions}

  }).catch(err => {
    console.log("error: " + err) // handle error
  })
//console.log(this.clint_zimis)
return this.clint_zimis
  
}