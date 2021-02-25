import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailsList: {}
  },

  goodSwiperListData: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getDetailListData(goods_id)
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

  },

  /**
   * 获取详情页数据
   */
  async getDetailListData(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } })
    this.goodSwiperListData = res
    console.log(res);
    this.setData({
      goodsDetailsList: {
        pics: res.pics,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
      }
    })
  },
  /**
   * 点击轮播图 方法预览
   */
  handlePrevewImage(e) {
    const urls = this.goodSwiperListData.pics.map(v => v.pics_mid)
    console.log(e);
    const current = e.currentTarget.dataset.image
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  /**
   * 点击加入购物车
   */
  handlCartAdd() {
    //获取缓存中的数组
    let cart = wx.getStorageSync('cart') || []
    //判断商品对象是否存在中购物车数组中
    let index = cart.findIndex(v=> v.goods_id === this.goodSwiperListData.goods_id)
    console.log(index);
    
    if(index===-1){
      //不存在
      this.goodSwiperListData.num=1
      this.goodSwiperListData.checked=true
      cart.push(this.goodSwiperListData)
    }else{
      cart[index].num++
    }

    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加成功',
      icon:"success",
      mask:true
    })
  }
})