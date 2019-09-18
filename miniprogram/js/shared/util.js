let winWidth = 0,
  winHeight = 0

export async function getWindowRect() {
  const promise = new Promise(resolve => {
    if (winHeight || winWidth) {
      resolve({ winHeight, winWidth })
    }

    wx.getSystemInfo({
      success: function (res) {
        winHeight = res.windowHeight
        winWidth = res.windowWidth
        resolve({ winHeight, winWidth })
      },
      fail: function (err) {
        console.err(err)
      }
    })
  })

  return promise
}

export const getWindowRectSync = (() => {
  let winWidth = 0,
    winHeight = 0

  return () => {
    if (winHeight || winWidth) {
      return { winHeight, winWidth }
    }
    try {
      const sysInfo = wx.getSystemInfoSync()
      winWidth = sysInfo.windowWidth
      winHeight = sysInfo.windowHeight
    } catch (error) {
      console.log('获取屏幕信息失败: ', error.message)
    } finally {
      return { winHeight, winWidth }
    }
  }
})()
