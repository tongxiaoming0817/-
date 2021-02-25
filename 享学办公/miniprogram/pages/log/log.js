// pages/log/log.js
const  util = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    activeIndex:0,
    dayList:[],
    list:[],
    sum:[
      {
        title:'今日番茄次数',
        val:'0'
      },
      {
        title:'累计番茄次数',
        val:'0'
      },
      {
        title:'今日专注时长',
        val:'0分钟'
      },
      {
        title:'累计专注时长',
        val:'0分钟'
      }
    ],
    iconList:[
      {
        imgUrl:'read',
        text:"阅读"
      },
      {
        imgUrl:'sport',
        text:"运动"
      },
      {
        imgUrl:'study',
        text:"学习"
      },
      {
        imgUrl:'think',
        text:"思考"
      },
      {
        imgUrl:'work',
        text:"工作"
      },
      {
        imgUrl:'write',
        text:"写字"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var logs = wx.getStorageSync('logs') || [];
    var day = 0;
    var total = logs.length;
    var dayTime = 0;
    var totalTime = 0;
    var dayList = [];
    if(logs.length > 0){
      for(var i = 0;i < logs.length;i++){
        if(logs[i].date.substr(0,10) == util.formatTime(new Date).substr(0,10)){
          day = day + 1;
          dayTime = dayTime + parseInt(logs[i].time);
          dayList.push(logs[i]);
          this.setData({
            dayList:dayList,
            list:dayList
          })
        }
        totalTime = totalTime + parseInt(logs[i].time);
      }
      this.setData({
        'sum[0].val':day,
        'sum[1].val':total,
        'sum[2].val':dayTime+'分钟',
        'sum[3].val':totalTime+'分钟'
      })
    }
  },
  changeType:function(e){
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      this.setData({
        list:this.data.dayList
      })
    }else if(index == 1){
      var logs = wx.getStorageSync('logs') || [];
      this.setData({
        list:logs
      })
    }
    this.setData({
      activeIndex:index
    })
  }
})