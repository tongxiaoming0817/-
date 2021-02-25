// pages/cart/index.js
// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { getSetting, chooseAddress, openSetting,showModal ,showToast} from "../../utils/asyncwx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
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
    //获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    // 获取缓存中的数据
    const cart = wx.getStorageSync('cart') || []
    this.setCart(cart) 
    this.setData({
      address,
    })
    // const allChecked =cart.length? cart.every(v=>v.checked):false
    // let allChecked = true
    // let totalPrice = 0
    // let totalNum = 0
    // cart.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price
    //     totalNum += v.num
    //   } else {
    //     allChecked = false
    //   }
    // })
    // allChecked = cart.length != 0 ? allChecked : false
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
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

  },
  async handleChooseAddress() {
    //获取收货地址
    // //获取权限
    // wx.getSetting({
    //   success: (res) => {
    //     const scopeDddress = res.authSetting["scope.address"]
    //     console.log(res);
    //     if (scopeDddress === true || scopeDddress === undefined) {
    //       wx.chooseAddress({
    //         success: (res2) => {
    //           console.log(res2);
    //         }
    //       })
    //     }else{
    //       wx.openSetting({
    //         success: (res) => {
    //           wx.chooseAddress({
    //             success: (res3) => {
    //               console.log(res3);
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })


    try {
      const res1 = await getSetting()
      const scopeDddress = res1.authSetting["scope.address"]
      if (scopeDddress === false) {
        await openSetting()
      }
      const res2 = await chooseAddress()
      const address = res2
      wx.setStorageSync('address', address)
    } catch (error) {

    }
  },
  // 商品的选中
  handeItemChange(e) {
    //获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    //获取购物车数组
    let { cart } = this.data
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart) 
    // this.setData({
    //   cart
    // })
    // wx.setStorageSync('cart', cart)
    // let allChecked = true
    // let totalPrice = 0
    // let totalNum = 0
    // cart.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price
    //     totalNum += v.num
    //   } else {
    //     allChecked = false
    //   }
    // })
    // allChecked = cart.length != 0 ? allChecked : false
    // this.setData({
    //   cart,
    //   totalPrice,
    //   totalNum,
    //   allChecked
    // })
  },
  // 设置购物车状态同时 重新计算
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  //商品的全选功能
  handleItemAllCheck(){
    //获取data中的数据
    let {cart ,allChecked} = this.data
    //修改值
    allChecked = !allChecked
    //循环数组
    cart.forEach(v=>v.checked = allChecked)
    //修改后的值设置为data缓存中
    this.setCart(cart)
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e){
    const {id,operation} = e.currentTarget.dataset
    //获取购物车数组
    let {cart} = this.data
    //找到需要修改的商品的索引
    let index = cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1 && operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '您是否要删除',
      //   success :(res)=> {
      //     if (res.confirm) {
      //       cart.splice(index,1)
      //       this.setCart(cart)
      //     } else if (res.cancel) {
    
      //     }
      //   }
      // })
      const res =await showModal()
      if (res.confirm) {
        cart.splice(index,1)
        this.setCart(cart)
      } 
    }else{
      cart[index].num+=operation

      this.setCart(cart)
    }
  
  },

  // 结算功能
  async handlePay(){
    const {address,totalNum} = this.data
    if(!address.userName){
     await showToast({title:"您还没有设置收货地址"})
     return
    }
    if(!totalNum){
      await showToast({title:"您还没有添加商品"})
      return
    }
    wx.navigateTo({
      url: '../pay/index',
    })
  }


})