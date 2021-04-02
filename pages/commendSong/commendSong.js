import PubSub from 'pubsub-js';
import request from '../../utils/request'

Page({
  data: {
    day: '',
    month: '',
    commendSongLists: [],
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
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    this.getCommendSongLists()

    // 订阅消息
    PubSub.subscribe('switchType', (msg, type) => {
      let { commendSongLists, index } = this.data
      if (type === 'pre') { // 上一首
        (index === 0) && (index = commendSongLists.length)
        index -= 1
      } else {  // 下一首
        (index === commendSongLists.length - 1) && (index = -1)
        index += 1
      }
      this.setData({
        index
      })

      let musicId = commendSongLists[index].id
      PubSub.publish('musicId', musicId)

    })



  },
  async getCommendSongLists() {
    let commendSongListsData = await request('/recommend/songs')
    this.setData({
      commendSongLists: commendSongListsData.data.dailySongs
    })
  },
  toSongDetail(event) {
    let { song, index } = event.currentTarget.dataset
    this.setData({
      index
    })

    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId=' + song.id
    });
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