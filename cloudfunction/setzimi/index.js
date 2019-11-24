// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
   console.log(event)
  let roomId = event.roomId

  let zimi 
  await db.collection('gamerooms').where({
    _id: roomId
  }).get()
    .then(res => {
      zimi = res.data[0].zimi
      console.log("zimi"+res.data)
    }
  ).catch(err => {
    console.log("error: " + err) // handle error
  })  
  console.log(zimi)
  let qipan = [];
  for (let i = 0; i < 100; i++) {
    qipan[i] = "";
  }

  for (let i = 0; i < zimi.length; ++i) {       //按字谜的索引顺序依次设置字谜的网格如何显示
    let zb = Number(zimi[i].zb);                   //字谜的坐标
    if (zimi[i].zongheng == 1) {                    //判断字谜纵横属性
      for (let j = zb, k = 0,g=0; k < zimi[i].midi.length; j++ , k++,g++) {
        let valueOfrange=''
        let answerOfrange=zimi[i].answer[g]
        if (zimi[i].answer[g + 1] == 'h') { 
          answerOfrange = answerOfrange+'h'
          g++
        }
        if(zimi[i].jiejue==true){
          valueOfrange = zimi[i].midi[k]
        }
        qipan[j] = {
    //      index:zimi[i].index,
          zimi_index: i,
          zimi_index1: -1,
          css_class: "gray",
          value: valueOfrange,
          answer: answerOfrange
        };
      }
   }
    else {

      let zb = Number(zimi[i].zb);
      for (let j = zb, k = 0,g=0; k < zimi[i].midi.length; j = j + 10, k++,g++) {
        let valueOfrange = ''
        let answerOfrange = zimi[i].answer[g]
        if (zimi[i].answer[g + 1] == 'h') {
          answerOfrange = answerOfrange + 'h'
          g++
        }
        if (zimi[i].jiejue == true) {
          valueOfrange = zimi[i].midi[k]
        }
        if (qipan[j] == "") {
          qipan[j] = {
            zimi_index: -1,
            zimi_index1: i,
            css_class: "gray" ,
            value: valueOfrange,
            answer: answerOfrange                
          }
        }
        else {
          qipan[j].zimi_index1 = i
          qipan[j].value = qipan[j].value? qipan[j].value:valueOfrange
        }
        //console.log(qipan[j])
      }
    }
  };

  let question = []

  for (let j = 0; j < zimi.length; j++) {
      if(zimi[j].jiejue==false){
      question.push({ "detail": zimi[j].question, "zimi_index": j });   
      } 
  }
  return {"board":qipan,"questions":question}




}