// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商家、商品投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    // 用户在文本域输入的内容
    taValue: ""
  },
  // 图片外网地址
  WImgsUrl: [],
  /**
   * tabs item 点击事件
   */
  handleTabsItemClick(e) {
    // 获取子组件传递过来的index下标
    let { index } = e.detail;
    // 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 把修改后的数组在设置回去
    this.setData({
      tabs
    })


  },
  /**
   * 点击+ 选择图片
   */
  handleChooseImg() {
    // 小程序提的API
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        this.setData({
          // 需要拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })

      }
    });
  },
  /**
   * 监听用户输入内容
   * @param {Object} e 
   */
  handleInput(e) {
    let { value } = e.detail;
    this.setData({
      taValue: value
    })
  },
  /**
   * 提交按钮点击事件
   */
  handleSubmit() {
    // 0.拿到用户输入的值
    let { taValue, chooseImgs } = this.data;
    // 1.对用户在文本域内输入的内容和合法性验证。
    if (!taValue.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    wx.showLoading({
      title: "上传中",
      mask: true,
    });
    // 2.把选择的图片提交到 图片服务器上  拿到图片的真正外网地址
    if (chooseImgs.length > 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'http://images.ac.cn/api/upload',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            console.log(result);
            // this.WImgsUrl.push()
            // 3. 把 图片外网地址 和 用户输入的内容 一起再次提交到 另外一个文本服务器上
            if (i === chooseImgs.length - 1) {
              console.log("把 图片外网地址 和 用户输入的内容 一起再次提交到 另外一个文本服务器上")
              this.setData({
                taValue: "",
                chooseImgs: []
              });
              wx.hideLoading();
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      // 4. 提交完成后，把 文本域，和 图片数组重置为空
      this.setData({
        taValue: "",
        chooseImgs: []
      });
      wx.hideLoading();
       // 5. 返回上一页
      wx.navigateBack({
        delta: 1
      });
    }



    
   
  }

})