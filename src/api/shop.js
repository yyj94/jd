/**
 * 模拟前后端交互
 */

// 商品数据
const _products = [
  {
    'name': 'Apple iPhone 6 32GB 金色 移动联通电信4G 手机',
    'picUrl': 'http://www.yeyanjie.com/test/api/images/good_04.jpg',
    'price': '2499',
    'tag': '自营',
    'cmtNum': '131858',
    'applRate': '93',
    'class': 'phone',
    'nid': 4586850,
    'picList': [
      {
        'picUrl': 'http://www.yeyanjie.com/test/api/images/iphone6_01.jpg'
      },
      {
        'picUrl': 'http://www.yeyanjie.com/test/api/images/iphone6_02.jpg'
      },
      {
        'picUrl': 'http://www.yeyanjie.com/test/api/images/iphone6_03.jpg'
      }
    ],
    'txt': {
      'p': '【开学迎新季，就要换新机！】 预定商品按预计发货时间陆续发货！',
      'a': 'iPhone为你，诚意不止！',
      'href': '/home'
    },
    'change': [
      {
        'tag': '换购',
        'txt': '购买一件可优惠换购热销商品'
      },
      {
        'tag': '满赠',
        'txt': '满19元即赠热销商品，赠完即止，请在购物车点击领取'
      },
      {
        'tag': '赠品',
        'txt': '【赠品】 0月租，1元800M广东省内流量，内含19元话费，无合约期限制（赠完即止）',
        'num': 1
      },
      {
        'tag': '优惠套装',
        'txt': '购买一件可优惠换购热销商品'
      }
    ],
    'exchange': true,
    'inventory': 10,
    'weight': '0.39kg',
    'tagList': [
      '京东发货&售后',
      '京准达',
      '211限时达',
      '货到付款',
      '自提',
      '99元免基础运费（20kg内）',
      '七天退货'
    ],
    'pickList': {
      'list1': {
        'name': '颜色',
        'selected': '金色',
        'options': [
          '金色',
          '深空灰'
        ]
      },
      'list2': {
        'name': '购买方式',
        'selected': '官方标配',
        'options': [
          '官方标配',
          '电信-买手机省话费',
          '电信-套餐自由定制',
          '移动-老用户优惠购机',
          '移动-买手机省话费',
          '联通-买手机省话费'
        ]
      }
    }
  },
  {
    'name': 'Apple iPhone 6s Plus ( A1699) 32G 玫瑰金色 移动联通电信4G 手机',
    'picUrl': 'http://www.yeyanjie.com/test/api/images/good_02.jpg',
    'price': '3799',
    'tag': '自营',
    'cmtNum': '52205',
    'applRate': '97',
    'class': 'phone',
    'nid': 3726830,
    'picList': [
      {
        'picUrl': 'http://www.yeyanjie.com/test/api/images/iphone6_01.jpg'
      },
      {
        'picUrl': 'http://www.yeyanjie.com/test/api/images/iphone6_02.jpg'
      },
      {
        'picUrl': 'http://www.yeyanjie.com/test/api/images/iphone6_03.jpg'
      }
    ],
    'txt': {
      'p': '【开学迎新季，就要换新机！】 预定商品按预计发货时间陆续发货！',
      'a': 'iPhone为你，诚意不止！',
      'href': '/home'
    },
    'change': [
      {
        'tag': '换购',
        'txt': '购买一件可优惠换购热销商品'
      },
      {
        'tag': '满赠',
        'txt': '满19元即赠热销商品，赠完即止，请在购物车点击领取'
      },
      {
        'tag': '赠品',
        'txt': '【赠品】 0月租，1元800M广东省内流量，内含19元话费，无合约期限制（赠完即止）',
        'num': 1
      },
      {
        'tag': '优惠套装',
        'txt': '购买一件可优惠换购热销商品'
      }
    ],
    'exchange': true,
    'inventory': 5,
    'weight': '0.39kg',
    'tagList': [
      '京东发货&售后',
      '京准达',
      '211限时达',
      '货到付款',
      '自提',
      '99元免基础运费（20kg内）',
      '七天退货'
    ],
    'pickList': {
      'list1': {
        'name': '颜色',
        'selected': '金色',
        'options': [
          '金色',
          '深空灰'
        ]
      },
      'list2': {
        'name': '购买方式',
        'selected': '官方标配',
        'options': [
          '官方标配',
          '电信-买手机省话费',
          '电信-套餐自由定制',
          '移动-老用户优惠购机',
          '移动-买手机省话费',
          '联通-买手机省话费'
        ]
      }
    }
  }
]

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // 随机模拟交互失败
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
      ? cb()
      : errorCb()
    })
  }
}
