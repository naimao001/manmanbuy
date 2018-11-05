$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
	mmb.getIndexMenu()
  mmb.getdisCount()
  mmb.tapMore()
  mmb.initNavScroll()
  mmb.someTap()
 
  
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
	//在原型对象上写一个baseURL API的前缀网址 本地 或者网络
	baseURI:'http://localhost:9090/api/',
	// baseURI:'http://mmb.ittun.com/api/',
	//获取首页菜单数据
	getIndexMenu:function () {
    $.ajax({
      url:this.baseURI+"getindexmenu",
      dataType:'json',
      success:function (data) {
        var picNavHtml = template('picnavTpl',data)
        $('#pic-nav ul').html(picNavHtml)
      }
    })
  },
  //获取折扣推荐数据
	getdisCount:function () {
    $.ajax({
      url:this.baseURI+"getmoneyctrl",
      dataType:'json',
      success:function (data) {
        console.log(data)
        var discountHtml = template('discountTpl',data)
        $('#discount-rec').html(discountHtml)
      }
    })
  },
  tapMore(){
    //点击更多
    // $('#pic-nav').on('tap','li:nth-child(8)',function () {
    //   console.log('进来了')
    //   $('li:gt(8)').toggleClass('show')
    // })
  },
  initNavScroll(){
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  someTap(){
    $('#category').on('tap',function () {
      location.href = 'category.html'
    })
    $('#lessmoney').on('tap',function () {
      location.href = 'lessmoney.html'
    })
    $('#cabbageprice').on('tap',function () {
      location.href = 'cabbageprice.html'
    })
    $('#hourstop').on('tap',function () {
      location.href = 'hourstop.html'
    })
    $('#historyprice').on('tap',function () {
      location.href = 'historyprice.html'
    })
  }
}