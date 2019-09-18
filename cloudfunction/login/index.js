// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  openid=wxContext.OPENID
  //let nikeName=event.user.nickName
  //let avatarUrl=event.user.avatarUrl
  //console.log(event)
  let a = await db.collection('users').where({ openid: openid }).count()

  try {   
    if ( a.total==0){
      await db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: openid,
        nickName: '',
        gender:'',
        avatarUrl: '',
        country: '',
        province: '',
        city:'',
        done:[],
        score:0,
      }
       })
    }
    else{      
    }
    let users = await db.collection('users').where(
      { openid: openid }).get()
    console.log("users")
    console.log(users.data)
    return users.data


  } catch (e) {
    console.error(e)
  }
  return {   
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}