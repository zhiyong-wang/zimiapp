import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import Zimi from './zimi.js'
import { BG_COLOR } from './../shared/contants.js'
const BG_IMG_SRC ='images/cover.png'
const { winWidth, winHeight } = getWindowRectSync()
import zimi from './zimi.js'

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
          winWidth * ratio,
          winHeight*ratio,
        )
        that.drawText()
    }
  }
  drawText() {

    screenCtx.textAlign = 'left'
    screenCtx.textBaseline="top"
    screenCtx.font = "30px PingFangTC-light"
    screenCtx.fillStyle = 'red'
    screenCtx.fillText('开始游戏', 20 * ratio, (winHeight * 0.50) * ratio  )

  
    

  }
  handleTouch(event) {
    const { clientX, clientY } = event.touches[0]
    console.log(clientX, clientY, (winHeight * 0.50 ) )
    if (clientX >= 20 && clientX <= 100 && clientY >= (winHeight * 0.50 ) && clientY<=(winHeight * 0.50 + 35) )
    {console.log("loadzimi")
      zimi.init()
    }
  } 
}
export default new Cover()
