
// export const request = (params)=>{
//   const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
//   wx.showToast({
//     title: '加载中╥﹏╥...',
//     icon:'loading',
//     mask:true
//   })

let ajaxTime = 0;
export const request = (params)=>{
  let header={...params.header};
  if(params.url.includes("/my/")){
      header["Authorization"]=wx.getStorageSync("token");
  }
  ajaxTime++;
  wx.showLoading({
      title: '加载中',
      mask: true,
  });

  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve)=>{
    wx.request({
      ...params,
      header:header,
      url:baseURL+params.url,
      success:(res)=>{
        resolve(res.data.message)
      },
      complete:()=>{
        // wx.hideToast();
        ajaxTime--;
        if(ajaxTime===0){
            wx.hideLoading();
        }
      }
    })
  })
}