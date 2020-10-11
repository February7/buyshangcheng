Page({
  handleGetuserinfo(e){
   let {userInfo} = e.detail;
  wx.setStorageSync("userinfo", userInfo);

  wx.navigateBack({
    delta: 1
  });
    
  }
})