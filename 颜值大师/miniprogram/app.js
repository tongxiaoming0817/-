//app.js
App({
  globalData:{
    access_token:""
  },
  onLaunch: function () {
    wx.request({
      method:'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=aGf4hH1m2LZQ3zCM512898Tg&client_secret=5ia67xt0ZvQd9IrRbYxlAhNMlckWkqeD',
      success:(res)=>{
          console.log( res.data.access_token);
          this.globalData.access_token = res.data.access_token
      },
      fail:()=>{
        console.log("没有access_token");
        
      }
    })
  }
})
