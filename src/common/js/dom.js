// 添加类名
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 查询类名
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 将元素插入到第一个子元素之前的位置
export function prepend(el, targetEl) {
  let firstElement = targetEl.firstChild
  targetEl.insertBefore(el, firstElement)
}

// 设置，查询‘data-’属性
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

// 检测浏览器类型
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

// 为css属性自动添加浏览器前缀
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

// 获取今明后时间
export function getDateStr(AddDayCount, func) {
  let dd = new Date()
  // 获取参数天后的日期
  dd.setDate(dd.getDate() + AddDayCount)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  return func(y, m, d)
}
