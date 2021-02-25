// pages/goods_list/index.js
import {request} from "../../request/index.js"
import  regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
		tabs:[
			{
				id:0,
				value:"综合",
				isActive:true
			},
			{
				id:1,
				value:"销量",
				isActive:false
			},
			{
				id:2,
				value:"价格",
				isActive:false
			}
    ],
    goodListData:[]
  },

  //接口需要的参数
    QueryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },

    //总页数
    totalPages:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodListData()
  console.log(options)
    this.QueryParams.cid = options.cid
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

  //
  handlbindTabsItemChang(e){
    console.log(e);
    const index = e.detail
    const {tabs} = this.data
    tabs.forEach((v,i)=>{
      if(i===index){
        v.isActive= true
      }else{
        v.isActive= false
      }
      this.setData({
        tabs
      })
    })

  },

  //获取数据
  async getGoodListData(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    console.log(res);
    const total = res.total
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPages);
    this.setData({
      goodListData:res.goods,
      goodListData:[...this.data.goodListData,...res.goods]
    })
    wx.stopPullDownRefresh()
  },
  //
  //用户上滑触底 加载下一页数据
  //找到触底条件
  //有没有下一页图片
  //还有下一页数据
  onReachBottom(e){
    console.log('触底');
    // 1.判断还有没有下一页数据
    if(this.QueryParams.pagenum> this.totalPages ){
      // console.log("没有更多数据了")
      wx.showToast({
        title: '没有更多数据了',
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodListData()
    }
  },

  //下拉刷新页面
  onPullDownRefresh(){
    // console.log("下拉");
    //重置数组
    this.setData({
      goodListData:[]
    })
    //重置页码
    this.QueryParams.pagenum=
    //发送请求
    this.getGoodListData()
  }
})