# yu-carousel

 一个用于移动端的可触摸滑动的轮播控件


 clone该仓库到本地可查看演示demo


## Installation
```shell
npm i yu-carousel -S

```
or
```shell
yarn add yu-carousel

```

## Usage

```javascript
import Carousel from 'yu-carousel'

new Carousel(options)
```

## Example

```html
<div id="banner"></div>
```

```javascript
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
```

## 可选的配置项：

 配置项 | 类型 | 描述 | 默认值
--------|---------|-------|-----
 el | [String, Object] | 容器选择器,  容器的根节点dom对象
 width | Number | 容器宽度
 height | Number | 容器高度
 scale | Number | 触发翻页的拖动宽度的比例 | 0.5
 delay | Number | 自动轮播的时间间隔 | 2000
 hideIndex | Boolean | 是否隐藏下标（true是隐藏，false是显示）| false
 static | Boolean | 是否进行自动轮播（false是轮播，true是不轮播） | false
 unit | String | 适配单位（rem，px等） | px
 images | Array | 轮播图集合，eg：[{ href: '#',src: 'images/1.jpg' }]


## Build Setup

```bash
# install dependencies
npm install
# or
yarn

# serve with hot reload at localhost:1234
npm run dev
# or
yarn dev

```


## License
MIT
