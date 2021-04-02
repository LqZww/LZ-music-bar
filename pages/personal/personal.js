import request from "../../utils/request";

let startY = 0;
let moveY = 0;
let moveDistance = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: {}
  },

  onLoad: function (options) {
    // 读取用户信息
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    // console.log(userInfo);
  },
  handleTouchStart(event) {
    this.setData({
      coverTransition: ''
    })
    startY = event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    if (moveDistance <= 0) {
      return;
    }
    if (moveDistance >= 80) {
      moveDistance = 80;
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(event) {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: 'transform .8s linear'
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
    // if (!userInfo) {
    //   wx.navigateTo({
    //     url: '/pages/login/login'
    //   })
    // }
  },
  toRecentPlay() {
    wx.navigateTo({
      url: '/pages/recentplay/recentplay?userId=' + this.data.userInfo.userId
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

  }
})