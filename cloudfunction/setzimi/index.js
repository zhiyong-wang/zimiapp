// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
   console.log(event)
  let zimi=event.zimis
  
  let qipan = [];
  for (let i = 0; i < 100; i++) {
    qipan[i] = "";
  }

  for (let i = 0; i < zimi.length; ++i) {       //按字谜的索引顺序依次设置字谜的网格如何显示
    let zb = Number(zimi[i].zb);                   //字谜的坐标
    if (zimi[i].zongheng == 1) {                    //判断字谜纵横属性
      for (let j = zb, k = 0; k < zimi[i].midi.length; j++ , k++) {
        qipan[j] = {
          zimi_index: i,
          zimi_index1: -1,
          css_class: "gray",
          value:""
        };
      }
   }
    else {

      let zb = Number(zimi[i].zb);
      for (let j = zb, k = 0; k < zimi[i].midi.length; j = j + 10, k++) {
        if (qipan[j] == "") {
          qipan[j] = {
            zimi_index: -1,
            zimi_index1: i,
            css_class: "gray" ,
             value: ""                   //对应字谜的数组序号
          }
        }
        else {
          qipan[j].zimi_index1 = i
        }
      }
    }
  };

  let question = []

  for (let j = 0; j < zimi.length; j++) {
      question.push({ "detail": zimi[j].question, "zimi_index": j });    
  }
  return {"board":qipan,"questions":question}




}