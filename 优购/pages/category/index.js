// pages/category/index.js
//Page Object
import {request} from "../../request/index.js"
import  regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   *
  data: {
    leftCateGoryList:[],
    rightCateGoryList:[],
	currentaActive:0,
	srcollTop:0

  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
	// 先判断本地存储中有没有新的数据
	const Cates = wx.getStorageSync("cates")
	//本地存储不存在数据 发送数据请求
	if(!Cates){
		this.getcateGoryListData()
	}else{
		if(Date.now()-Cates.time>1000*10){
			this.getcateGoryListData()
		}else{
			console.log("可以用旧数据")
			this.Cates = Cates.data
			let leftCateGoryList = this.Cates.map(v=>v.cat_name)
			let rightCateGoryList = this.Cates[0].children
			this.setData({
				leftCateGoryList,
				rightCateGoryList
			})
		}
	}
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
  async getcateGoryListData(){
	  // request({url:"/categories"}).then(res=>{
		 //  console.log(res)
		 //  this.Cates= res.data.message
		 //  //把数据存入本地存储中
		 //  wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
		 //  let leftCateGoryList = this.Cates.map(v=>v.cat_name)
		 //  let rightCateGoryList = this.Cates[0].children
		 //  this.setData({
			//   leftCateGoryList,
			//   rightCateGoryList
		 //  })
	  // })
	 const res  = await request({url:"/categories"})
	  this.Cates= res
	  //把数据存入本地存储中
	  wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
	  let leftCateGoryList = this.Cates.map(v=>v.cat_name)
	  let rightCateGoryList = this.Cates[0].children
	  this.setData({
	 			  leftCateGoryList,
	 			  rightCateGoryList
	  })
  },
  // 左侧菜单点击事件
  handleItemTap(e){
	  console.log(e)
	  const {index} = e.currentTarget.dataset
		
	  let rightCateGoryList = this.Cates[index].children
	  this.setData({
	  		 currentaActive:index,
	  		 rightCateGoryList,
			 srcollTop:0
	  })
	  
  }
})