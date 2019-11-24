import { screenCtx, ratio } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import board from './board.js'
import keyboard from './keyboard.js'
import top from './top.js'
import { ANSWER_BG_COLOR, BOARD_LINE_COLOR, BOARD_DARK_COLOR, BOARD_GREY_COLOR, BOARD_LIGHT_COLOR } from './../shared/contants.js'

class Answer {
  constructor() {
    const { winHeight, winWidth } = getWindowRectSync()

    this.width = winWidth * ratio
  //  this.height = (winHeight-60 - winWidth * 10 / 12 - winWidth * 0.5) * ratio
    this.height = winHeight  * ratio-keyboard.height
    this.x = 0

    this.y = 0
    this.answerCell_width = winWidth * 1 / 10* ratio
    this.answerCell_height = winWidth * 1 / 10 * ratio
    this.answerCell_padding = winWidth * 1 / 36 * ratio

    this.answerCanvas = wx.createCanvas()
    this.answerCanvas.width = this.width
    this.answerCanvas.height = this.height

    this.answerCtx = this.answerCanvas.getContext('2d')
    // this.questionsCtx.scale(this.ratio, this.ratio)

    this.rangeOfCells=[]

  }

  render(question, per_cells, animationTime, answerDetail) {
    

    this.answerCtx.clearRect(0, 0, this.width, this.height);
    this.answerCtx.fillStyle = BOARD_GREY_COLOR
    this.answerCtx.globalAlpha = 0.6*animationTime

    this.answerCtx.fillRect(0, 0, this.width, this.height)
    this.answerCtx.globalAlpha = 1

    //console.log(per_cells)

    this.answerDraw(question, per_cells, animationTime, answerDetail)


    screenCtx.drawImage(
      this.answerCanvas, 0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height

    )
  }

  answerDraw(question, per_cells, animationTime, answerDetail) { 
   
    
    let endX = (this.width - this.answerCell_width * per_cells.length - this.answerCell_padding * (per_cells.length-1))/2
 //   console.log(per_cells.length)
    for (let i=0;i<per_cells.length;i++) {
      let cell=per_cells[i].index
      let cell_start_X = board.cellWidth + ((cell-Math.floor(cell / 10)*10) * board.cellWidth)
      let cell_start_Y = top.height + (Math.floor(cell / 10)* board.cellHeight)
      let cell_end_X = endX + (this.answerCell_width + this.answerCell_padding) * i
      let cell_end_Y = (this.height - this.answerCell_height-10*ratio )
      
      let x_distance = (cell_end_X - cell_start_X) * animationTime
      let y_distance = (cell_end_Y - cell_start_Y) * animationTime
      let cell_width_change = (this.answerCell_width - board.cellWidth) * animationTime
      let cell_height_change = (this.answerCell_height - board.cellHeight) * animationTime

      this.answerCtx.fillStyle = "white"
      this.answerCtx.fillRect(cell_start_X + x_distance, cell_start_Y + y_distance, board.cellWidth + cell_width_change, board.cellHeight + cell_height_change)
   
      this.answerCtx.textAlign = 'center'
      this.answerCtx.textBaseline = "middle"
      this.answerCtx.font = 15 * ratio*(1+2 / 10*animationTime) + "px PingFangTC-light"
      this.answerCtx.fillStyle = BOARD_DARK_COLOR
      let text = answerDetail.value[i]
      this.answerCtx.fillText(text, cell_start_X + x_distance + (board.cellWidth + cell_width_change)/2, cell_start_Y + y_distance+(board.cellHeight + cell_height_change)/2)


    
    
      this.answerCtx.fillStyle = BOARD_LINE_COLOR
      let shadow1_x = cell_start_X + board.cellWidth + cell_width_change+x_distance
      let shadow1_y = cell_start_Y + y_distance + (board.cellHeight + cell_height_change) / 10 * animationTime
      let shadow1_width = this.answerCell_width / 10 * animationTime
      let shadow1_height = board.cellHeight + cell_height_change  
  
      let shadow2_x = cell_start_X + (board.cellWidth + cell_width_change)/10 * animationTime + x_distance
      let shadow2_y = cell_start_Y + board.cellHeight + cell_height_change  + y_distance
      let shadow2_width = board.cellWidth + cell_width_change
      let shadow2_height = this.answerCell_height/10 * animationTime
      this.answerCtx.fillRect(shadow1_x, shadow1_y, shadow1_width, shadow1_height)
      this.answerCtx.fillRect(shadow2_x, shadow2_y, shadow2_width, shadow2_height)
  

      if (animationTime == 1){
        if (i == answerDetail.index){
        this.answerCtx.strokeStyle = 'red'
     //   this.answerCtx.setLineDash([5,5], 1);
        this.answerCtx.beginPath();
        this.answerCtx.moveTo(cell_end_X + this.answerCell_width *1 / 4, cell_end_Y+ this.answerCell_width* 3 / 4);
        this.answerCtx.lineTo(cell_end_X + this.answerCell_width *3/ 4, cell_end_Y + this.answerCell_width* 3 / 4);
        this.answerCtx.stroke();
      }
        this.rangeOfCells[i]={ index: i, range: [cell_end_X, cell_end_X + this.answerCell_width, cell_end_Y,cell_end_Y+this.answerCell_height]}
       
      }
    
    }

    this.answerCtx.textAlign = 'center'
    this.answerCtx.textBaseline = "middle"
    this.answerCtx.font = 15 * ratio + "px PingFangTC-light"
    this.answerCtx.fillStyle = "red"
  //  console.log(question)

    let answerY = (top.height + board.height) + ((this.height - this.answerCell_height - 10 * ratio)- (top.height+ board.height ))*1/3
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < question.length; i++) {
      lineWidth += this.answerCtx.measureText(question[i]).width;
      if (lineWidth > this.width*0.8) {
        this.answerCtx.fillText(question.substring(lastSubStrIndex, i), this.width/2, answerY);//绘制截取部分
        answerY += 40;//20为字体的高度
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