// pages/auth/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment, login } from "../../utils/asyncwx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  async handleGetUserInfo(e) {
    //获取用户信息
    console.log(e);
    
    const { encryptedData, rawData, iv, signature } = e.detail;
    //获取小程序登录成功后的code
    const { code } = await login()
    console.log(code);
    
    const loginParams = {encryptedData, rawData, iv, signature,code}
    const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    console.log(res);
    
  }
})