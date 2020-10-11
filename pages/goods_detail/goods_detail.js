import { request } from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id){
    let res = await request({url:'/goods/detail',data:{goods_id}});
    this.GoodsInfo = res;
    this.setData({
      goodsObj:{
        pics:res.pics,
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        goods_introduce:res.goods_introduce.replace(/.webp/g,'.jpg')
      }
    })
  },
  handlePreviewImage(e){
    console.log(e)
    let {url} = e.currentTarget.dataset;
    let urls = this.GoodsInfo.pics.map(v=>v.pics_mid_url);
    wx.previewImage({
      current:url,
      urls
    })
  },
  handleAddCart(){
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if (index===-1) {
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  }
})