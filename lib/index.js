/**
 * Javascript Library
 * Carousel - v1.0.0 (2019-06-03)
 * -------------------------------------------------------------------------------------------------------------
 * 轮播插件构造函数
 * @param { Object } options
 * eg.
  {
    el: '#banner', // 目标选择器
    width: 375,    // 容器宽度
    scale: 0.25,   // 拖动宽度的比例
    height: 175,   // 容器高度
    delay: 2000,   // 自动轮播的时间间隔
    hideIndex: true, // 是否隐藏下标（true是隐藏，false是显示，默认是false）
    static: false, // 是否进行自动轮播（false是轮播，true是不轮播，默认是false）
    unit: 'rem',   // 适配单位（rem，px等）
    images: [{ href: '#',src: 'images/1.jpg' }] // 轮播图集合
  }
 */
function Carousel(options) {
  // 获取配置参数
  this.$options = options
  // 图片盒子
  this.$swipe = null
  // 图片的长度
  try {
    this.imagesLength = options.images.length
  } catch (error) {
    this.imagesLength = 0
  }
  // 轮播图的下标
  this.index = 1
  // 记录起始  刚刚触摸的点的位置 x的坐标
  this.startX = 0
  // 滑动的时候x的位置
  this.moveX = 0
  // 滑动的距离
  this.distanceX = 0
  // 是否滑动过
  this.isMove = false
  // 单位（rem，px等）
  this.unit = options.unit || 'px'
  // 轮播定时对象
  this.timer = null
  // 初始化方法
  this.init()
}

Carousel.prototype = {
  init() {
    // 渲染模板并绑定事件
    this.render(this.bindEvents.bind(this))
  },
  render(fn) {
    // 获取容器的dom节点
    const banner = document.querySelector(this.$options.el)
    banner.setAttribute('style', `width: ${this.$options.width}${this.unit};position: relative;display: block;overflow: hidden;height: auto;transform: translate3d(0px, 0px, 0px);box-sizing: border-box;`)
    // 创建轮播模板
    const swipe = this.createTemplateCarouselSwipe()
    this.$swipe = swipe
    // 将轮播模板追加到banner容器里
    banner.appendChild(swipe)
    if (!this.$options.hideIndex) {
      // 创建轮播下标模板
      const swipeBtnList = this.createTemplateCarouselSwipeBtnList()
      this.$swipeBtnList = swipeBtnList
      // 设定下标选中样式
      this.setIndexActiveCss(this.index - 1)
      // 将轮播下标模板追加到banner容器里
      banner.appendChild(swipeBtnList)
    }
    // 绑定事件
    fn(swipe)
    if (!this.$options.static) {
      // 开启自动轮播定时器
      this.start()
    }
  },
  /**
   * 实现自动轮播函数
   */
  start() {
    this.timer = setInterval(() => {
      this.index++
      if (this.index > this.imagesLength) {
        this.index = 1
      }
      //  添加过渡样式
      this.addTransition()
      // 定位
      this.setTranslateX(-this.index * this.$options.width)
      // 设定下标选中样式
      this.setIndexActiveCss(this.index - 1)
      //重置参数
      this.startX = 0
      this.moveX = 0
      this.distanceX = 0
      this.isMove = false
    }, this.$options.delay || 2000)
  },
  /**
   * 创建轮播模板
   */
  createTemplateCarouselSwipe() {
    const images = this.$options.images
    const ul = document.createElement('ul')
    ul.setAttribute('style', `transform: translateX(${-this.$options.width}${this.unit});height: ${this.$options.height}${this.unit};position: relative;display: block;margin: 0px;padding: 0px;cursor: inherit;box-sizing: border-box;`)
    const fragment = document.createDocumentFragment()
    // 遍历banner图，创建轮播列表的模板
    if (images && images.length > 0) {
      const list = [images[images.length - 1], ...images, images[0]]
      list.forEach((item, index) => {
        // 创建li 标签
        const li = document.createElement('li')
        li.setAttribute('style', `left: ${index * this.$options.width}${this.unit};width: ${this.$options.width}${this.unit};position: absolute;top: 0px;display: inline-block;list-style-type: none;vertical-align: top;height: 100%;box-sizing: border-box;margin: auto 0px;`)
        // 创建 a 标签
        const a = document.createElement('a')
        a.setAttribute('style', 'display: inline-block;width: 100%;height: 100%;')
        a.setAttribute('href', `${item.href}`)
        // 创建img 标签
        const img = document.createElement('img')
        img.setAttribute('style', 'width: 100%;vertical-align: top;height: 100%;')
        img.setAttribute('src', `${item.src}`)
        // 组装模板
        a.appendChild(img)
        li.appendChild(a)
        fragment.appendChild(li)
      })
    }
    ul.appendChild(fragment)
    return ul
  },
  /**
   * 创建轮播下标模板
   */
  createTemplateCarouselSwipeBtnList() {
    // 获取banner图列表
    const images = this.$options.images
    // 创建轮播下标模板
    const ul = document.createElement('ul')
    ul.setAttribute('style', 'text-align: center;position: absolute;bottom: 0;width: 100%;')
    const fragment = document.createDocumentFragment()
    images &&
      images.length &&
      images.forEach(m => {
        const li = document.createElement('li')
        li.setAttribute('style', 'width: 8px; height: 8px;border-radius: 50%;display: inline-block;margin-left: 6px;background-color: #e1e1e1;')
        fragment.appendChild(li)
      })
    ul.appendChild(fragment)
    return ul
  },
  /**
   * 事件处理工具函数
   * @param { Object } target
   */
  bindEvents(target) {
    // 手指放到屏幕上时触发
    this.addEvent(target, 'touchstart', e => {
      // 清除定时器
      clearInterval(this.timer)
      //记录起始X
      this.startX = e.touches[0].clientX
    })

    // 手指在屏幕上滑动式触发
    this.addEvent(target, 'touchmove', e => {
      // 清除过渡
      this.removeTransition()
      // 滑动时候的X
      this.moveX = e.touches[0].clientX
      // 计算移动的距离
      this.distanceX = this.moveX - this.startX
      // 能拖动的最大距离（右滑）
      if (this.distanceX > this.$options.width) {
        this.distanceX = this.$options.width
      }
      // 能拖动的最大距离（左滑）
      if (this.distanceX < -this.$options.width) {
        this.distanceX = -this.$options.width
      }
      // 实时的定位
      this.setTranslateX(-this.index * this.$options.width + this.distanceX)
      // 证明滑动过
      this.isMove = true
    })

    // 手指离开屏幕时触发
    this.addEvent(target, 'touchend', e => {
      // 拖动的宽度比例
      const percent = Math.abs(this.distanceX) / this.$options.width
      // 获取参数里的拖动的宽度比例
      const scale = this.$options.scale || 0.5
      //  添加过渡样式
      this.addTransition()
      // 处理左滑右滑的下标index & 无缝过渡效果
      if (this.isMove && percent > scale) {
        if (this.distanceX < 0) {
          // 向左滑动
          this.index++
          if (this.index > this.imagesLength) {
            setTimeout(() => {
              this.removeTransition()
              this.index = 1
              // 设定下标选中样式
              this.setIndexActiveCss(this.index - 1)
            }, 150)
          } else {
            this.setIndexActiveCss(this.index - 1)
          }
        } else {
          // 向右滑动
          this.index--
          if (this.index === 0) {
            setTimeout(() => {
              this.removeTransition()
              this.index = this.imagesLength
              // 设定下标选中样式
              this.setIndexActiveCss(this.index - 1)
            }, 150)
          } else {
            this.setIndexActiveCss(this.index - 1)
          }
        }
      }
      // 定位
      this.setTranslateX(-this.index * this.$options.width)
      //重置参数
      this.startX = 0
      this.moveX = 0
      this.distanceX = 0
      this.isMove = false
      if (!this.$options.static) {
        // 开启自动轮播定时器
        this.start()
      }
    })
  },
  /**
   * 绑定事件，进行了兼容性处理，能够被所有浏览器支持
   * @method addEvent
   * @param { Object } obj  事件的dom对象
   * @param { String } type  绑定事件的类型
   * @param { Function } handle  绑定事件的callback
   */
  addEvent(obj, type, handle) {
    try {
      obj.addEventListener(type, handle, false)
    } catch (e) {
      try {
        obj.attachEvent('on' + type, handle)
      } catch (e) {
        obj['on' + type] = handle
      }
    }
  },
  /**
   * 容器的偏移位移的设定
   * @param {Number} translateX
   */
  setTranslateX(translateX) {
    this.$swipe.style.transform = `translateX(${translateX}${this.unit})`
    this.$swipe.style.webkitTransform = `translateX(${translateX}${this.unit})`
  },
  /**
   * 添加过渡效果
   */
  addTransition() {
    this.$swipe.style.transition = 'all 0.3s'
    this.$swipe.style.webkitTransition = 'all 0.3s'
  },
  /**
   *  删除过渡效果
   */
  removeTransition() {
    this.$swipe.style.transition = 'none'
    this.$swipe.style.webkitTransition = 'none'
  },
  /**
   * 设定下标选中样式
   * @param {Number} index
   */
  setIndexActiveCss(index) {
    if (!this.$options.hideIndex) {
      let i = this.imagesLength
      while (i >= 0) {
        i--
        if (this.$swipeBtnList.children && this.$swipeBtnList.children[i]) this.$swipeBtnList.children[i].style['background-color'] = '#e1e1e1'
      }
      this.$swipeBtnList.children[index].style['background-color'] = '#888'
    }
  }
}

module.exports = Carousel
