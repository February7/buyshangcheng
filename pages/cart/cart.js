import {getSetting,openSetting,chooseAddress,showModal} from '../../utils/util';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  async handleAddress(){
    let res = await getSetting();
    let scorpeAddress = res.authSetting["scope.address"];
    if (scorpeAddress===false) {
      await openSetting();
    }
    let address = await chooseAddress();
    wx.setStorageSync('address', address)
  },
  onShow(){
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync('cart') || [];
    // let allChecked = cart.length>0?cart.every(v=>v.checked):false;
    this.setCart(cart);
    this.setData({
      address
    })
  },
  handleItemChange(e){
    let goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },
  setCart(cart){
    let allChecked=true;
    let totalNum = 0;
    let totalPrice = 0;
    cart.forEach((v,i) => {
      if (v.checked) {
        totalNum+=v.num;
        totalPrice+=v.goods_price*v.num;
      }else{
        allChecked=false;
      }
    });
    allChecked=cart.length>0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    });
    wx.setStorageSync('cart', cart);
  },
  handleAllCheckedChange(e){
    let {allChecked,cart} = this.data;
    allChecked=!allChecked;
    cart.forEach(v => v.checked=allChecked);
    this.setCart(cart);
  },
  async handleNmEdit(e){
    let {id,opration} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===id);
    console.log(opration===-1)
    if(cart[index].num===1&&opration===-1){
      let res = await showModal({content:'你确定要移除该商品吗'})
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
    } else {
        cart[index].num+=opration;
        this.setCart(cart);
    }
  },
  async handleOrderPay(){
    let {address,totalNum} = this.data;
    if(address===null){
      await showToast({title:'您还没有选择收货地址！！！'});
      return;
    }
    if(totalNum===0){
      await showToast({title:'您还没有选购商品！！！'});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  }
})