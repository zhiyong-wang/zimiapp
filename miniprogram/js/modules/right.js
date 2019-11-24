import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_LINE_COLOR, BOARD_GREY_COLOR, BOARD_DARK_COLOR } from './../shared/contants.js'
import top from './top.js'
const HELP1_IMG_SRC = 'images/02_24.png'
const HELP2_IMG_SRC = 'images/01_02.png'

class Right {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()

    this.width = winWidth / 12 * ratio
    this.height = winWidth * 10 / 12 * ratio

    this.x = winWidth * 11 / 12 * ratio
    this.y = top.height

    this.icon_width = this.width 
    this.icon_x = 0
    this.icon_y =0

    this.rightCanvas = wx.createCanvas()
    this.rightCanvas.width = this.width
    this.rightCanvas.height = this.height
    this.rightCtx = this.rightCanvas.getContext('2d')

    this.help1_img=null
    this.help2_img=null
    this.loadImage()
  }


  render() {
    this.rightCtx.fillStyle = BG_COLOR
    this.rightCtx.fillRect(0, 0, this.width, this.height)
    this.rightDraw()
    screenCtx.drawImage(
      this.rightCanvas, 0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height)

  }
  loadImage() {
    this.help1_img = wx.createImage()
    this.help1_img.src = HELP1_IMG_SRC
    this.help2_img = wx.createImage()
    this.help2_img.src = HELP2_IMG_SRC
  }

  rightDraw() {
    let help1_count=1
    let help2_count = 2
 for (let i = 9; i >= 10-help1_count;i--){
     let icon_y = this.icon_y+i*this.width
//     console.log(icon_y)
      this.rightCtx.drawImage(this.help1_img, this.icon_x, icon_y, this.icon_width, this.icon_width)
  }
    for (let i =10- help1_count-1; i > 10 - help1_count-1-help2_count; i--) {
      let icon_y = this.icon_y + i * this.width
   //   console.log(icon_y)
      this.rightCtx.drawImage(this.help2_img, this.icon_x, icon_y, this.icon_width, this.icon_width)
    }  

  }

}
export default new Right()