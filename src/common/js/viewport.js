(function() {
  // 声明设备像素比，基准值，缩放比例三个变量
  var dpr, rem, scale
  // 获取html根元素
  var docEl = document.documentElement
  // 创建style标签
  var fontEl = document.createElement('style')
  // 获取包含viewport信息的meta标签
  var metaEl = document.querySelector('meta[name="viewport"]')

  // 通过window.devicePixelRatio得到设备的像素比，如果不支持则返回默认值1
  dpr = window.devicePixelRatio || 1
  // 查询窗口大小，乘以dpr抵消scale缩放的倍数，除以数字10是为了取整便于计算
  rem = docEl.clientWidth * dpr / 10

  // 缩放比例由dpr决定
  scale = 1 / dpr

  // 设置viewport信息，确定缩放比例，高清化
  metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')
  // 设置data-dpr属性，留作css hack之用
  docEl.setAttribute('data-dpr', dpr)

  // 动态设置字体大小
  docEl.firstElementChild.appendChild(fontEl)
  fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}'

  // 建立某一dpr下rem与px之间的转换函数
  window.rem2px = function(v) {
    v = parseFloat(v)
    return v * rem
  }
  window.px2rem = function(v) {
    v = parseFloat(v)
    return v / rem
  }
  // 将dpr和rem储存在window对象的属性中
  window.dpr = dpr
  window.rem = rem
})()
