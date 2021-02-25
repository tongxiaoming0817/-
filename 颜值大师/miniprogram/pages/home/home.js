// pages/home/home.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh:0,
    // 摄像头朝向
    position:"back",
    src:'',
    ishowPic:false,
    faceInfo:null,
    map: {
      gender:{
        male:'男',
        female:'女'
      },
      expression:{
        none:'不笑',
        smile:'微笑',
        laugh:'大笑'
      },
      glasses:{
        none:'无眼镜',
        common:'普通眼镜',
        sun:'墨镜'
      },
      emotion:{
        angry:'愤怒',
        disgust:'厌恶',
        fear:'恐惧',
        happy:'高兴',
        sad:'伤心',
        surprise:'惊讶',
        neutral:'无表情',
        pouty: '撅嘴',
        grimace:'鬼脸'
      }
    },
    isShowBox:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const sysInfo =  wx.getSystemInfoSync()
   this.setData({
     wh:sysInfo.windowHeight
   })
  },
  //点击切换摄像头朝向
  reverseCamera(){
    const newposition = this.data.position==='front'? "back":"front"
    this.setData({
      position:newposition
    })
  },
  //拍照
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        // console.log(res.tempImagePath,);
        this.setData({
          src: res.tempImagePath,
          ishowPic:true
        },()=>{
          this.getFaceInfo()
        })
      },
      fail:()=>{
        this.setData({
          src:""
        })
      }
    })
  },
  choosePhoto(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success:(res)=>{
        // console.log(res);
        if(res.tempFilePaths.length>0){
          this.setData({
            src:res.tempFilePaths[0],
            ishowPic:true
          },()=>{
            this.getFaceInfo()
          })
        }
      },
      fail:()=>{
        console.log("选择照片失败");
        this.setData({
          src:""
        })
      }
    })
  },
  reChoose(){
    this.setData({
      src:'',
      ishowPic:false,
      isShowBox:false
    })
  },
  // 测颜值函数
  getFaceInfo(){
    console.log(app);
    
    const token = app.globalData.access_token
    console.log(token);
    
    if(!token){
      return wx.showToast({
        title: '鉴权失败',
      })
    }
    // console.log("调用了颜值函数");
    // console.log(app.globalData);
    const fileManager =   wx.getFileSystemManager()
    const fileStr   = fileManager.readFileSync(this.data.src,'base64')
    // console.log(filabeas);
    wx.request({
      method:'POST',
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token='+token,
      header:{
        "Content-Type":	"application/json"
      },
      data:{
        image_type:"BASE64",
        image:fileStr ,
        face_field:'age,beauty,expression,gender,glasses,emotion'
      },
      success:(res)=>{
        console.log(res);
        if(res.data.result.face_num<=0){
          return  wx.showToast({
            title: '未检测到人脸',
          })
        }
        this.setData({
          faceInfo:res.data.result.face_list[0],
          isShowBox:true
        })
      },
      fail:()=>{
         wx.showToast({
          title: '颜值检测失败',
        })
      }
    })
  }
})