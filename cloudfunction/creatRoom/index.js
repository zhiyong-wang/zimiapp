// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid= wxContext.OPENID
  const zimi=event.zimi
  const userInfos = await await db.collection('users').where(
    { _openid: openid }).get()
  console.log(userInfos.data)
  const avatarUrl=userInfos.data[0].avatarUrl
  const nickName = userInfos.data[0].nickName
  const user={"openid":openid,"avatarUrl":avatarUrl,"nickName":nickName}
  try {
    return await db.collection('gamerooms').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        users:[user],      
        zimi: zimi,
        time: db.serverDate(),
        done: false,
        last_change_userId:user.openid,
      }
    })
  } catch (e) {
    console.error(e)
  }
}