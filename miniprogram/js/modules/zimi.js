import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR } from './../shared/contants.js'
import board from './board.js'
import questions from './questions.js'

export default  class Zimi {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()
    this.width=winWidth
    this.height=winHeight
    
    this.cells=[]
    this.presentCell=[]
      
    this.startTouchtime=0    

  }
  init() {
    wx.offTouchStart()
    console.log("onload") 
   // console.log(data.questions)
    this.requestZimi() 
 
    wx.onTouchStart((event) => {this.startTouchtime = event.timeStamp})
    
    wx.onTouchEnd((event) => {this.handleTouch(event)})

   
  }

  render(){
    screenCtx.clearRect(0, 0, this.width, this.height);
    screenCtx.fillStyle = BG_COLOR
    screenCtx.fillRect(0, 0, this.width, this.height)
    setTimeout(() => {
    board.cells = this.cells
      board.presentCell = this.presentCell
      board.render()

      questions.items = this.questions
      questions.render()},0)
    

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
  const { clientX, clientY } = event.changedTouches[0]
  let endTouchtime=event.timeStamp
  let touchTime=endTouchtime - this.startTouchtime
  this.presentCell=board.handleTouch(clientX,clientY,touchTime)
  //console.log(this.presentCell)

  this.render()


}


}
