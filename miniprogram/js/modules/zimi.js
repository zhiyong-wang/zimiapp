import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_DARK_COLOR } from './../shared/contants.js'
import board from './board.js'
import questions from './questions.js'

class Zimi {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()
    this.width=winWidth
    this.height=winHeight
    
    this.cellWidth=this.width/12
    
    this.boardWidth = this.cellWidth*10
    this.boardHeight = this.cellWidth*10
    this.board_X = this.cellWidth
    this.board_Y=60
    
    this.cells=[]
    this.presentCell=[]

    
    this.questions=[]
    this.question_index=0
    this.presentQuestions=[]

    this.touchStartY = 0

      
    this.startTouchtime=0   
    this.moveDistance=0 
   
  }
  init() {
    wx.offTouchStart()
    console.log("onload") 
   // console.log(data.questions)
    
    this.requestZimi() 
 
    wx.onTouchStart((event) => {this.startTouchtime = event.timeStamp
     this.touchStartY= event.changedTouches[0].clientY})    
    wx.onTouchEnd((event) => {this.handleTouch(event)})
   wx.onTouchMove((event) => {this.handleTouchmove(event)})
    
  }

  render(){
    console.log("render")
    screenCtx.clearRect(0, 0, this.width, this.height);
    screenCtx.fillStyle = BG_COLOR
    screenCtx.fillRect(0, 0, this.width, this.height)

    board.render(this.cells,this.presentCell) 
    this.setPresentQuestions() 
    questions.render(this.questions, this.question_index,this.moveDistance)  
    

    screenCtx.textAlign = 'left'
    screenCtx.textBaseline = "top"
    screenCtx.font = "15px 宋体"
    screenCtx.fillStyle = BOARD_DARK_COLOR
    screenCtx.fillText("问 题：",10, 80 + this.width * 10 / 12)

  }
  requestZimi () {
  let zimi
  wx.cloud.callFunction({
    // 要调用的云函数名称
    name: 'loadzimi',
  }).then(res => {
     this.cells = res.result.board
    this.questions = res.result.questions
     this.render()     

    //
     })
}

handleTouch(event){
  //console.log(event)
  const { clientX, clientY } = event.changedTouches[0]
  let endTouchtime=event.timeStamp
  let touchTime=endTouchtime - this.startTouchtime

  

  let board_row = Math.floor((clientY - this.board_Y) / this.cellWidth)
  let board_col = Math.floor((clientX - this.board_X) / this.cellWidth)
  if (board_row >= 0 && board_col >= 0 && board_row < 10 && board_col < 10) {
    console.log(board_row, board_col)
    if (this.presentCell.includes(board_row * 10 + board_col) && touchTime > 400) {
        console.log(touchTime)
        console.log("callAnswer")
      }
      else {
      this.presentCell = board.setpresentCell(board_row, board_col,this.cells,this.presentCell)
      console.log(this.cells[this.presentCell[0]])

      }

    }

  if (clientY>questions.y){
    if(Math.abs(clientY-this.touchStartY)<5) //点击直接选择
    { 
      this.question_index = this.question_index + Math.round((clientY-questions.y)/questions.perWidth)-5
        if (this.question_index < 0) { this.question_index = this.questions.length +this.question_index}
        if (this.question_index >= this.questions.length) { this.question_index = this.question_index-this.questions.length  }

   console.log(this.question_index) 

  }
  else{
      console.log(Math.round(this.moveDistance / questions.perWidth) )
      this.question_index = this.question_index- Math.round(this.moveDistance / questions.perWidth) 
      if (this.question_index < 0) { this.question_index = this.questions.length + this.question_index }
      if (this.question_index >= this.questions.length) { this.question_index = this.question_index - this.questions.length }

  }


  }

  this.moveDistance = 0


  this.render()

  }



handleTouchmove(event) {
  if (this.touchStartY >questions.y + questions.perWidth){
  console.log("move")
  console.log(event.changedTouches[0].clientY)

  this. moveDistance = event.changedTouches[0].clientY-this.touchStartY

  console.log(this.moveDistance)
 // this.touchStartY = event.changedTouches[0].clientY
 // console.log(this.question_index)
  
  
  this.render()
  }

}
setPresentQuestions(){

   this.presentQuestions=questions  


}
  
  

}
export default new Zimi()