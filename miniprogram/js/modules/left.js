import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_LINE_COLOR, BOARD_GREY_COLOR, BOARD_DARK_COLOR } from './../shared/contants.js'
import top from './top.js'
const BG_IMG_SRC = 'images/yaoqing.png'


class Left {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()

    this.width = winWidth/12 * ratio
    this.height = winWidth*10 / 12 * ratio

    this.x = 0
    this.y = top.height

    this.icon_width=this.width*3/4
    this.icon_x = this.width /8
    this.icon_y = this.width /8

    this.leftCanvas = wx.createCanvas()
    this.leftCanvas.width = this.width
    this.leftCanvas.height = this.height
    this.leftCtx = this.leftCanvas.getContext('2d')

   this.loadImage()

  }


 render() {
    this.leftCtx.fillStyle = BG_COLOR
    this.leftCtx.fillRect(0, 0, this.width, this.height)
   this.leftDraw()
     screenCtx.drawImage(
     this.leftCanvas, 0, 0, this.width, this.height,
     this.x, this.y, this.width, this.height)
     
  }


 loadImage() {
  let that=this
    let img = wx.createImage()
    console.log(img)
    img.src = BG_IMG_SRC
    this.im1=img
  }
  


leftDraw() {
  
  this.leftCtx.drawImage(this.im1, this.icon_x, this.icon_y, this.icon_width, this.icon_width)

}






}
export default new Left()