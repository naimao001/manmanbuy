$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
  mmb.getinlanddiscount()
  mmb.someTap()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
	//在原型对象上写一个baseURL API的前缀网址 本地 或者网络
	baseURI:'http://localhost:9090/api/',
	// baseURI:'http://mmb.ittun.com/api/',
	
  //获取国内折扣商品数据
	getinlanddiscount:function () {
    $.ajax({
      url:this.baseURI+"getinlanddiscount",
      dataType:'json',
      success:function (data) {
        console.log(data)
        var cndiscountHtml = template('cndiscountTpl',data)
        $('#product').html(cndiscountHtml)
      }
    })
  },
  someTap(){
    $('#category').on('tap',function () {
      location.href = 'category.html'
    })
    $('#lessmoney').on('tap',function () {
      location.href = 'lessmoney.html'
    })
    $('#product').on('tap','.product-content',function () {
      var productid = $(this).data('productid')
      location.href=`cn-discount-detail.html?productid=${productid}`
    })
  }
}