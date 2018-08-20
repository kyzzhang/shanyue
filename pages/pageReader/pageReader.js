var app = getApp()
var text = ""
var i = 0
const ctx = wx.createCanvasContext('myCanvas')


Page({
  data: {
    playing: false,
    reading_speed: 250,
    last_sent: 0,
    running: false,
    bookurl: '',
  },

  timer: {
    running: false,
    iv: 350,
    timeout: false,
    cb: function () { },

    start: function (cb, iv) {
      var elm = this;
      clearInterval(this.timeout);
      this.running = true;
      if (cb) this.cb = cb;
      if (iv) this.iv = iv;
      this.timeout = setTimeout(function () { elm.execute(elm) }, this.iv);
    },
    execute: function (e) {
      var that = this
      if (!e.running) return false;
      if (i >= text.length) {
        that.running = false
        return false
      };
      e.cb();
      e.start();
    },
    stop: function () {
      clearInterval(this.timeout);
      this.running = false;
    },
    set_interval: function (iv) {
      clearInterval(this.timeout);
      this.start(false, iv);
    }
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      title: options.title,
      id: options.id,
      bookDetails: app.getOneBook(options.id),
    })
    wx.downloadFile({
      url: `http://192.168.3.18:8000/${encodeURIComponent(options.title)}.txt`,
      success:function(res){
        that.setData({
          bookurl:res.tempFilePath
        })
      },
      fail:function(res){
        console.log(res.errMsg)
      },
      complete:function(){
        var FileSystemManager = wx.getFileSystemManager()
        FileSystemManager.readFile({
          filePath: that.data.bookurl,
          encoding: 'utf8',
          success: function (res) {
            text = res.data
            text = text.split(' ')
          },
          fail: function (res) {
            console.log(res.errMsg)
          },
        })
      }
    })
  },
  render_word: function (pos) {
    ctx.setFontSize(28)
    var that = this
    var timer = this.timer
    var word = text[pos]
    var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

    var pure_word = word.replace(punctRE, '')
    //for (i=0; i<word.length; i++){
    //  if 
    //}
    ctx.setTextAlign('center')
    if (word.length== 1 && pure_word.length >=0){
        ctx.setFillStyle('red')
      ctx.fillText(pure_word, 175, 110)
        ctx.setFillStyle('black')
        var punc = word.replace(pure_word, '　　')
      ctx.fillText(punc, 175, 110)
    } else if (word.length == 2 && pure_word.length >= 1){
        ctx.setFillStyle('red')
      ctx.fillText(pure_word[0], 175, 110)
        ctx.setFillStyle('black')
      var words = word.replace(pure_word[0], '　　')
      ctx.fillText(words, 175, 110)
    } else if (word.length == 3 && pure_word.length >= 2) {
        ctx.setFillStyle('red')
      ctx.fillText(pure_word[1], 175, 110)
        ctx.setFillStyle('black')
      var words = word.replace(pure_word[1], '　')
      ctx.fillText(words, 175, 110)
    } else if (word.length == 4 && pure_word.length >= 3){
        ctx.setFillStyle('red')
      ctx.fillText(pure_word[1], 175, 110)
        ctx.setFillStyle('black')
      var words = word.replace(pure_word[1], '　')
      ctx.fillText('　' + words, 175, 110)
    }
    else if (word.length == 5 && pure_word.length >= 4) {
      ctx.setFillStyle('red')
      ctx.fillText(pure_word[2], 175, 110)
      ctx.setFillStyle('black')
      var words = word.replace(pure_word[2], '　')
      ctx.fillText(words, 175, 110)
    }
      else{
        ctx.setFillStyle('black')
      ctx.fillText(word, 175, 110)
      }

    ctx.draw()
    var read_speed = this.data.read_speed
    if (word.endsWith("。")) {
      timer.set_interval(60000 / (that.data.reading_speed / 2))
      pos++
      i = pos
      that.setData({
        progress: Math.round((i / text.length) * 100),
        last_sent: pos,
      })
    }
    else if (word.endsWith("；")|| word.endsWith("，") || word.endsWith("、")){
      timer.set_interval(60000 / (that.data.reading_speed / 2))
      pos++
      i = pos
      that.setData({
        progress: Math.round((i / text.length) * 100),
      })
    } else {
      pos++
      timer.set_interval(60000 / (that.data.reading_speed))
      i = pos
      that.setData({
        progress: Math.round((i / text.length) * 100),
      })
    }
  },
  play: function (event) {
    var timer = this.timer
    var that = this
    this.setData({
      playing: true
    })
    this.timer.start(function () {
      that.render_word(i);
    }, 60000 / that.data.reading_speed)
  },

  prev: function (event) {
    var that = this
    this.timer.stop()
    i = that.data.last_sent
    this.setData({
    })
    this.timer.start(function () {
      that.render_word(i);
    }, 60000 / that.data.reading_speed)
    this.setData({
      playing: true
    })
  },
  restart: function (event) {
    i = 0
    this.setData({
      playing: false
    })
    this.render_word(i)
    i = 0
    this.timer.stop()
  },

  pause: function (event) {
    this.timer.stop()
    this.setData({
      playing: false
    })
  },
  speed_up: function (event) {
    var that = this
    this.setData({
      reading_speed: that.data.reading_speed + 50
    })
    this.timer.set_interval(60000 / this.data.reading_speed)
  },
  slow_down: function (event) {
    var that = this
    this.setData({
      reading_speed: that.data.reading_speed - 50
    })
    this.timer.set_interval(60000 / this.data.reading_speed)
  },

  onReady: function () {
  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'reading_pos'+this.data.id,
      success: function (res) {
        i = parseInt(res.data)
      },
    })
  },


  onHide: function () {

  },
  onUnload: function () {
    var that = this
    this.timer.stop()

    this.setData({
      playing: false
    })
    wx.setStorage({
      key: 'reading_pos' + this.data.id,
      data: i,
    })
  }
})