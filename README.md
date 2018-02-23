# jd

> 基于 vue.js 的仿京东demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

项目预览地址 m.yeyanjie.com/jd-app/

## 技术栈

- vue全家桶（vue, vue-router, vuex, axios)
- ES6
- scss
- webpack

## 前后端分离

&emsp;&emsp;除了固定的logo和文案外，大多数模拟数据保存在data.json文件中，使用axios的GET方法发送异步请求后通过v-for或者v-html渲染页面

## 屏幕适配

&emsp;&emsp;采用rem布局，百分比布局，flex布局，通过js动态计算根元素的字体大小，实现不同移动设备的页面适配

## 目前已完成工作
> 目前完成了商品展示以及商品购买全过程

**已完成页面**
  
- 首页

- 分类页面

- 商品列表页面

- 商品详情页

- 购物车
  
## 接下来工作

- 页面适配还不够完美，添加最大宽度，最大高度来进一步控制大屏Pad上布局的合理性
- 增加商品列表按钮功能
  点击样式图标，商品列表样式在2种样式之间切换
  实现简单的筛选功能
- 完善其他页面和功能
