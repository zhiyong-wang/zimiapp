import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import { BOARD_LINE_COLOR, BOARD_DARK_COLOR,BOARD_GREY_COLOR,BOARD_LIGHT_COLOR } from './../shared/contants.js'
import zimi from './zimi.js'

class Board {
  constructor() {
    const { winHeight,winWidth } = getWindowRectSync()
    this.width = winWidth*10/12
    this.height = winWidth*10/12

    this.x =  winWidth / 12
    this.y = 60

    this.cellWidth=winWidth / 12
    this.cellHeight= winWidth / 12

    this.titleCanvas = wx.createCanvas()
    this.boardCanvas = wx.createCanvas()
    this.titleCtx = this.titleCanvas.getContext('2d')
    this.boardCtx = this.boardCanvas.getContext('2d')
     
    this.cells=[]
    this.presentCell = []

  }
  render(){
    this.boardDraw()
    screenCtx.drawImage(
      this.boardCanvas,
      0, 0, this.width, this.height,this.x, this.y, this.width, this.height
    )
  }
 
  boardDraw(){
   
   console.log("boardDraw")
   console.log(this)
    for (let i=0;i<10;i++){
      for(let j=0;j<10;j++){
        //   console.log(this.cells[i * 10 + j])
        if (this.cells[i * 10 + j]!=""){
        
             if(this.presentCell.includes(i*10+j)){
               this.boardCtx.fillStyle = BOARD_LIGHT_COLOR
             }else{
               this.boardCtx.fillStyle = BOARD_GREY_COLOR}
           }else
        { this.boardCtx.fillStyle =BOARD_DARK_COLOR}
        this.boardCtx.fillRect(this.cellWidth*j,this.cellHeight*i, this.cellWidth, this.cellHeight)          
      }
     }
    // 绘制棋盘线条 

    this.boardCtx.lineWidth=1

    this.boardCtx.strokeStyle = BOARD_LINE_COLOR
    for (let i = 0; i < 11; ++i) {
      // 水平线条
      let line_y = Math.floor(this.cellHeight * i)+0.5

      this.boardCtx.moveTo(0,line_y )
      this.boardCtx.lineTo(this.cellWidth * 10, line_y)
      this.boardCtx.stroke()

      //垂直线条
      let line_x = Math.floor(this.x + this.cellWidth * i) + 0.5
      this.boardCtx.moveTo(line_x, 0)
      this.boardCtx.lineTo(line_x,  this.cellHeight * 10 )
      this.boardCtx.stroke()

    }

 }

   handleTouch(clintX, clintY,touchTime){
     let row = Math.floor((clintY - this.y) / this.cellHeight)
     let col = Math.floor((clintX - this.x) /this. cellWidth)
     if(row>=0&&col>=0&&row<10&&col<10){
     //  console.log(row,col)
       if (this.presentCell.includes(row * 10 + col)&&touchTime>400){
         console.log(touchTime)
         console.log("callAnswer")
       }
       else{
     //  console.log(row, col)
       return this.setpresentCell(row,col)       
       }
     }
     else{
       return this.presentCell
   }
 }
    setpresentCell(row,col,){    
       if(this.cells[row*10+col]!=""&&this.cells[row*10+col].value==""){
          let zimiXId = this.cells[row*10+col].zimi_index
          let zimiYId = this.cells[row*10+col].zimi_index1
         // console.log(zimiXId,zimiYId)
         if (zimiXId != -1 && !(this.presentCell.includes(row * 10 + col) && (this.presentCell[1] - this.presentCell[0])==1)){
            this.presentCell=[]
            for(let i=0;i<100;i++){
              if(this.cells[i].zimi_index==zimiXId){
                this.presentCell.push(i)
              }
            }  
        }
         else {
           if (zimiYId != -1 && !(this.presentCell.includes(row * 10 + col) && (this.presentCell[1] - this.presentCell[0]) == 10)){
              this.presentCell = []
              for (let i = 0; i < 100; i++) {
                if (this.cells[i].zimi_index1 == zimiYId) {
                  this.presentCell.push(i)
                }
              }

               
           }
         }           
            
      }
      return this.presentCell    

    }


}

export default new Board()