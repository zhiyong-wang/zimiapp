import {db,$} from "./shared/cloud.js"
import cover from './modules/cover.js'
import user from './modules/user.js'
import { getWindowRectSync } from './shared/util.js'
import { screenCtx } from './shared/canvas.js'

const { winWidth, winHeight } = getWindowRectSync()

class Main {
  constructor() {
    this.objs = [
      cover,
   //   background,
    //  head,
   //   chessmen,
    ]
   this.render()
  }
  render() {
    screenCtx.clearRect(0, 0, winWidth, winHeight)
    console.log(winHeight)
    for (let obj of this.objs) {
      (typeof obj.render === 'function') && (obj.render())
    }
  }
}

export default new Main()
