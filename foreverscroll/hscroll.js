
import './hscroll.scss'

class HScroll {
  container = null
  _stid = ''
  _left = 0
  _template = 'hscroll'
  constructor (container) {
    this.container = container
  }
  init (arr, template) {
    arr = arr.concat(arr)
    if (template) this._template = template
    this.container.html(require('./' + this._template + '.art')({data: arr}))
  }
  startScroll () {
    var ul = this.container.find('.foreverscroll-hscroll ul')
    var width = 0
    this.container.find('.foreverscroll-hscroll ul .foreverscroll__item').each(function (index, ele) {
      width += $(this).outerWidth(true)
    })
    width = width / 2
    this._stid = setInterval(() => {
      if (this._left > width) this._left = 0
      ul.css('transform', 'translateX(' + (-1 * this._left++) + 'px)')
    }, 50)
  }
}

export default HScroll
