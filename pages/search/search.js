import request from "../../utils/request"
let isSend = false //搜索框函数节流
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent: "", //placeholder的内容
    hotList: [], //热搜榜的数据
    searchContent: "", //搜索框的内容
    searchList: [], //模糊搜索获取的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInitData()
  },
  //获取初始化数据的函数
  async getInitData() {
    let placeholderContent = await request("/search/default")
    let hotListData = await request("/search/hot/detail")
    this.setData({
      placeholderContent: placeholderContent.data.showKeyword,
      hotList: hotListData.data
    })
  },

  //发送请求关键字获取模糊匹配数据
  handleInputChange(event) {
    this.setData({
      searchContent: event.detail.value.trim()
    })
    if (isSend) {
      return
    }
    isSend = true
    //获取模糊匹配的数据
    this.getSearchList()
    setTimeout(async () => {
      isSend = false
    }, 300);
  },
  //获取模糊匹配的数据的功能函数
  async getSearchList() {
    let searchListData = await request("/search", {
      keywords: this.data.searchContent,
      limit: 10
    })
    this.setData({
      searchList: searchListData.result.songs
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})