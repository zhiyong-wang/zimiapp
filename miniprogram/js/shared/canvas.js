const canvas = wx.createCanvas()
const sys = wx.getSystemInfoSync()
export const ratio = sys.pixelRatio
//export default canvas
const screenCanvas=canvas

screenCanvas.width =canvas.width*ratio
screenCanvas.height = canvas.height * ratio
export default screenCanvas
console.log(screenCanvas)
export const screenCtx = screenCanvas.getContext('2d')
//screenCtx.scale(ratio, ratio)
//console.log(screenCtx)
const menuButton=wx.getMenuButtonBoundingClientRect()





