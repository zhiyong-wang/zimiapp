import { screenCtx ,ratio} from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BG_COLOR, BOARD_LINE_COLOR } from './../shared/contants.js'
import top from './top.js'
import board from './board.js'
import questions from './questions.js'
import keyboard from './keyboard.js'
import answer from './answer.js'
import center from './center.js'
import left from './left.js'
import right from './right.js'


class Zimi {
  constructor() {
    const { winWidth, winHeight } = getWindowRectSync()
    
    this.width = winWidth * ratio
    this.height = winHeight * ratio
    
    this.cellWidth = board.cellWidth
    
    this.boardWidth = board.width
    this.boardHeight = board.height
    this.board_X = board.x
    this.board_Y = board.y
    
    this.cells=[]
    this.presentCell=[]
    this.answerDetail = []  //录入的当前问题的答案，与presentCell对应

    
    this.questions=[]
    this.question_index=4

    this.touchStartY = 0
      
    this.startTouchtime=0   
    this.moveDistance = 0 

    this.show_keyboard=false
    this.now_key=""
    this.timeoutId='-1'
   
    
    this.i=0
    this.animationTime=0

  }
  init() {
    wx.offTouchStart()
    console.log("onload") 
   // console.log(data.questions)    
    this.requestZimi() 

    wx.onTouchStart((event) => {
      if (this.show_keyboard) {
         this.keybaoardTouch_start(event)}
      else
      {  this.hangdleTouch_start(event)
        }
    })

    wx.onTouchEnd((event) => {
       if(this.show_keyboard){
         this.keybaoardTouch_end(event)
       }
       else{        
        this.handleTouch_end(event)}
    })


    wx.onTouchMove((event) => {
      if(!this.show_keyboard){ this.handleTouchmove(event)}
    })

  }

  render(){
   
    console.log("render")
    screenCtx.clearRect(0, 0, this.width, this.height);
    screenCtx.fillStyle = BG_COLOR
    screenCtx.fillRect(0, 0, this.width, this.height)

   //
    top.render()

    this.setpresentCell()
    left.render()
    board.render(this.cells,this.presentCell) 
    right.render()
   // console.log(this.presentCell)

    if (!this.show_keyboard) {
      center.render()
      questions.render(this.questions, this.question_index, this.moveDistance) 
      this.i=0      
    }
    else {
      console.log(this.show_keyboard)
      answer.render(this.questions[this.question_index].detail, this.presentCell, this.animationTime,this.answerDetail)
      keyboard.render(this.now_key) 

      if (this.i>=32) {
        console.log("loop")
        return
      }
     
     else{
      this.i++
      this.animationTime=this.i/32
      let that=this
        this.timeoutId = requestAnimationFrame(function () {
        console.log("Answer")
        that.render()
      })
      console.log(this.timeoutId)
     }
    
   }

  
  }


  requestZimi () {
  let zimi
  wx.cloud.callFunction({
    // 要调用的云函数名称
    name: 'loadzimi',
  }).then(res => {
     this.cells = res.result.board
    this.questions = res.result.questions
    for (let i = 0; i < 100; i++) {
      if (this.cells[i].zimi_index == this.question_index || this.cells[i].zimi_index == this.question_index1) {
        this.presentCell.push(i)
        
      }
    }
    console.log(this.cells)
     this.render()     

    //
     })
}
setpresentCell(){
    this.presentCell = []
for (let i = 0; i < 100; i++) {

  if (this.cells[i]&&(this.cells[i].zimi_index == this.question_index || this.cells[i].zimi_index1 == this.question_index)) {
    this.presentCell.push(i)
  }
}
}


hangdleTouch_start(event){
this.startTouchtime = event.timeStamp
const { clientX, clientY } = event.changedTouches[0]
let now_clientX = clientX * ratio
let now_clientY = clientY * ratio
this.touchStartY = now_clientY
let board_row = Math.floor((now_clientY - this.board_Y) / this.cellWidth)
let board_col = Math.floor((now_clientX - this.board_X) / this.cellWidth)
 
   if (this.presentCell.includes(board_row * 10 + board_col) ) {
     let that = this
     this.timeoutId=setTimeout(function () { 
        console.log("callAnswer")
        that.show_keyboard = true
       that.render()
        },600)
        console.log(this.timeoutId)
  }
}


handleTouch_end(event){
  console.log(event)
  clearTimeout(this.timeoutId)
  const { clientX, clientY } = event.changedTouches[0]
  let now_clientX = clientX * ratio
  let now_clientY = clientY * ratio
  let endTouchtime=event.timeStamp
  let touchTime=endTouchtime - this.startTouchtime

  //触摸broad，
  if (now_clientY < questions.y && Math.abs(now_clientY - this.touchStartY) < 5){
    let board_row = Math.floor((now_clientY - this.board_Y) / this.cellWidth)
    let board_col = Math.floor((now_clientX - this.board_X) / this.cellWidth)
    if (board_row >= 0 && board_col >= 0 && board_row < 10 && board_col < 10) {
      console.log(board_row, board_col)
      console.log("chick cell")
      let lastpresentCell=this.presentCell
      this.presentCell = board.setpresentCell(board_row, board_col,this.cells,this.presentCell)
      if(lastpresentCell==this.presentCell){
        this.show_keyboard = true
        this.render()
        return
      }
      else{     
        if (this.presentCell[1]-this.presentCell[0]==1)
            { this.question_index = this.cells[this.presentCell[0]].zimi_index}
        else{ this.question_index = this.cells[this.presentCell[0]].zimi_index1} 
        this.render()
        return
       } 

     }
  }

//直接选择问题
  if (now_clientY>questions.y){
    console.log("chick question")
    if (Math.abs(now_clientY-this.touchStartY)<5) //点击直接选择
    { 
      let pre_question=this.question_index
      this.question_index = this.question_index + Math.ceil((now_clientY-questions.y)/questions.perWidth)-5
        if (this.question_index < 0) { this.question_index = 0}
        if (this.question_index >= this.questions.length) { this.question_index = this.questions.length-1  }
      if (this.question_index == pre_question) { 
        this.show_keyboard=true 

        }
      this.render()
      return
  }
  else{
      console.log(Math.round(this.moveDistance / questions.perWidth) )
      this.question_index = this.question_index- Math.round(this.moveDistance / questions.perWidth) 
      if (this.question_index < 0) { this.question_index = 0 }
      if (this.question_index >= this.questions.length) { this.question_index =  this.questions.length-1 }
      this.moveDistance = 0
      this.render()
    
      return

  }
  }



  }


//通过划动选择问题
handleTouchmove(event) {
  if (this.touchStartY >questions.y + questions.perWidth){
  console.log("move")
  console.log(event.changedTouches[0].clientY)

  this. moveDistance = event.changedTouches[0].clientY*ratio-this.touchStartY
  console.log(this.moveDistance)
 // this.touchStartY = event.changedTouches[0].clientY
 // console.log(this.question_index)

   this.render()
  }
}


  keybaoardTouch_start(event) {
    const { clientX, clientY } = event.changedTouches[0]
    let now_clientX = clientX * ratio
    let now_clientY = clientY * ratio - keyboard.y
  //  console.log(now_clientX, now_clientY)
    for (let key of keyboard.keys) {
      if (now_clientX >= key.x && now_clientX <= key.x + key.width && now_clientY >= key.y && now_clientY <= key.y + key.height) {
      this.now_key=key.value
      this.i =32
      this.render()
      }

    }

  }
keybaoardTouch_end(event){
  const { clientX, clientY } = event.changedTouches[0]
  let now_clientX = clientX * ratio
  let now_clientY = clientY * ratio - keyboard.y 
 // console.log(now_clientX,now_clientY)
  for(let key of keyboard.keys){
     if(now_clientX>=key.x&&now_clientX<=key.x+key.width&&now_clientY>=key.y&&now_clientY<=key.y+key.height){
       this.now_key=""
       this.tapKey(key.value)
        }      
  
  }


  }
  tapKey(key){
    console.log(key)
    switch (key){
    case "返回":
      this.show_keyboard=false
      this.render()
      break

    case "确定":
        this.render()
        break

    case "取消":
        this.render()
        break

    case "后退":
        this.render()
        break
     
   case "后退":
        this.render()
        break
    default:
        this.render()
        break



    }
    

  }


  
 
}
export default new Zimi()