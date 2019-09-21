import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import {BG_COLOR, BOARD_LINE_COLOR, BOARD_DARK_COLOR, BOARD_GREY_COLOR, BOARD_LIGHT_COLOR } from './../shared/contants.js'


class Questions {
  constructor() {
    const { winHeight, winWidth } = getWindowRectSync()
    this.width = winWidth
    this.height = winHeight- winWidth*10/12-100

    this.x = 10
    this.y = 80 + winWidth*10/12

    this.perWidth = 25

  this.questionsCanvas = wx.createCanvas()
  this.questionsCtx = this.questionsCanvas.getContext('2d')

  
  }
  render(questions, moveDistance) {

   this.questionsCtx.clearRect(this.x,this.y, this.width, this.height);
   this.questionsCtx.fillStyle = BG_COLOR
   this.questionsCtx.fillRect(this.x,this.y, this.width, this.height)
  console.log("question is render")
   this.questionsDraw(questions, moveDistance)
    screenCtx.drawImage(
      this.questionsCanvas, this.x, this.y,this.width, this.height,
      this.x, this.y, this.width, this.height

    )
  }

  questionsDraw(questions, moveDistance) {
    const { questionsCtx}=this

   // console.log(presentQuestions_Y)
    questionsCtx.textAlign = 'left'
    questionsCtx.textBaseline = "top"
    questionsCtx.font = "15px 宋体"
    questionsCtx.fillStyle = BOARD_DARK_COLOR
    questionsCtx.fillText("问 题：", this.x,this.y)

    
 for (let i = 0; i < questions.length; i++) {
      questionsCtx.textAlign = 'left'
      questionsCtx.textBaseline = "top"
      questionsCtx.font = "15px 宋体"
     questionsCtx.fillStyle = BOARD_DARK_COLOR
   if ( i  == 4) { questionsCtx.fillStyle = "red"}
      let index = (questions[i].zimi_index + 1).toString()
     let text=index+":"+questions[i].detail
   questionsCtx.fillText(text, this.x, this.y + this.perWidth + i * this.perWidth+moveDistance )
 }
    //}
 //* for (let i = presentQuestions_index+1,j=1; i < presentQuestions_index+7; i++,j++) {
//    questionsCtx.textAlign = 'left'
//    questionsCtx.textBaseline = "top"
 //   questionsCtx.font = "15px 仿宋"
//    questionsCtx.fillStyle = BOARD_DARK_COLOR
//    let index = (questions[i].zimi_index + 1).toString()
 //   let text = index+":" + questions[i].detail

  //  questionsCtx.fillText(text, this.x, presentQuestions_Y+j * 20)

 // }
    // 绘制棋盘线条 
  questionsCtx.lineWidth = 1
  questionsCtx.strokeStyle = BOARD_GREY_COLOR

      // 水平线条
    let topline = Math.floor(this.y + this.perWidth * 5) - 2.5
    questionsCtx.moveTo(0, topline)
    questionsCtx.lineTo(this.width, topline)
    questionsCtx.stroke()

    let bottomline = Math.floor(this.y + this.perWidth * 6 )- 2.5
    questionsCtx.moveTo(0, bottomline)
    questionsCtx.lineTo(this.width, bottomline)
    questionsCtx.stroke()

 }
  
}

export default new Questions()