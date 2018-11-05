$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
	mmb.getbaicaijiaproduct()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
	//在原型对象上写一个baseURL API的前缀网址 本地 或者网络
	baseURI:'http://localhost:9090/api/',
	// baseURI:'http://mmb.ittun.com/api/',
  titleid:0,
  getbaicaijiaproduct:function () {
    $.ajax({
      url:this.baseURI+"getbaicaijiaproduct",
      dataType:'json',
      data:{
        titleid:this.titleid
      },
      success:function (data) {
        console.log(data)
        var productHtml = template('productHtmlTpl',data)
        $('.product-content').html(productHtml)
      }
    })
  }
}