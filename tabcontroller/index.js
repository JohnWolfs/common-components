/**
 * USE
 * var tabController = new TabController()
 * tabController.init($('.tab-controller'))
 */

require('./index.scss')

var $ = require('jquery')

function TabController () {

}

/** tab选择方法 */
var select = function (index, ele, $tabContainer, $contentContainer, opt) {
  $tabContainer.find('.tab-controller__tab_active').removeClass('tab-controller__tab_active')
  $(ele).addClass('tab-controller__tab_active')

  /** 滑动切换tab */
  if (opt && opt.tabSlide) {
    var tabs = $tabContainer.find('.tab-controller__tab')
    var transformLeft = 0
    var marginLeft = 0
    for (var k = 0; k < tabs.length; k++) {
      if ($(tabs[k]).hasClass('tab-controller__tab_active')) {
        $tabContainer.find('.tab-controller__selected').css('width', $(tabs[k]).innerWidth() + 'px').css('height', $(tabs[k]).innerHeight() + 'px')
        marginLeft = parseInt($(tabs[k]).css('margin-left'))
        break
      }

      transformLeft += $(tabs[k]).outerWidth(true)
    }
    $tabContainer.find('.tab-controller__selected').stop().animate({
      'left': transformLeft + marginLeft + 'px'
    }, opt.tabSlide.duration || 300)
  }

  $contentContainer.find('.tab-controller__content_active').removeClass('tab-controller__content_active')
  $contentContainer.find('.tab-controller__content').each(function (i, e) {
    if (i === index) {
      $(e).addClass('tab-controller__content_active')
    }
  })
}

TabController.prototype.init = function ($container, opt) {
  var _this = this
  this.container = $container
  this.opt = opt
  var $tabContainer = $container.find('.tab-controller__tab-container')
  var $contentContainer = $container.find('.tab-controller__content-container')

  if (opt && opt.tabSlide) $tabContainer.append('<div class="tab-controller__selected"></div>')

  $tabContainer.find('.tab-controller__tab').each(function (index, ele) {
    $(this).on('click', function () {
      select(index, ele, $tabContainer, $contentContainer, opt)
      _this.onTabChange(index, ele, $contentContainer.find('.tab-controller__content_active'))
    })
    if (opt && opt.hoverSelect) {
      $(this).hover(function () {
        select(index, ele, $tabContainer, $contentContainer, opt)
        _this.onTabChange(index, ele, $contentContainer.find('.tab-controller__content_active'))
      }, function () {})
    }
  })
}

TabController.prototype.selectTab = function (i) {
  var $tabContainer = this.container.find('.tab-controller__tab-container')
  var $contentContainer = this.container.find('.tab-controller__content-container')
  var tabEle = $tabContainer.find('.tab-controller__tab').eq(i)
  select(i, tabEle, $tabContainer, $contentContainer, this.opt)
  this.onTabChange(i, tabEle, $contentContainer.find('.tab-controller__content_active'))
}

TabController.prototype.onTabChange = function (index, ele, content) {
}

TabController.prototype.setOnTabChange = function (func) {
  this.onTabChange = func
}

module.exports = TabController
