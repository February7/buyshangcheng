import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
    ordersList:[]
  },

  onShow(){

    let pages=getCurrentPages();
    // console.log(pages);
    let {options} = pages[pages.length-1];
    let type = options.type;

    this.changeTabsItecActive(type-1);
    this.getOrders(type);
  },

  async getOrders(type){
    let token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }
    let res = await request({url:'/my/orders/all',data:{type}});
    this.setData({
      ordersList:res.orders.map(v=>({...v,create_tiem_formate:new Date(v.create_time*1000).toLocaleString()}))
    })
    
  },

  handleTabsItemClick(e){

    let {index} = e.detail;
   this.changeTabsItecActive(index);

  this.getOrders(index+1);
  },
  changeTabsItecActive(index){

     let {tabs} = this.data;
     tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);

     this.setData({
       tabs
     }) 
  }

})