/* 对话框组件
=================================================== */

import './dialog.scss'
import initDialog1 from './rule'

var $ = require('jquery')

class Dialog {
  opt = null
  container = null
  init (opt = {}) {
    if (!$('.dialog-overlay').length) {
      $('body').append(require('./dialog.art')())
      this.initEventListener()
    }
    this.container = $('.dialog-overlay')
    this.useDialog(1, opt)
  }
  initEventListener () {
    $('.dialog-overlay').on('click', () => {
      this.hide()
    })
  }
  useDialog (type, opt) {
    this.opt = opt
    if (type === 1) {
      initDialog1(this)
      this.setScrollable(true)
    }
  }
  setScrollable (flag) {
    $('.dialog-overlay').off('touchmove')
    if (!flag) {
      $('.dialog-overlay').on('touchmove', function (e) {
        e.preventDefault()
      })
    }
  }
  toggle () {
    if ($('.dialog-overlay').css('display') === 'none') $('.dialog-overlay').show()
    else $('.dialog-overlay').hide()
  }
  show () {
    if ($('.dialog-overlay').css('display') === 'none') $('.dialog-overlay').show()
  }
  hide () {
    if ($('.dialog-overlay').css('display') !== 'none') $('.dialog-overlay').hide()
  }
}

export default Dialog
