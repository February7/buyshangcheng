import { login } from '../../utils/util.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'
Page({
  async handleGetuserinfo(e){
    try {
      let {encryptedData,iv,rawData,signature}=e.detail;
      let {code} = await login();
      let tokenParams = {encryptedData,iv,rawData,signature,code};
      let token = await request({url:'/users/wxlogin',method:'post',data:tokenParams});
      token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
      
    }
    
  }
})