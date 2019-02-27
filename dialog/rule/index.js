import './dialog.scss'

export default function (context) {
  context.container.html(require('./dialog.art')(context.opt))
  context.container.find('.dialog__content').on('click', function (e) {
    e.stopPropagation()
  })
  context.container.find('.btn-close').on('click', () => {
    context.hide()
  })
}
