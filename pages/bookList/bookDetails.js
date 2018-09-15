var app = getApp();
Page({
  data:{
  },
  onLoad: function(options) {
    this.setData({
      title: options.title,
      id:options.id,
      bookDetails:app.getOneBook(options.id),
    })
    if (options.ch === "1") {
      this.setData({
        link: "../pageReader/pageReader"
      })
    } else {
      this.setData({
        link: "../pageReadere/pageReadere"
      })
    }
  }
})