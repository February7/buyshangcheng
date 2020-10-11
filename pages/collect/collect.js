// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部收藏",
        isActive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        value:"浏览足迹",
        isActive:false
      },
    ],
    // 收藏的商品数组
    collection:[]
  },

  /**
   * tabs item 点击事件
   */
  handleTabsItemClick(e){
    // 获取子组件传递过来的index下标
    let {index} = e.detail;
    // 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 把修改后的数组在设置回去
    this.setData({
      tabs
    })

    
  },
  onShow(){
   let collection= wx.getStorageSync("collection") || [];
   this.setData({
    collection
   });
  }
})