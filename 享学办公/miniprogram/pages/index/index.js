//index.js
const app = getApp()
const  util = require('../../utils/utils.js');
Page({
  data: {
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
    slidertime:"1",
    activeIndex:0,
    clockShow:false,
    clockHeight:0,
    rate:0,
    mTime:300000,
    timeStr:"",
    btnPauseShow:true,
    btnBackShow:false,
    btnOinUpShow:false,
    timeid:null
  },

  onLoad: function() {
    var res= wx.getSystemInfoSync()
    var rate = 750 / res.windowWidth
    console.log(rate);
    
    this.setData({
      rate:rate,
      clockHeight:rate*res.windowHeight
    }),
    this.drawBg()
    // this.drawActive()

  },
  sliderChange(e){
    let time = e.detail.value
    this.setData({
      slidertime:time
    })
  },
  bindChang(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex:index
    })
  },
  btnstart(){
   var timeName =  this.data.slidertime>10? this.data.slidertime+":00":"0"+this.data.slidertime+":00"
   console.log(timeName);
   
    this.setData({
      clockShow:true,
      mTime:this.data.slidertime*60 *1000,
      timeStr:timeName
    }),
        this.drawBg()
    this.drawActive()
  },
  drawBg(){
    var lineWidth = 6 / this.data.rate;//px
    console.log(lineWidth);
    var ctx = wx.createCanvasContext('progress_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#000000');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,false);
    ctx.stroke();
    ctx.draw();
  },
  drawActive(){
    var _this = this
     var timeid  = _this.data.timeid
    // console.log(timeid);
    
    timeid= setInterval(function(){
      var angle = 1.5 + 2*(_this.data.slidertime*60*1000 - _this.data.mTime)/
      (_this.data.slidertime*60*1000);
      var currentTime = _this.data.mTime-100
      _this.setData({
        mTime:currentTime
      })
      if(angle<3.5){
        if(currentTime % 1000 == 0){
          var timeStr1 = currentTime / 1000;// s
          var timeStr2 = parseInt(timeStr1 / 60);// m
          var timeStr3 = (timeStr1 - timeStr2*60) >= 10 ? (timeStr1 - timeStr2*60) :
          '0'+(timeStr1 - timeStr2*60);
          var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0'+timeStr2;
          console.log(timeStr2+timeStr3);
          
          _this.setData({
            timeStr:timeStr2+':'+timeStr3
          })
        }
        var lineWidth = 6 / _this.data.rate;//px
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ffffff');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400/_this.data.rate/2,400/_this.data.rate/2,400/_this.data.rate/2-2*lineWidth,1.5*Math.PI,angle*Math.PI,false);
        ctx.stroke();
        ctx.draw();
      }else{
        var logs = wx.getStorageSync("logs")|| []
        logs.unshift({
          date:util.formatTime(new Date),
          cate:_this.data.activeIndex,
          time:_this.data.slidertime
        })
        wx.setStorageSync('logs', logs)
        // console.log(timeid);
        _this.setData({
          timeStr:'00:00',
          btnPauseShow:false,
          btnBackShow:true,
          btnOinUpShow:false,
        })
        clearInterval(timeid)
      }
    },100)
    _this.setData({
      timeid:timeid
    })
  },
  btnPause(){
    clearInterval(this.data.timeid)
    this.setData({
      btnPauseShow:false,
      btnBackShow:false,
      btnOinUpShow:true,
    })
  },
  btnOin(){
    this.drawActive()
    this.setData({
      btnPauseShow:true,
      btnBackShow:false,
      btnOinUpShow:false,
    })
  },
  btnUp(){
    clearInterval(this.data.timeid)
    this.setData({
      btnPauseShow:true,
      btnBackShow:false,
      btnOinUpShow:false,
      clockShow:false
    })
  },
  btnBack(){
    clearInterval(this.data.timeid)
    this.setData({
      btnPauseShow:true,
      btnBackShow:false,
      btnOinUpShow:false,
      clockShow:false
    })
  }
})
