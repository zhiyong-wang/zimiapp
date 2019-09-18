// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const room_id = event.room_id
  const zimi = event.zimi
  try {
    return await db.collection('gamerooms').doc(room_id).update({
      // data 字段表示需新增的 JSON 数据
      data: {       
        zimi: zimi,
        time: "now",
        }
    })
  } catch (e) {
    console.error(e)
  }

}