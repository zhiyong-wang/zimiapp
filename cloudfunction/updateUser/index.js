// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  let user=event.user
  console.log(event.user.nickName)

  try {
    return await db.collection('users').where({_openid:event.userInfo.openid})
      .update({
        data: {
        nickName: user.nickName,
        gender:user.gender,
        avatarUrl:user.avatarUrl,
        country:user.country,      
        province: user.province,
        city:user.city,
      },
    })
  } catch (e) {
    console.error(e)
  }
}