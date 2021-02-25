// miniprogram/pages/user/user.js
const app  = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:'../../images/user/user-unlogin.png',
    nickName:"",
    logged:false,
    disabled:true
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
    wx.cloud.callFunction({
      name:'login',
      data:{}
    }).then(res=>{
      console.log(res);
      db.collection('users').where({
        _openid:res.result.openid
      }).get().then(res=>{
        if(res.data.length){
          app.userinfo = Object.assign( app.userinfo, res.data[0])
          this.setData({
            userPhoto:app.userinfo.userPhoto,
            nickName:app.userinfo.nickName,
            logged:true
          })
        }else{
          this.setData({
            disabled:false
          })
        }

      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userPhoto:app.userinfo.userPhoto,
      nickName:app.userinfo.nickName,
    })
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

  bindGetUserInfo(e){
    console.log(e);
    let userinfo = e.detail.userInfo
    if(!this.data.logged && userinfo){
      db.collection('users').add({
        data:{
          userPhoto:userinfo.avatarUrl,
          nickName :userinfo.nickName ,
          signature:'',
          phoneNumber:'',
          weixinNumber:'',
          links:0,
          time:new Date(),
          isLocation:true
        }
      }).then((res)=>{
          console.log(res);
          db.collection('users').doc(res._id).get().then((res)=>{
            console.log(res.data);
            app.userinfo = Object.assign(app.userinfo,res.data)
            this.setData({
              userPhoto:app.userinfo.userPhoto,
              nickName:app.userinfo.nickName,
              logged:true
            })
          })
      })
    }
  }
})