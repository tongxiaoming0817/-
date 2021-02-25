// miniprogram/pages/index/index.js
const app  = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d158f243b54d5ec68dd2ac72bd24555d.jpg?w=632&h=340', 
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/fbff319c7dd00e75c9758acf248d3784.jpg?w=632&h=340', 
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/816a66edef10673b4768128b41804cae.jpg?w=632&h=340'
  ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    listdata:[],
    current:'links'
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
    db.collection('users').field({
      userPhoto:true,
      nickName:true,
      links:true
    }).get().then((res)=>{
      console.log(res);
      this.setData({
        listdata:res.data
      })
    })
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
  handlinks(e){
    console.log(e);
    
    let id = e.target.dataset.id
    wx.cloud.callFunction({
      name:'update',
      data:{
        collection:'users',
        doc:id,
        data:'{links:_.inc(1)}'
      }
    }).then((res)=>{
      console.log(res);
      let  updated  = res.result.stats.updated
      if(updated){
        let clonelistdata = [...this.data.listdata]
        for(let i= 0;i<clonelistdata.length;i++){
          if(clonelistdata[i]._id ==id){
            clonelistdata[i].links++;
          }
        }
        this.setData({
          listdata : clonelistdata
        })
      }
    })

  },

  handlecurrent(e){
    console.log(e);
    
    let current = e.target.dataset.current
    if(current == this.data.current){
      return false
    }
    this.setData({
      current:current
    })
  },
  handetail(e){
    let id = e.target.dataset.id
    wx.navigateTo({
      url: '../../pages/detail/detail?userid='+ id,
    })
  }
})