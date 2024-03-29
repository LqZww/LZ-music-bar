import request from '../../utils/request'

Page({
  data: {
    playVideoList: [],
    currentWidth: 0,
    videoDetailInfoData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.playVideo(options.videoId)
    this.getVideoDetailInfo(options.videoId)
  },
  async playVideo(id) {
    let playVideoData = await request('/video/url', { id: id })
    this.setData({
      playVideoList: playVideoData.urls[0]
    })
  },
  async getVideoDetailInfo(vid) {
    let videoDetailInfoData = await request('/video/detail/info', { vid: vid })
    this.setData({
      videoDetailInfoData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let videoContext = wx.createVideoContext('video', this);
    console.log(videoContext);
  },
  getTime(event) {
    let currentTime = event.detail.currentTime
    this.setData({
      currentWidth: currentTime
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

  }
})