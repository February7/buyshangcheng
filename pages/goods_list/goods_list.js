import { request } from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"价格",
        isActive:false
      },
      {
        id:2,
        value:"销量",
        isActive:false
      },
    ],
    goodsList:[]
  },
  ParamsObject:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totaPages:1,
  viewportHeight:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ParamsObject.cid=options.cid;
    this.getGoodsList();
  },
  async getGoodsList(){
    let res = await request({url:'/goods/search',data:this.ParamsObject});
    this.totaPages=Math.ceil(res.total/this.ParamsObject.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    });
    wx.stopPullDownRefresh();
  },
  handleTabsItemChange(e){
    let {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => {
      i===index?v.isActive=true:v.isActive=false;
    });
    this.setData({
      tabs
    });
  },
  onReachBottom(){
    if (this.ParamsObject.pagenum>=this.totaPages) {
      wx.showToast({
        title: '到底了＞﹏＜',
        mask:true
      })
    }else{
      this.ParamsObject.pagenum++;
      this.getGoodsList();
      // var query = wx.createSelectorQuery();
      // query.select(page).boundingClientRect();
      // query.exec(function(res){
      //   console.log(res)
      // })
      wx.pageScrollTo({
        scrollTop:eval(viewportHeight),
        duration:1000
      })
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.ParamsObject.pagenum=1;
    this.getGoodsList();
  },
  onPageScroll(e){
    console.log(e)
  }
})