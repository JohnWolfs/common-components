/* 微信下载提示
=================================================== */

import './weixin-tips.scss'

var tipsLayer

export function showDownloadTips () {
  if (tipsLayer) tipsLayer.show()
  else {
    var tipsimg = require('./wexin-tips.png')
    var tips = `
      <div class="weixin-tips">
        <img src="${tipsimg}" alt="">
      </div>
    `

    $('body').append(tips)

    tipsLayer = $('.weixin-tips')
    tipsLayer.on('click', function () {
      tipsLayer.hide()
    })
    tipsLayer.on('touchmove', function (e) {
      e.preventDefault()
    })
  }
}
