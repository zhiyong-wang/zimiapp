import { screenCtx } from './../shared/canvas.js'
import { getWindowRectSync } from './../shared/util.js'
import {BOARD_LINE_COLOR, BOARD_DARK_COLOR,BOARD_GREY_COLOR,BOARD_LIGHT_COLOR } from './../shared/contants.js'
import Zimi from './zimi.js'

class Board {
  constructor() {
    const { winHeight,winWidth } = getWindowRectSync()
    this.width = winWidth*10/12
    this.height = winWidth*10/12

    this.x =  winWidth / 12
    this.y = 60

    this.cellWidth=winWidth / 12
    this.cellHeight= winWidth / 12

   // this.titleCanvas = wx.createCanvas()
 this.boardCanvas = wx.createCanvas()
   // this.titleCtx = this.titleCanvas.getContext('2d')
  this.boardCtx=this.boardCanvas.getContext('2d')
     

  }
  render(cells,presentCell){
    this.boardDraw(cells, presentCell)
    screenCtx.drawImage(
      this.boardCanvas, 0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height
    
    )
  }
 
  boardDraw(cells,presentCell){

   
   console.log("boardDraw")
   console.log(this)
    for (let i=0;i<10;i++){
      for(let j=0;j<10;j++){
        //   console.log(this.cells[i * 10 + j])
        if (cells[i * 10 + j]!=""){
        
             if(presentCell.includes(i*10+j)){
               this.boardCtx.fillStyle = BOARD_LIGHT_COLOR
             }else{
               this.boardCtx.fillStyle = BOARD_GREY_COLOR
               }
           }else
        { this.boardCtx.fillStyle =BOARD_DARK_COLOR}
        this.boardCtx.fillRect(this.cellWidth*j,this.cellHeight*i, this.cellWidth, this.cellHeight)          
      }
     }

    // 绘制棋盘线条 

  //  this.boardCtx.lineWidth=5
  // this.boardCtx.strokeStyle ="red"

    for (let i = 0; i < 11;i++) {
      // 水平线条
      this.boardCtx.beginPath()
      this.boardCtx.LineWidth=1
      this.boardCtx.strokeStyle = BOARD_LINE_COLOR
      
      let line_y = Math.floor(this.cellHeight * i )+0.5
      let x_begin =0
      let x_end = Math.round(this.cellWidth * 10 )

      this.boardCtx.moveTo(x_begin,line_y )
      this.boardCtx.lineTo(x_end, line_y)
      this.boardCtx.stroke()

      console.log(this.boardCtx.strokeStyle)
      //垂直线条
     
      let line_x = Math.floor(this.cellWidth * i )+0.5
      let y_begin = 0
      let y_end = Math.round(this.cellWidth * 10) 
    
      this.boardCtx.beginPath()
      this.boardCtx.moveTo(line_x, y_begin)
      this.boardCtx.lineTo(line_x, y_end)
      this.boardCtx.stroke()
      console.log(i + ':' + line_x)
    }
  //  this.boardCtx.stroke()
 }

  
    setpresentCell(row,col,cells,presentCell){   
      let now_presentCell =[]
       if(cells[row*10+col]!=""&&cells[row*10+col].value==""){
          let zimiXId = cells[row*10+col].zimi_index
          let zimiYId = cells[row*10+col].zimi_index1
         // console.log(zimiXId,zimiYId)
         if (zimiXId != -1 && !(presentCell.includes(row * 10 + col) && (presentCell[1]-presentCell[0] == 1))){
            this.presentCell=[]
            for(let i=0;i<100;i++){
              if(cells[i].zimi_index==zimiXId){
                now_presentCell.push(i)
              }
            }
          return now_presentCell 
        }
         else {
           if (zimiYId != -1 && !(presentCell.includes(row * 10 + col) && (presentCell[1] - presentCell[0] == 10))){
              presentCell = []
              for (let i = 0; i < 100; i++) {
                if (cells[i].zimi_index1 == zimiYId) {
                  now_presentCell.push(i)
                }
              }
             return now_presentCell 

               
           }
         }           
            
      }
      return presentCell    

    }


}

export default new Board()