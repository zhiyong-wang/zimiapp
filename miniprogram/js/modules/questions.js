import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BOARD_LINE_COLOR, BOARD_DARK_COLOR, BOARD_GREY_COLOR, BOARD_LIGHT_COLOR } from './../shared/contants.js'
import zimi from './zimi'

class Questions {
  constructor() {
    const { winHeight, winWidth } = getWindowRectSync()
    this.width = winWidth
    this.height = winHeight- winWidth*10/12-100

    this.x = 0
    this.y = 80 + winWidth*10/12

    this.cellWidth = winWidth
   // this.cellHeight = winWidth / 12

   // this.questionsCanvas = wx.createCanvas()
   // this.questionsCtx = this.questionsCanvas.getContext('2d')

    this.items = []
    this.presentQuestions_index = 5

  }
  render() {
    this.questionsDraw()

  }


questionsDraw() {
  const  questionsCtx =screenCtx

  console.log(this)
    questionsCtx.textAlign = 'left'
    questionsCtx.textBaseline = "top"
    questionsCtx.font = "15px 宋体"
    questionsCtx.fillStyle = BOARD_DARK_COLOR
    questionsCtx.fillText(" 问 题：", 0,this.y)

    questionsCtx.textAlign = 'left'
    questionsCtx.textBaseline = "top"
    questionsCtx.font = "15px 宋体"
    questionsCtx.fillStyle = "red"
    let text = " " + this.items[this.presentQuestions_index].detail
    questionsCtx.fillText(text, 0, this.y+100)
       
    for (let i = this.presentQuestions_index-1; i > 0; i--) {
      questionsCtx.textAlign = 'left'
      questionsCtx.textBaseline = "top"
      questionsCtx.font = "15px 宋体"
      questionsCtx.fillStyle = BOARD_DARK_COLOR
      let text=" "+this.items[i].detail
      questionsCtx.fillText(text, 0, this.y+i*20)
      
    }
  for (let i = this.presentQuestions_index+1; i < this.presentQuestions_index+7; i++) {
    questionsCtx.textAlign = 'left'
    questionsCtx.textBaseline = "top"
    questionsCtx.font = "15px 仿宋"
    questionsCtx.fillStyle = BOARD_DARK_COLOR
    let text = " " + this.items[i].detail

    questionsCtx.fillText(text, 0,this.y+ i * 20)

  }



    // 绘制棋盘线条 

  questionsCtx.lineWidth = 1
  questionsCtx.strokeStyle = BOARD_GREY_COLOR

      // 水平线条

  questionsCtx.moveTo(0,this.y+ 97.5)
  questionsCtx.lineTo(this.width, this.y+97.5)

  questionsCtx.moveTo(0,this.y+117.5)
  questionsCtx.lineTo(this.width,this.y+117.5)
  questionsCtx.stroke()

 }

}

export default new Questions()