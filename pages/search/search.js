import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    goods:[],
    isFocus:false,
    iptValue:""
  },

  TimerID:-1,

  handleInput(e){
    // console.log(e);
    let {value}  = e.detail;  

    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true,
      iptValue:value
    })
    clearTimeout(this.TimerID);
    this.TimerID = setTimeout(()=>{
      this.getSearceResult(value); 
    },1000)
    
  },

  async getSearceResult(query){
    let res = await request({url:'/goods/qsearch',data:{query}})
    // console.log(res);
    this.setData({
      goods:res
    })
    
  },

  handleCancle(){
    this.setData({
      goods:[],
      isFocus:false,
      iptValue:""
    })
  }
})