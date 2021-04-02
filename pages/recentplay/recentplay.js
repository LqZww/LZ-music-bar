import request from "../../utils/request";
Page({
  data: {
    navBarList: [
      {
        title: '歌曲',
        num: 0
      },
      {
        title: '视频',
        num: 0
      },
      {
        title: '歌单',
        num: 0
      },
      {
        title: '哈哈',
        num: 0
      },
      {
        title: '呵呵',
        num: 0
      },
      {
        title: '拉拉',
        num: 0
      },
      {
        title: '故滚',
        num: 0
      },
      {
        title: 'qq',
        num: 0
      },
      {
        title: '呵呵',
        num: 0
      },
      {
        title: '拉拉',
        num: 0
      },
      {
        title: '故滚',
        num: 0
      },
      {
        title: 'qq',
        num: 0
      }
    ],
    userId: "",
    allSongPlayRecord: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    this.getUserAllSongPlayRecord(this.data.userId)

  },
  // 歌曲播放记录
  async getUserAllSongPlayRecord(userId) {
    let allSongPlayRecordData = await request('/user/record', { uid: userId, type: 0 })
    let index = 0
    let allSongPlayRecord = allSongPlayRecordData.allData.map(item => {
      item.id = index++
      return item
    })
    this.setData({
      allSongPlayRecord
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