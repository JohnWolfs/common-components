
require('./pause.scss')

var $ = require('jquery')

function Pause () {
  $('body').append('<div class="pause-layer"></div>')
}

Pause.prototype.init = function (endTime, debug) {
  var tParam = getTime(endTime, debug)

  this.pauseTime = new Date(tParam.time).getTime()
  if (tParam.now) this.nowTime = new Date(tParam.now).getTime()
  this.initLoop()
}

Pause.prototype.initLoop = function () {
  var _this = this
  this._t = setInterval(function () {
    _this.checkTimeup()
  }, 1000)
  _this.checkTimeup()
}

Pause.prototype.checkTimeup = function () {
  var now = this.nowTime ? new Date(this.nowTime) : new Date()
  if (now.getTime() >= this.pauseTime) {
    console.log('time up')

    this.stopLoop()
    this.showMsg()
  }
  this.nowTime += 1000
}

Pause.prototype.stopLoop = function () {
  clearInterval(this._t)
}

Pause.prototype.showMsg = function () {
  $('.pause-layer').html(require('./pause.art')()).show()
  $('body').css('height', '100%').css('overflow', 'hidden')
}


/** 设置活动到期时间 */
function getTime (endTime, debug) {
  var endTime, today
  if (debug) {
    endTime = getUrlParam('endtime') || endTime
    endTime = endTime && endTime.replace(/-/g, '/')
    today = getUrlParam('today')
    today = today && today.replace(/-/g, '/')
  } else endTime = endTime
  return {
    time: endTime,
    now: today
  }
}

function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

module.exports = new Pause()
