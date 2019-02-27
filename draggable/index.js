var startX, startY, left, top
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
var fanliWidth = $('.btn-fanli').width()
var fanliHeight = $('.btn-fanli').height()
var startTime

function init (ele, option) {
    $(ele).on('touchstart', function (e) {
        e.preventDefault()
        startX = e.originalEvent.targetTouches[0].clientX
        startY = e.originalEvent.targetTouches[0].clientY
        left = parseInt($(this).css('left'))
        top = parseInt($(this).css('top'))

         // 记录下触发的坐标和时间
        startTime = (new Date()).getTime()

        $(this).on('touchmove', function (e) {
            var disX = -1 * (e.originalEvent.targetTouches[0].clientX - startX)
            var disY = -1 * (e.originalEvent.targetTouches[0].clientY - startY)
            var targetX = parseInt(left - disX)
            var targetY = parseInt(top - disY)

            if (targetX < 0) targetX = 0
            if (targetY < 0) targetY = 0
            if (targetX > pageWidth - fanliWidth) targetX = pageWidth - fanliWidth
            if (targetY > pageHeight - fanliHeight) targetY = pageHeight - fanliHeight
            $(this).css('left', targetX + 'px')
            $(this).css('top', targetY + 'px')
        })
        $(this).on('touchend', function (e) {
            e.preventDefault()
            var now = (new Date()).getTime()
            // 小于300ms可以识别为点击事件的范围 然后判断触摸点的移动距离
            if (now - startTime < 300) {
              var x = (Math.abs(startX - e.originalEvent.changedTouches[0].clientX) < 30)
              var y = (Math.abs(startY - e.originalEvent.changedTouches[0].clientY) < 30)
              if (x && y) {
                  e.originalEvent.changedTouches[0].target.click();
              }
            }
            $(this).off('touchmove')
            $(this).off('touchend')
        })
    })
}

export default {
    init: init
}
