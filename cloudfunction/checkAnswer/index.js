// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const questionId=event.questionId
  const roomId = event.roomId

  console.log(roomId)
  let result
  let zimis
  
  await db.collection('gamerooms').where({_id: roomId}).get()
   .then(res => {
     zimis = res.data[0].zimi

     zimis[questionId].jiejue=true
     //  console.log(zimis)      
      
     })
  try {
      await db.collection('gamerooms').where({ _id: roomId }).update({
        // data 字段表示需新增的 JSON 数据
        data: {
          zimi: zimis,
          time: "00",
        }
      })
    }
    catch (e) { console.log(e) }

       
  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'setzimi',
    data:
      { roomId: roomId }
  }).then(res => {
    // console.log(res.result.board)
    this.clint_zimis = { "roomId": roomId, "board": res.result.board, "questions": res.result.questions }

  }).catch(err => {
    console.log("error: " + err) // handle error
  })
  return(this.clint_zimis) 
 }

   


   

 
  