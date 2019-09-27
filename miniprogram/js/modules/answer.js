import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { ANSWER_BG_COLOR, BOARD_LINE_COLOR, BOARD_DARK_COLOR, BOARD_GREY_COLOR, BOARD_LIGHT_COLOR } from './../shared/contants.js'

class Answer {
  constructor() {
    const { winHeight, winWidth } = getWindowRectSync()

    this.width = winWidth * ratio
  //  this.height = (winHeight-60 - winWidth * 10 / 12 - winWidth * 0.5) * ratio
    this.height = (winHeight - winWidth * 0.5) * ratio
    this.x = 0
   // this.y = (60 + winWidth * 10 / 12) * ratio
    this.y = 0
    this.answerCell_width = winWidth * 1 / 11* ratio
    this.answerCell_height = winWidth * 1 / 11 * ratio
    this.answerCell_padding = winWidth * 1 / 36 * ratio


    this.answerCanvas = wx.createCanvas()
    this.answerCanvas.width = this.width
    this.answerCanvas.height = this.height


    this.answerCtx = this.answerCanvas.getContext('2d')
    // this.questionsCtx.scale(this.ratio, this.ratio)

 

  }

  render(question, per_cells) {
    

    this.answerCtx.clearRect(0, 0, this.width, this.height);
    this.answerCtx.fillStyle = BOARD_GREY_COLOR
    this.answerCtx.globalAlpha=0.7

    this.answerCtx.fillRect(0, 0, this.width, this.height)
    this.answerCtx.globalAlpha = 1

    console.log(per_cells)

    this.answerDraw(question,per_cells)

    screenCtx.drawImage(
      this.answerCanvas, 0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height

    )
  }

  answerDraw(question,per_cells) {
    
    let startX = (this.width - this.answerCell_width * per_cells.length - this.answerCell_padding * (per_cells.length-1))/2
    console.log(per_cells.length)
    for (let i = 0; i < per_cells.length; i++) {      
      this.answerCtx.fillStyle = "white"
      this.answerCtx.fillRect(startX + (this.answerCell_width + this.answerCell_padding) * i, (60+this.width)*3/5, this.answerCell_width, this.answerCell_height)
      this.answerCtx.fillStyle = BOARD_LINE_COLOR
      this.answerCtx.fillRect(startX + (this.answerCell_width + this.answerCell_padding) * i + this.answerCell_width, (60 + this.width) * 3 / 5 + this.answerCell_height/10, this.answerCell_width/10, this.answerCell_height)
      this.answerCtx.fillRect(startX + (this.answerCell_width + this.answerCell_padding) * i + this.answerCell_width / 10, (60 + this.width) *3 / 5 + this.answerCell_height, this.answerCell_width, this.answerCell_height/10)




      this.answerCtx.StrokeStyle = BOARD_LINE_COLOR
      this.answerCtx.beginPath()
      this.answerCtx.stroke()     

      this.answerCtx.textAlign = 'center'
      this.answerCtx.textBaseline = "middle"
      this.answerCtx.font = 15 * ratio + "px PingFangTC-light"
      this.answerCtx.fillStyle = BOARD_DARK_COLOR
      let text = per_cells[i]
     // let print_Y = 4 * this.perWidth + (i - per_index) * this.perWidth + moveDistance
     // questionsCtx.fillText(text, 0, print_Y)
    }
    this.answerCtx.textAlign = 'center'
    this.answerCtx.textBaseline = "middle"
    this.answerCtx.font = 15 * ratio + "px PingFangTC-light"
    this.answerCtx.fillStyle = "red"
    console.log(question)

    let answerY = (60 * ratio +this.width * 10 / 12)+ (this.height-60*ratio-this.width*10/12)*1/3
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < question.length; i++) {
      lineWidth += this.answerCtx.measureText(question[i]).width;
      if (lineWidth > this.width*0.8) {
        this.answerCtx.fillText(question.substring(lastSubStrIndex, i), this.width/2, answerY);//绘制截取部分
        answerY += 50;//20为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == question.length - 1) {//绘制剩余部分
        this.answerCtx.fillText(question.substring(lastSubStrIndex, i + 1), this.width/2, answerY);
      }
      

   // this.answerCtx.fillText(question, this.width/2,(this.width * 10 / 12),this.width*0.8 )
    }


  }

}

export default new Answer()