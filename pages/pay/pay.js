import { getSetting, openSetting, chooseAddress, showModal, showToast, requestPayment } from "../../utils/util.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];

    cart = cart.filter(v => v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v, i) => {
      totalNum += v.num;
      totalPrice += v.goods_price * v.num;
    });
    this.setData({
      address,
      cart,
      totalNum,
      totalPrice
    });
  },

  async handlePay() {
    try {
      let token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return;
      }
      let order_price = this.data.totalPrice;
      let consignee_addr = this.data.address.all;
      let goods = [];
      let cart = this.data.cart;
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      let orderNumParms = { order_price, consignee_addr, goods }
      let { order_number } = await request({ url: '/my/orders/create', method: 'post', data: orderNumParms });

      let { pay } = await request({ url: '/my/orders/req_unifiedorder', method: 'post', data: { order_number } });
      let res2 = await request({ url: '/my/orders/chkOrder', method: 'post', data: { order_number } });
      
      let newCart = wx.getStorageSync("cart");
      newCart=newCart.filter(v=>!v.checked);
      wx.setStorageSync("cart", newCart);
      wx.navigateTo({
        url: '/pages/order/order'
      });
      await showToast({title:'支付成功'});
    } catch (error) {
      await showToast({title:'支付失败'});
      console.log(error);

    }



  }
})