import PubSub from 'pubsub-js';
import moment from 'moment';
import request from '../../utils/request';

const appInstance = getApp()
Page({
  data: {
    isPlay: false,
    song: {},
    musicId: '',
    musicLink: '',
    currentTime: '00:00',
    durationTime: '00:00',
    currentWidth: 0
  },
  onLoad: function (options) {
    let musicId = options.musicId
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId)

    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
      this.setData({
        isPlay: true
      })
    }

    this.backAudioManager = wx.getBackgroundAudioManager();
    this.backAudioManager.onPlay(() => {
      this.changePlayState(true)
      appInstance.globalData.musicId = musicId
    })
    this.backAudioManager.onPause(() => {
      this.changePlayState(false)
    })
    this.backAudioManager.onStop(() => {
      this.changePlayState(false)
    })
    // 自然结束后自动切歌
    this.backAudioManager.onEnded(() => {
      PubSub.publish('switchType', 'next')
      this.setData({
        currentWidth: 0,
        currentTime: '00:00'
      })
    })

    // 音乐播放进度
    this.backAudioManager.onTimeUpdate(() => {
      let currentTime = moment(this.backAudioManager.currentTime * 1000).format('mm:ss')
      let currentWidth = this.backAudioManager.currentTime / this.backAudioManager.duration * 520
      this.setData({
        currentTime,
        currentWidth
      })
    })
  },
  changePlayState(isPlay) {
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay
  },

  handleMusicPlay() {
    let isPlay = !this.data.isPlay
    // this.setData({
    //   isPlay
    // })
    let { musicId, musicLink } = this.data
    this.musicControl(isPlay, musicId, musicLink)
  },
  async getMusicInfo(musicId) {
    let songData = await request('/song/detail', { ids: musicId })

    let durationTime = moment(songData.songs[0].dt).format('mm:ss')

    this.setData({
      song: songData.songs[0],
      durationTime
    })
    wx.setNavigationBarTitle({
      title: this.data.song.name
    });
  },
  async musicControl(isPlay, musicId, musicLink) {
    if (isPlay) {
      if (!musicLink) {
        let musicLinkData = await request('/song/url', { id: musicId })
        musicLink = musicLinkData.data[0].url
        this.setData({
          musicLink
        })
      }

      this.backAudioManager.src = musicLink
      this.backAudioManager.title = this.data.song.name
    } else {
      this.backAudioManager.pause()
    }
  },
  // 切歌
  handleSwitch(event) {
    let type = event.currentTarget.id

    this.backAudioManager.stop()

    PubSub.subscribe('musicId', (msg, musicId) => {
      this.getMusicInfo(musicId)
      this.musicControl(true, musicId)

      // 取消订阅
      PubSub.unsubscribe('musicId')
    })
    // 发布消息
    PubSub.publish('switchType', type)
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