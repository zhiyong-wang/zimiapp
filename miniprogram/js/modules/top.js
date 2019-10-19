import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_LINE_COLOR, BOARD_GREY_COLOR, BOARD_DARK_COLOR } from './../shared/contants.js'


class Top {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    
    this.width = winWidth * ratio
    this.height =( menuButton.bottom+30) * ratio

    this.title_X = this.width /10
    this.title_Y = (menuButton.top + (menuButton.height)/2+5 )*ratio

    this.score_X = this.width / 40
    this.score_Y = (menuButton.bottom+20)*ratio
   
    this.x = 0
    this.y = 0

    this.topCanvas = wx.createCanvas()
    this.topCanvas.width = this.width
    this.topCanvas.height = this.height
    this.topCtx = this.topCanvas.getContext('2d')

  }
  render() {
    console.log("top is load")
    this.topCtx.fillStyle = BG_COLOR
    this.topCtx.fillRect(0, 0, this.width, this.height)
  this.topCtx.fillStyle = BOARD_GREY_COLOR
    this.topCtx.fillRect(0, 0, this.width,  this.height-25*ratio)
    this.topDraw()
    screenCtx.drawImage(
      this.topCanvas, 0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height)

  }
  topDraw() {
    this.topCtx.textAlign = 'left'
    this.topCtx.textBaseline = "middle"
    this.topCtx.font = 18 * ratio + "px   PingFangTC-light"
    this.topCtx.fillStyle = BOARD_LINE_COLOR
    this.topCtx.fillText("天 天 填 字", this.title_X, this.title_Y)

    this.topCtx.textAlign = 'left'
    this.topCtx.textBaseline = "middle"
    this.topCtx.font = 13 * ratio + "px PingFangTC-light"
    this.topCtx.fillStyle = BOARD_LINE_COLOR
    this.topCtx.fillText("得分:200", this.score_X, this.score_Y)

  }
}
export default new Top()