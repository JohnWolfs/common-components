
import './toast.scss'

var $ = require('jquery')

class Toast {
  ele = null
  wrapper = null
  template = null
  constructor () {
    if ($('.toast').length === 0) {
      $('body').append('<div class="toast"><div class="toast__wrapper"></div></div>')
    }
    this.ele = $('.toast')
    this.template = require('./toast.art')
    this.wrapper = this.ele.find('.toast__wrapper')
    this.wrapper.on('click', (e) => {
      if (this._loading) return
      this.hide()
    })
  }
  show (text) {
    if (this._loading) {
      this.wrapper.find('.toast__loading').remove()
      this.wrapper.html(this.template({text: text}))
    } else {
      this.wrapper.html(this.template({text: text}))
      this.ele.fadeIn(300)
    }
    this._loading = false

    clearTimeout(this._t)
    this._t = setTimeout(() => {
      this.hide()
    }, 1500)
  }
  showLoading () {
    if (this._loading) return
    this._loading = true
    this.wrapper.append(require('./loading.art')())
    this.ele.fadeIn(300)
  }
  hideLoading () {
    this.hide(() => {
      this.wrapper.find('.toast__loading').remove()
    })
  }
  hide (func) {
    this._loading = false
    this.ele.fadeOut(300, () => {
      if (func) func()
    })
  }
}

export default Toast
