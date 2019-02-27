/* 无限循环列表
=================================================== */

import './foreverscroll.scss'

class ForeverScroll {
  container = null
  _stid = ''
  _top = 0
  _template = 'foreverscroll'
  constructor (container) {
    this.container = container
  }
  init (arr, template) {
    arr = arr.concat(arr)
    if (template) this._template = template
    this.container.html(require('./' + this._template + '.art')({data: arr}))
  }
  startScroll () {
    var ul = this.container.find('.foreverscroll ul')
    var height = ul.height() / 2
    this._stid = setInterval(() => {
      if (this._top > height) this._top = 0
      ul.css('transform', 'translateY(' + (-1 * this._top++) + 'px)')
    }, 50)
  }
}

export default ForeverScroll
