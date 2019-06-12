import Carousel from 'yu-carousel'

new Carousel({
  el: '#banner',
  width: 375,
  height: 175,
  static: false,
  hideIndex: false,
  scale: 0.25,
  delay: 2000,
  images: [
    {
      href: '#',
      src: require('../images/1.jpg')
    },
    {
      href: '#',
      src: require('../images/2.jpg')
    },
    {
      href: '#',
      src: require('../images/3.jpg')
    }
  ]
})
