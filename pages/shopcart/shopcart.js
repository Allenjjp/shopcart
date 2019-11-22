// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelected: false, // 是否全选所有产品，默认不全选
    selectNum: 0,         // 选择的产品数量
    selectPrice: '0.00',  // 选中的产品价格
    isEdit: true,         // 编辑按钮状态
    goodsData: [
      {
        shopname: '樱桃日记旗舰店', // 店铺名称
        selected: false,           // 是否选中店铺，默认不选中
        goodsInfo: [
          {
            productImage: "/images/good1.png",                                     // 产品图片地址
            productDesc: "纯棉打底衫女秋冬长袖2019新款修身T恤紧身纯黑色内搭女士上衣服", // 产品描述
            price: "35.00",                                                        // 产品价格
            num: 1,                                                                // 产品数量
            brand: "品牌：Cherry Diary/樱桃日记",                                   // 产品品牌
            selected: false,                                                       // 产品是否为被选中状态，默认不选中
          },
          {
            productImage: "/images/good4.png",                                     // 产品图片地址
            productDesc: "白色半高领t恤女短袖纯棉夏2019新款百搭韩版纯色修身大码打底衫", // 产品描述
            price: "39.90",                                                        // 产品价格
            num: 1,                                                                // 产品数量
            brand: "品牌：Cherry Diary/樱桃日记",                                   // 产品品牌
            selected: false,                                                       // 产品是否为被选中状态，默认不选中
          },
        ]
      },
      {
        shopname: '娇莲本雅旗舰店',                                                 // 店铺名称
        selected: false,                                                           // 是否选中店铺，默认不选中
        goodsInfo: [
          {
            productImage: "/images/good2.png",                                     // 产品图片地址
            productDesc: "女装2019新款潮流行裙子打底内搭蕾丝气质女神范衣服粉秋冬连衣裙",// 产品描述
            price: "168.00",                                                       // 产品价格
            num: 1,                                                                // 产品数量
            brand: "品牌：JOLOYUM/娇莲本雅",                                        // 产品品牌
            selected: false,                                                       // 产品是否为被选中状态，默认不选中
          }
        ]
      },
      {
        shopname: '大发车旗舰店',                                                   // 店铺名称
        selected: false,                                                           // 是否选中店铺，默认不选中
        goodsInfo: [
          {
            productImage: "/images/good3.png",                                      // 产品图片地址
            productDesc: "连衣裙套装2019年针织衫女秋冬初秋气质女神范衣服洋气时尚很仙的", // 产品描述
            price: "168.00",                                                        // 产品价格
            num: 1,                                                                 // 产品数量
            brand: "品牌：大发车",                                                   // 产品品牌
            selected: false,                                                        // 产品是否为被选中状态
          }
        ]
      }
    ]
  },

  /**
   * 点击 减 按钮方法
   * 如果产品数量大于1，num--,
   */
  decrementClick(e) {
    const goodsData = this.data.goodsData;              // 产品数据
    let shopIndex = e.currentTarget.dataset.shopIndex;  // 当前店铺下标
    let index = e.currentTarget.dataset.index;          // 当前产品所在店铺中的下标
    let goodsInfo = goodsData[shopIndex].goodsInfo;     // 当前店铺下的所有产品数据

    if (goodsInfo[index].num <= 1) {
      return false;
    } else {
      goodsInfo[index].num--;
      this.setData({
        goodsData
      })
      this.getSelectProductPrice();
    }
    
  },

  /**
   * 点击 加 按钮方法
   * num ++
   */
  incrementClick(e) {
    const goodsData = this.data.goodsData;  
    let shopIndex = e.currentTarget.dataset.shopIndex; 
    let index = e.currentTarget.dataset.index;  
    let goodsInfo = goodsData[shopIndex].goodsInfo; 
    goodsInfo[index].num++;
    this.setData({
      goodsData
    })
    this.getSelectProductPrice();
  },

  /**
   * 点击 编辑 按钮方法
   * 隐藏数量框，显示删除按钮
   */
  editBtnClick(e) {
    this.setData({
      isEdit: (!this.data.isEdit)
    })
  },

  /**
   * 选择店铺方法
   * 该店铺下的所有产品都会被选中
   */
  selectStore(e) {
    const goodsData = this.data.goodsData;
    let shopIndex = e.currentTarget.dataset.shopIndex; 
    let goodsInfo = goodsData[shopIndex].goodsInfo; 

    if (goodsData[shopIndex].selected) {
      goodsData[shopIndex].selected = false;
      for (var i = 0; i < goodsInfo.length; i++) {
        goodsData[shopIndex].goodsInfo[i].selected = false;
      }
    } else {
      goodsData[shopIndex].selected = true;
      for (var i = 0; i < goodsInfo.length; i++) {
        goodsData[shopIndex].goodsInfo[i].selected = true;
      }
    }
    this.setData({
      goodsData
    })
    this.getSelectProductPrice();
    this.getSelectedAllPrice();
  },

  /**
   * 选择产品方法
   * 当一个店铺下的所有产品被选中时，自动触发店铺的全选按钮
   * 如果该店铺下只有一个产品，选中产品时默认触发店铺的全选按钮
   * 如果选中店铺的全选按钮，则自动全选该店铺下的所有产品
   */
  selectGood(e) {
    const goodsData = this.data.goodsData;
    let shopIndex = e.currentTarget.dataset.shopIndex;
    let index = e.currentTarget.dataset.index;  
    let goodsInfo = goodsData[shopIndex].goodsInfo; 

    if (goodsInfo[index].selected) {
      goodsData[shopIndex].goodsInfo[index].selected = false;
      goodsData[shopIndex].selected = false;
    } else {
      goodsData[shopIndex].goodsInfo[index].selected = true;

      var selectGoodsLength = 0;
      for (var i = 0; i < goodsInfo.length; i++) {
        if (goodsInfo[i].selected == true) {
          selectGoodsLength++;
        }
      }
      if (selectGoodsLength == goodsInfo.length) {
        goodsData[shopIndex].selected = true
      }
    }
    this.setData({
      goodsData
    })
    this.getSelectProductPrice();
    this.getSelectedAllPrice();
  },

  /**
   * 底部 全选 按钮方法
   * 只要有一个产品未被选中，全选按钮就是未选中状态
   * 当所有产品选中时，自动触发全选按钮为选中状态
   * 点击全选按钮，全选所有店铺和店铺下的产品
   */
  allSelectedClick(e) {
    const goodsData = this.data.goodsData;
    let isAllSelected = this.data.isAllSelected;

    if (isAllSelected) {
      isAllSelected = false;
    } else {
      isAllSelected = true;
    }

    for (let i = 0; i < goodsData.length; i++) {
      goodsData[i].selected = isAllSelected;
      var goodsInfo = goodsData[i].goodsInfo;

      for (var j = 0; j < goodsInfo.length; j++) {
        goodsInfo[j].selected = isAllSelected;
      }
    }
    this.setData({
      goodsData,
      isAllSelected
    })
    this.getSelectProductPrice()
  },

  /**
   * 计算选中产品的总价格方法
   * 总价格 = 选中产品的价格 * 选中产品的数量
   */
  getSelectProductPrice() {
    const goodsData = this.data.goodsData;
    let selectPrice = 0;
    let selectNum = 0;

    for (let i = 0; i < goodsData.length; i++) {
      var goodsInfo = goodsData[i].goodsInfo;
      for(let j = 0; j < goodsInfo.length; j++) {
        if (goodsInfo[j].selected) {
          selectPrice += Number(goodsInfo[j].price) * parseInt(goodsInfo[j].num);
          selectNum += parseInt(goodsInfo[j].num);
        }
      }
    }
    this.setData({
      selectNum,
      selectPrice: selectPrice.toFixed(2)
    })
  },

  /**
   * 全选条件方法
   */
  getSelectedAllPrice() {
    const goodsData = this.data.goodsData;
    let shopNum = goodsData.length;
    let isAllSelected = this.data.isAllSelected;
    let allSelectedNum = 0;
    for (let i = 0; i < goodsData.length; i++) {
      if (goodsData[i].selected == true) {
        allSelectedNum++
      }
    }
    if (shopNum == allSelectedNum) {
      isAllSelected = true
    } else {
      isAllSelected = false;
    }
    this.setData({
      isAllSelected
    })
    this.getSelectProductPrice();
  },

  /**
   * 商品产品方法
   * 点击编辑按钮，显示删除按钮
   * 选中产品才可以产出该产品
   */
  deleteBtn(e) {
    const goodsData = this.data.goodsData;
    let index = e.currentTarget.dataset.index;
    let shopIndex = e.currentTarget.dataset.shopIndex;
    if (goodsData[shopIndex].goodsInfo[index].selected == false) {
      wx.showModal({
        title: '提示',
        content: '请选择要删除的产品！',
        showCancel: false,
        confirmColor: '#F7323A'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认要删除此产品么？',
        confirmColor: '#F7323A',
        cancelColor: '#333333',
        success: (res) => {
          if (res.confirm) {

            if (goodsData[shopIndex].goodsInfo.length > 1 && goodsData[shopIndex].goodsInfo[index].selected == true) {
              this.data.goodsData[shopIndex].goodsInfo.splice(index, 1);
              this.setData({
                goodsData
              })
              return false;
            }
            if (goodsData[shopIndex].goodsInfo.length == 1 && goodsData[shopIndex].selected == true) {
              this.data.goodsData.splice(index, 1);
              this.setData({
                goodsData
              })
              return false;
            }
          }
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})