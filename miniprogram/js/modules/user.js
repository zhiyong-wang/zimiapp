import { screenCtx } from './../shared/canvas.js'

 class User{
  constructor() {
    this._openId=""
    this.nickname =""
    this.avatarUrl = ""
    this.onLoad()
  }
onLoad() {

  wx.cloud.callFunction({
    name: 'login',
    complete: res => {
      this.logged = true
      console.log(res.result[0])
      let {openid,nickName,avatarUrl} = res.result[0]
      this.openId=openid
      this.nickName = nickName
      this.avatarUrl = avatarUrl  
    //  console.log(this)
    }
  }) 
}
}
export default new User()