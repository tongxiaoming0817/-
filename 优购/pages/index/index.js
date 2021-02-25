//Page Object
import {request} from "../../request/index.js"
Page({
  data: {
    swiperList:[],
	cateList:[],
	fooerList:[]
  },
  //options(Object)
  onLoad: function(options){
	 this.getSwiperListData()
	 this.getCateListData()
	 this.getFooerListData()
    //发送数据请求数据 轮播图
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata", //仅为示例，并非真实的接口地址
    //   // header: {
    //   //   'content-type': 'application/json' // 默认值
    //   // },
    //   success: (res)=> {
    //     console.log(res.data)
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })



  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  },
  
  //获取轮播图数据
  getSwiperListData(){
	 request({url: "/home/swiperdata"}).then(res=>{
	 	console.log(res)
	 	this.setData({
	 	    swiperList:res
	 	 })
	 }) 
  },
  //获取首页分类数据
  getCateListData(){
	  request({url: "/home/catitems"}).then(res=>{
	  	console.log(res)
	  	this.setData({
	  	    cateList:res
	  	 })
	  }) 
  },
  //获取楼层数据
  getFooerListData(){
	  request({url: "/home/floordata"}).then(res=>{
	  	console.log(res)
	  	this.setData({
	  	    fooerList:res
	  	 })
	  }) 
  }
});