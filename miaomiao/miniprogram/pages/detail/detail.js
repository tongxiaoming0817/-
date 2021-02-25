const app  = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    isfriend:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      let userid = options.userid
      db.collection('users').doc(userid).get().then(res=>{
          this.setData({
            detail:res.data
          })
      })
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

  handleaddfriend(){
    if(app.userinfo._id){
      db.collection('message').where({
        userid:this.data.detail._id
      }).get().then(res=>{
        if(res.data.length){
          if( res.data[0].list.includes(app.userinfo._id)){
              wx.showToast({
                title: '已经申请',
              })
           }else{
             wx.cloud.callFunction({
               name:'update',
               data:{
                 collection:'message',
                 where:{
                   userid:this.data.detail._id
                 },
                 data:`{list:_.unshift('${app.userinfo._id}')}`
               }
             }).then(res=>{
               wx.showToast({
                 title: '申请成功~',
               })
             })
           }
        }else{
          db.collection('message').add({
            data:{
              userid:this.data.detail._id,
              list:[app.userinfo._id]
            }
          }).then(res=>{
            wx.showToast({
              title: '申请成功',
            })
          })
        }
      })
    }else{
      wx.showToast({
        title: '请先登录',
        duration:2000,
        icon:"none",
        success:()=>{
          setTimeout(() => {
            wx.switchTab({
              url: '../user/user',
            })
          }, 2000);
        }
      })
    }
  }
})