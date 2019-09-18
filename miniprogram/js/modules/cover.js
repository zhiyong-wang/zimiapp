import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import Zimi from './zimi.js'
import { BG_COLOR } from './../shared/contants.js'
const BG_IMG_SRC ='images/cover.png'
const { winWidth, winHeight } = getWindowRectSync()

class Cover {
  constructor() {
    this.init()
  }
  init() {
    wx.onTouchStart((event) => this.handleTouch(event))
  }
  render(){
    this.drawBackground()
  }
  
  drawBackground() {
    let that=this
   // console.log(this)
    let cover_img = wx.createImage()
     cover_img.src = BG_IMG_SRC
     cover_img.onload = function () {    
        screenCtx.drawImage(
          cover_img,
          0,
          0,
          winWidth,
          winHeight,
        )
        that.drawText()
    }
  }
  drawText() {

    screenCtx.textAlign = 'left'
    screenCtx.textBaseline="top"
    screenCtx.font = "20px 楷体"
    screenCtx.fillStyle = 'red'
    screenCtx.fillText('开始游戏', 20, winHeight * 0.50+20)

    

  }
  handleTouch(event) {
    const { clientX, clientY } = event.touches[0]
  //  console.log(clientX)
    if (clientX >= 20 && clientX <= 100 && clientY >= (winHeight * 0.50 +18) && clientY<=(winHeight * 0.50 + 35) )
    {console.log("loadzimi")
      let  zimi=new Zimi()
      zimi.init()
    }
  } 
}
export default new Cover()
