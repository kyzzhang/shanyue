var app = getApp();
Page({
  data: {
    indexList:app.getBoookList(),
    //is_chinese:true
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  // Event handler.
  /*to_chinese: function() {
    this.setData({
      is_chinese: true
    })
  },
  to_english: function() {
    this.setData({
      is_chinese: false
    })
  }
  */
})