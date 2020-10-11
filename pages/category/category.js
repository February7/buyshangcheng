import { request } from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCategoryList:[],
    rightCategoryList:[],
    currentIndex:0,
    distance:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCategoryList();
    }else {
      if (Date.now() - cates.time > 1000 * 300) {
        this.getCategoryList();
      }else{
        this.Cates=cates.data
        let leftCategoryList=this.Cates.map(v=>v.cat_name)
        let rightCategoryList=this.Cates[0].children
        this.setData({
          leftCategoryList,
          rightCategoryList
        })
      }
    }
    
  },
  async getCategoryList(){
    // request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'}).then(
    //   res=>{
    //       this.Cates=res.data.message
    //       wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //       let leftCategoryList=this.Cates.map(v=>v.cat_name)
    //       let rightCategoryList=this.Cates[0].children
    //       this.setData({
    //         leftCategoryList,
    //         rightCategoryList
    //       })
    //   }
    // )
    let res = await request({url:'/categories'});
    this.Cates=res
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    let leftCategoryList=this.Cates.map(v=>v.cat_name)
    let rightCategoryList=this.Cates[0].children
    this.setData({
      leftCategoryList,
      rightCategoryList
    })
  },
  changeActive(e){
    let {index} = e.currentTarget.dataset
    let rightCategoryList=this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightCategoryList,
      distance:0
    })
  }
})