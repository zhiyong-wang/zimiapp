import { screenCtx, ratio} from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import {A,BG_COLOR, BOARD_LINE_COLOR, BOARD_DARK_COLOR, BOARD_GREY_COLOR, BOARD_LIGHT_COLOR } from './../shared/contants.js'
import top from './top.js'
import center from './center.js'
import board from './board.js'

class Questions {
  constructor() {
    const { winHeight, winWidth } = getWindowRectSync()
 
    this.width = winWidth * ratio
    this.height = (winHeight - winWidth * 10 / 12 - 100) * ratio

    this.x = 10 * ratio
    this.y = top.height+board.height+center.height

    this.perWidth = 25 * ratio
     
    this.questionsCanvas = wx.createCanvas()
    this.questionsCanvas.width = this.width
    this.questionsCanvas.height = this.height
   
  
  this.questionsCtx = this.questionsCanvas.getContext('2d')
  // this.questionsCtx.scale(this.ratio, this.ratio)



  }
  
    render(questions,per_index, moveDistance) {

   this.questionsCtx.clearRect(0,0, this.width, this.height);
   this.questionsCtx.fillStyle = BG_COLOR
   this.questionsCtx.fillRect(0,0, this.width, this.height)
   
  console.log("question is render")

    this.questionsDraw(questions, per_index,  moveDistance)
   
    screenCtx.drawImage(
      this.questionsCanvas, 0, 0, this.width , this.height ,
    this.x, this.y, this.width, this.height

    )
  }

  questionsDraw(questions, per_index,  moveDistance) {
    const { questionsCtx}=this   
   
    for (let i =0; i < questions.length; i++) {
      questionsCtx.textAlign = 'left'
      questionsCtx.textBaseline = "middle"
      questionsCtx.font =15*ratio+"px PingFangTC-light"
      questionsCtx.fillStyle = BOARD_DARK_COLOR
      if (i == per_index) { questionsCtx.fillStyle = "red" }
      let index = (questions[i].zimi_index + 1).toString()
      let text = index + ":" + questions[i].detail
      let print_Y =  4 * this.perWidth + (i - per_index) * this.perWidth+ moveDistance+this.perWidth/2
      questionsCtx.fillText(text, 0, print_Y)

    }  



    // 绘制棋盘线条 
  questionsCtx.lineWidth = 1
  questionsCtx.strokeStyle = BOARD_GREY_COLOR

      // 水平线条
    let topline = Math.floor(this.perWidth * 4) -4.5
    questionsCtx.moveTo(0, topline)
    questionsCtx.lineTo(this.width, topline)
    questionsCtx.stroke()

    let bottomline = Math.floor(this.perWidth * 5 )-4.5
    questionsCtx.moveTo(0, bottomline)
    questionsCtx.lineTo(this.width, bottomline)
    questionsCtx.stroke()

 }
  
}

export default new Questions()