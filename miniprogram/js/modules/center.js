import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_LINE_COLOR, BOARD_GREY_COLOR, BOARD_DARK_COLOR } from './../shared/contants.js'


class Center {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()

    this.width = winWidth * ratio
    this.height = 40 * ratio

    this.x =0
    this.y = 60*ratio + this.width * 10 / 12


    this.centerCanvas = wx.createCanvas()
    this.centerCanvas.width = this.width
    this.centerCanvas.height = this.height
    this.centerCtx = this.centerCanvas.getContext('2d')

  }
render(){
  console.log("center is load")
 //this.centerCtx.fillStyle = BOARD_GREY_COLOR
 //this.centerCtx.fillRect(0, 0, this.width, this.height)
  this.centerDraw()
  screenCtx.drawImage(
    this.centerCanvas, 0, 0, this.width, this.height,
    this.x, this.y, this.width, this.height)
    
}
  centerDraw(){
    this. centerCtx.textAlign = 'left'
    this.centerCtx.textBaseline = "middle"
    this.centerCtx.font = 15 * ratio + "px  PingFangTC-light"
    this.centerCtx.fillStyle = BOARD_LINE_COLOR
    this.centerCtx.fillText("问 题：", 10*ratio, this.height/2)
}
}
export default new Center()