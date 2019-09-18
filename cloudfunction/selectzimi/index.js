// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _opeenid = wxContext.OPENID
  let zimis = []
  await db.collection('tianzis').get()
  .then(res=>{
      zimis = res.data
      }
  )  
  let i=Math.floor((Math.random() * zimis.length) );  
  console.log(i)
  let selectZimi=zimis[i]
  return selectZimi
}