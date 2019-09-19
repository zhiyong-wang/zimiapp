import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR } from './../shared/contants.js'
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
      
    this.startTouchtime=0    
   
  }
  init() {
    wx.offTouchStart()
    console.log("onload") 
   // console.log(data.questions)

 
    wx.onTouchStart((event) => {this.startTouchtime = event.timeStamp})
    
    wx.onTouchEnd((event) => {this.handleTouch(event)})

    this.requestZimi() 
  }

  render(){
    screenCtx.clearRect(0, 0, this.width, this.height);
    screenCtx.fillStyle = BG_COLOR
    screenCtx.fillRect(0, 0, this.width, this.height)
  
    board.render(this.cells,this.presentCell)

    questions.items = this.questions
    questions.render()    

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
      this.render()

      }
    }

    //  this.render()
    // }
  }
  
  

}
export default new Zimi()