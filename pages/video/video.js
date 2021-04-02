import request from '../../utils/request'
Page({
  data: {
    videoGroupLists: [],
    navId: '',
    videoLists: [],
    isTriggered: false,
    index: 0
  },
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      })
    }


    this.getVideoGroupListsData()

  },
  // 获取导航标签数据
  async getVideoGroupListsData() {
    let videoGroupListsData = await request('/video/group/list')
    this.setData({
      videoGroupLists: videoGroupListsData.data.slice(0, 14),
      // videoGroupLists: videoGroupListsData.data,
      navId: videoGroupListsData.data[0].id
    })
    this.getVideoList(this.data.navId, 0)
  },
  // 点击切换导航
  changeNav(event) {
    let navId = event.currentTarget.id
    this.setData({
      navId: navId * 1,
      videoLists: []
    })
    wx.showLoading({
      title: '正在加载'
    });
    // 动态获取当前对应的数据
    this.getVideoList(this.data.navId)
  },
  // 获取视频列表数据
  async getVideoList(navId, offset = 0) {
    let videoListsData = await request('/video/group', { id: navId, offset: offset })


    // let index = 0
    // let viedoList = videoListsData.datas.map(item => {
    //   item.id = index++
    //   return item
    // })
    // console.log(videoListsData);
    // console.log(viedoList);
    this.setData({
      videoLists: videoListsData.datas,
      isTriggered: false
    })
    wx.hideLoading();
  },
  toVideoPlay(event) {
    let videoid = event.currentTarget.dataset.videoid
    wx.navigateTo({
      url: '/pages/videoplay/videoplay?videoId=' + videoid
    })
  },
  handleRefresher() {
    this.getVideoList(this.data.navId)

  },
  handleToLower() {
    let newVideoLists = this.getVideoList(this.data.navId, this.data.index++)
    let videoLists = this.data.videoLists
    videoLists.push(newVideoLists)
    this.setData({
      videoLists
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