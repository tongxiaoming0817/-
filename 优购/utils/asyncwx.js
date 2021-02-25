export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })

  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: '您是否要删除',
      success :(res)=> {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success :(res)=> {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


