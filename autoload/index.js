import './index.scss'

class Autoload {
  $el = null
  page = 1
  getData = null
  dataProcessor = null
  templateName = null
  beforeRequest = null
  scrollLoad = true
  loading = false
  init(opt) {
    this.$el = opt.el || $('.autoload')
    this.getData = opt.getData || new Function ()
    this.dataProcessor = opt.dataProcessor || new Function ()
    this.beforeRequest = opt.beforeRequest || new Function ()
    this.scrollLoad = opt.scrollLoad || true
    this.templateName = opt.templateName || 'indexlist'
    this.template = require('./' + this.templateName + '.art')
    this.initScrollListener()
  }
  load() {
    this.showLoading()
    this.beforeRequest()
    this.getData(this.page, (data) => {
      this.hideLoading()
      this.dataProcessor(data)

      if (data.length) {
        this.page++
        this.append(data)
      }
    })
  }
  initScrollListener() {
    if (this.scrollLoad) {
      $(document).on('scroll', (e) => {
        if (!this.loading && $(document).scrollTop() + $(window).height() >= $(document).height()) {
          this.load()
        }
      })
    }
  }
  setDataFunc(func) {
    this.getData = func
    this.page = 1
  }
  refresh() {
    this.page = 1
    this.clearData()
    this.showLoading()
    this.beforeRequest()
    this.getData(this.page, (data) => {
      this.hideLoading()
      this.dataProcessor(data)

      if (!data.length) {
        this.showEmptyTips()
      } else {
        this.render(data)
      }
    })
  }
  render(data) {
    this.$el.html(this.template({data: data}))
  }
  append(data) {
    this.$el.append(this.template({data: data}))
  }
  showLoading() {
    this.loading = true
    if (!this.$el.find('.autoload__loading').length) {
      this.$el.append('<div class="autoload__loading">加载中</div>')
    }
  }
  hideLoading() {
    this.loading = false
    this.$el.find('.autoload__loading').remove()
  }
  showEmptyTips() {
    if (!this.$el.find('.autoload__empty').length) {
      this.$el.html('<div class="autoload__empty">暂无数据</div>')
    }
  }
  hideEmptyTips() {
    this.$el.find('.autoload__empty').remove()
  }
  clearData() {
    this.$el.html('')
  }
}

export default Autoload
