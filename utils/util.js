export const getSetting =()=>{
  return new Promise((resolve,inject)=>{
   wx.getSetting({
     complete: (res) => {
       resolve(res)
     },
   })
  })
}

export const chooseAddress =()=>{
  return new Promise((resolve,inject)=>{
    wx.chooseAddress({
      complete: (res) => {
        resolve(res)
      },
    })
  })
}

export const openSetting =()=>{
  return new Promise((resolve,inject)=>{
    wx.openSetting({
      complete: (res) => {
        resolve(res)
      },
    })
  })
}

export const showModal =({content})=>{
  return new Promise((resolve,inject)=>{
    wx.showModal({
      title: '提示',
      content,
      cancelText: '取消',
      confirmText: '确定',
      cancelColor: 'cancelColor',
      complete: (res) => {
        resolve(res)
      },
    })
  })
}

export const  showToast=({title})=>{
  return new Promise((resolve,inject)=>{
    wx.showToast({
        title: title,
        icon: 'none',
        mask: true,
        complete: (res) => {
          resolve(res)
        },
    });
  })
}

export const  login=()=>{
  return new Promise((resolve,inject)=>{
   wx.login({
       timeout:10000,
       success: (result)=>{
          resolve(result)
       },
       fail: (err)=>{
          inject(err)
       }
   });
  })
}

export const  requestPayment=(pay)=>{
  return new Promise((resolve,inject)=>{
      wx.requestPayment({
          ...pay,
          success: (result)=>{
              resolve(result)
          },
          fail: (err)=>{
              inject(err); 
          }
      });
  })
}