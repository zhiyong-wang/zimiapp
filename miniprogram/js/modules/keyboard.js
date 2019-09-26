import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_LINE_COLOR,BOARD_GREY_COLOR,BOARD_DARK_COLOR} from './../shared/contants.js'


class Keyboard {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()

    this.width = winWidth * ratio
    this.height = this.width*0.5

    this.x=0
    this.y = winHeight*ratio-this.height

    this.key_width =this.width*5/61
    this.key_right_padding = this.width*1/61
    this.key_height=this.height*5/24
    this.key_top_padding = this.height * 1 /24

    this.keys1= ['Q','W','E','R','T','Y','U','I','O','P']
    this.keys2= ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    this.keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '后退']
    this.keys4 = ['返回', 'Sh', 'Ch', 'Zh', '取消','确定']
    this.keys=[]


    this.keyboardCanvas = wx.createCanvas()
    this.keyboardCanvas.width = this.width
    this.keyboardCanvas.height = this.height
    this.keyboardCtx = this.keyboardCanvas.getContext('2d')
    
    this.init()
  }
  init(){
  for (let i in this.keys1) {

    this.keys.push({
      'value': this.keys1[i],
      'x': (Number(i) + 1) * this.key_right_padding + i * this.key_width,
      'y': 10,
      'width': this.key_width,
      'height': this.key_height
    })

  }
  for (let i in this.keys2) {
    this.keys.push({
      'value': this.keys2[i],
      'x': (Number(i) + 1.5) * this.key_right_padding + this.key_width / 2 + i * this.key_width,
      'y': 10 + this.key_height + this.key_top_padding,
      'width': this.key_width,
      'height': this.key_height
    })
  }

  for (let i in this.keys3) {
    this.keys.push({
      'value': this.keys3[i],
      'x': (Number(i) + 1) * this.key_right_padding + this.key_width * 3 / 4 + i * this.key_width,
      'y': 10 + this.key_height * 2 + this.key_top_padding * 2,
      'width': this.keys3[i].length == 1 ? this.key_width : this.key_width * 2,
      'height': this.key_height
    })
  }

  this.keys.push({
    'value': "返回",
    'x': this.key_right_padding * 2,
    'y': 10 + this.key_height * 3 + this.key_top_padding * 3,
    'width': this.key_width * 2,
    'height': this.key_height
  })
  this.keys.push({
    'value': "Zh",
    'x': this.key_right_padding * 3 + 2 * this.key_width,
    'y': 10 + this.key_height * 3 + this.key_top_padding * 3,
    'width': this.key_width * 3 / 2,
    'height': this.key_height
  })
  this.keys.push({
    'value': "Ch",
    'x': this.key_right_padding * 4 + (3.5) * this.key_width,
    'y': 10 + this.key_height * 3 + this.key_top_padding * 3,
    'width': this.key_width * 3 / 2,
    'height': this.key_height
  })
  this.keys.push({
    'value': "Sh",
    'x': this.key_right_padding * 5 + 5 * this.key_width,
    'y': 10 + this.key_height * 3 + this.key_top_padding * 3,
    'width': this.key_width * 3 / 2,
    'height': this.key_height
  })
  this.keys.push({
    'value': "取消",
    'x': this.key_right_padding * 6 + 6.5 * this.key_width,
    'y': 10 + this.key_height * 3 + this.key_top_padding * 3,
    'width': this.key_width * 2,
    'height': this.key_height
  })
  this.keys.push({
    'value': "确定",
    'x': this.key_right_padding * 7 + 8.5 * this.key_width,
    'y': 10 + this.key_height * 3 + this.key_top_padding * 3,
    'width': this.key_width * 2,
    'height': this.key_height
  })

  console.log(this.keys)
  }


  
  render(pushkey="") {
   // console.log(pushkey)
    this.keyboardDraw(pushkey)  
    screenCtx.drawImage(
      this.keyboardCanvas, 0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height
    )
  }
    keyboardDraw(pushkey){

   // console.log(data.questions)
   // this.keyboardCtx.clearRect(0, 0, this.width, this.height )
  this.keyboardCtx.fillStyle = BOARD_GREY_COLOR
  this.keyboardCtx.fillRect(0, 0, this.width, this.height)


  for(let i of this.keys){
    if (pushkey == i.value) { this.keyboardCtx.fillStyle = BOARD_DARK_COLOR }
    else { this.keyboardCtx.fillStyle = "white"}
      this.roundRect(this.keyboardCtx, i.x,i.y,i.width,i.height,10)
}



for (let i of this.keys){
     this.keyboardCtx.textAlign = 'center'
     this.keyboardCtx.textBaseline = "middle"
  this.keyboardCtx.font = 15 * ratio+"px PingFangTC-light"
  this.keyboardCtx.fillStyle = BOARD_LINE_COLOR
     let print_X = i.x+i.width/2
  let print_Y = i.y+i.height/2
     this.keyboardCtx.fillText(i.value, print_X, print_Y)
   }
     
}
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    ctx.strokeStyle = 'transparent'
    // ctx.strokeStyle='transparent'
    // 绘制左上角圆弧
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // 绘制border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // 绘制border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // 绘制border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // 绘制border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
    // 剪切
   // ctx.clip()
  }
}
export default new Keyboard() 