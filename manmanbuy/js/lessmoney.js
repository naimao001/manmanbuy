$(function () {
  var mmb = new MMB();
  mmb.getmoneyctrl()
  // mmb.initPullrefresh()
  mmb.goDetail()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  baseURI: 'http://localhost:9090/api/',
  // baseURI:'http://mmb.ittun.com/api/',
  //获取首页菜单数据
  getmoneyctrl: function () {
    var that = this 
    $.ajax({
      url: this.baseURI + "getmoneyctrl",
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var productHtml = template('productTpl', data)
        $('#pullrefresh .mui-scroll').html(productHtml)
        that.initPullrefresh()
      }
    })
  },
  goDetail() {
    $('#product').on('tap', '.product-content', function () {
      var productid = $(this).data('productid')
      location.href = `lessmoney-detail.html?productid=${productid}`
    })
  },
  initPullrefresh() {
    mui.init({
      //指定初始化刷新的功能
      pullRefresh: {
        //初始化刷新的功能的容器
        container: '#pullrefresh',
        //初始化下拉刷新
        down: {
          //是下拉刷新的回调函数 发送ajax请求刷新页面 并结束下拉刷新效果
          callback: pulldownRefresh
        },
        //初始化上拉加载
        up: {
          contentrefresh: '正在加载...',
          //是上拉的回调函数 发送ajax请求追加页面 并结束上拉加载效果
          callback: pullupRefresh
        }
      }
    });

    function pulldownRefresh() {
      //定时器为了模拟请求的延迟
      setTimeout(function () {
        // ajax请求 渲染刷新页面
        // $.ajax()
        //当页面刷新完成结束下拉刷新效果 不结束会一直转
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
      }, 1500);
    }

    function pullupRefresh() {
      setTimeout(function () {
        // ajax请求 追加渲染页面
        $.ajax()
        //当页面刷新完成结束上拉加载效果 不结束会一直转
        mui('#pullrefresh').pullRefresh().endPullupToRefresh();
        //如果传入一个参数true表示上拉加载到底了没有更多数据了
        // mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
      }, 1500);
    }
  },
  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}