import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import {BG_COLOR, BOARD_LINE_COLOR, BOARD_DARK_COLOR, BOARD_GREY_COLOR, BOARD_LIGHT_COLOR } from './../shared/contants.js'


class Questions {
  constructor() {
    const { winHeight, winWidth } = getWindowRectSync()
    this.width = winWidth
    this.height = winHeight- winWidth*10/12-100

    this.x = 10
    this.y = 100 + winWidth*10/12

    this.perWidth = 25

  this.questionsCanvas = wx.createCanvas()
  
  this.questionsCtx = this.questionsCanvas.getContext('2d')

  
  }
  render(questions,per_index, moveDistance) {

   this.questionsCtx.clearRect(0,0, this.width, this.height);
   this.questionsCtx.fillStyle = BG_COLOR
   this.questionsCtx.fillRect(0,0, this.width, this.height)
   
  console.log("question is render")
    let questions_now = [...questions, ...questions, ...questions]
    let per_index_now = questions.length + per_index


    console.log(questions_now)
    console.log(per_index_now)
    this.questionsDraw(questions_now, per_index_now,  moveDistance)
  
    screenCtx.drawImage(
      this.questionsCanvas, 0 , 0,this.width, this.height,
    this.x, this.y, this.width, this.height

    )
  }

  questionsDraw(questions, per_index,  moveDistance) {
    const { questionsCtx}=this

   
   
   
    for (let i =0; i < questions.length; i++) {
      questionsCtx.textAlign = 'left'
      questionsCtx.textBaseline = "top"
      questionsCtx.font = "15px 宋体"
      questionsCtx.fillStyle = BOARD_DARK_COLOR
      if (i == per_index) { questionsCtx.fillStyle = "red" }
      let index = (questions[i].zimi_index + 1).toString()
      let text = index + ":" + questions[i].detail
      let print_Y =  4 * this.perWidth + (i - per_index) * this.perWidth+ moveDistance
      questionsCtx.fillText(text, 0, print_Y)
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