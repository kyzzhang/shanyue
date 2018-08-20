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
    ctx.font = "10px Courier New"
    ctx.setFontSize(28)
    this.setData({
      title: options.title,
      id: options.id,
      bookDetails: app.getOneBook(options.id),
    })
    var FileSystemManager = wx.getFileSystemManager()
    FileSystemManager.readFile({
      filePath: `././books/${options.title}.txt`,
      encoding: 'utf8',
      success: function (res) {
        text = res.data
        text = text.split(' ')
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })
  },
  render_word: function (pos) {
    var that = this
    var timer = this.timer
    var word = text[pos]

    ctx.setTextAlign('center')
    var focus_letter = ""
    var letter_pos = 0
    var detfact1 = 0
    var detfact2 = 0
    var length = word.length
    switch (length !== 0){ 
    case (length <= 1):
        focus_letter = word[0]
        letter_pos = 0
      break;
    case (length <= 5):
        focus_letter = word[1]
        letter_pos = 1
        detfact1 = length - 3
        detfact2 = 3-length
        if (detfact1 < 0) detfact1 = 0
        if (detfact2 < 0) detfact2 = 0
        word = " ".repeat(detfact1) + word.substring(0, letter_pos) + " " + word.substring(letter_pos + 1)+" ".repeat(detfact2)
      break;
    case (length <= 9):
        focus_letter = word[2]
        letter_pos = 2
        detfact1 = length - 5
        detfact2 = 6 - length
        if (detfact1 < 0) detfact1 = 0
        if (detfact2 < 0) detfact2 = 0
        word = " ".repeat(detfact1) + word.substring(0, letter_pos) + " " + word.substring(letter_pos + 1) + " ".repeat(detfact2)
        break;
    case (length <= 13):
        focus_letter = word[3]
        letter_pos = 3
        detfact1 = length - 7
        if (detfact1 < 0) detfact1 = 0
        word = " ".repeat(detfact1) + word.substring(0, letter_pos) + " " + word.substring(letter_pos + 1)
        break;
    default: 
        focus_letter = word[4]
        letter_pos = 4
        detfact1 = length - 9
        if (detfact1 < 0) detfact1 = 0
        word = " ".repeat(detfact1) + word.substring(0,letter_pos)+" " + word.substring(letter_pos + 1)
        break;
    }
    
    ctx.setFillStyle('red')
    ctx.fillText(focus_letter, 175, 110)
    ctx.setFillStyle('black')
    ctx.fillText(word, 175, 110)

    ctx.draw()
    var read_speed = this.data.read_speed
    if (word.endsWith(".")) {
      timer.set_interval(60000 / (that.data.reading_speed / 2))
      pos++
      i = pos
      that.setData({
        progress: Math.round((i / text.length) * 100),
        last_sent: pos,
      })
    }
    else if (word.endsWith(";") || word.endsWith(",")) {
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
      key: 'reading_pos' + this.data.id,
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
}
)