$(function () {
  var mmb = new MMB();
  mmb.getmoneyctrlproduct()
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  baseURI: 'http://localhost:9090/api/',
  // baseURI:'http://mmb.ittun.com/api/',
  // 获取省钱搜 详情 
  getmoneyctrlproduct: function () {
    var productid = this.GetQueryString('productid')
    $.ajax({
      url: this.baseURI + "getmoneyctrlproduct",
      dataType: 'json',
      data: {
        productid:productid
      },
      success: function (data) {
        console.log(data)
        var productHtml = template('productContentTpl', data)
        $('#product').html(productHtml)
        $('.productComment').html(data.result[0].productComment)
      }
    })
  },
  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}