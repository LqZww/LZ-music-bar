import request from '../../utils/request.js'

Page({
  data: {
    picLists: [],
    balls: [],
    songLists: [],
    topLists: []
  },
  onLoad: async function (options) {
    // 轮播图
    let picListsData = await request('/banner', { type: 1 })
    this.setData({
      picLists: picListsData.banners
    })

    // 导航图标
    let ballsData = await request('/homepage/dragon/ball')
    this.setData({
      balls: ballsData.data
    })

    // 推荐歌单
    let songListsData = await request('/personalized', { limit: 6 })
    this.setData({
      songLists: songListsData.result
    })

    // 排行榜
    let topListsData = await request('/toplist')
    let topListsItem = topListsData.list.slice(0, 5)
    let listId = []
    for (let i = 0; i < 5; i++) {
      listId.push(topListsItem[i].id)
    }
    let index = 0
    let resultArr = []
    while (index < 5) {
      let topListsMusic = await request('/playlist/detail/dynamic', { id: listId[index++] })
      let topListsItemSong = { name: topListsMusic.playlist.name, tracks: topListsMusic.playlist.tracks.slice(0, 3) }
      resultArr.push(topListsItemSong)
      this.setData({
        topLists: resultArr
      })
    }

  },
  toDetail(event) {
    let type = event.currentTarget.dataset.type
    if (type === '每日推荐') {
      wx.navigateTo({
        url: '/pages/commendSong/commendSong'
      });
    }

  },
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  toSongDetail(event) {
    console.log(event.currentTarget.dataset.id);
    let { id } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId=' + id
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