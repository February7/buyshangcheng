Page({

  data: {
    userInfo:{},
    collectionNum:0
  },

  onShow(){
    let userInfo = wx.getStorageSync("userinfo");
    console.log(userInfo);
    let collection = wx.getStorageSync("collection") || [];

    
    this.setData({
      userInfo,
      collectionNum:collection.length
    })

  }

 
})