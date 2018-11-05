$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
  mmb.getcategorybyid()
  mmb.getproduct()
  mmb.getproductcom()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  baseURI: 'http://localhost:9090/api/',
  // baseURI:'http://mmb.ittun.com/api/',
  getproduct() {
    var productid = parseInt(this.GetQueryString('productid'))
    console.log(productid)
    $.ajax({
      url: this.baseURI + "getproduct",
      data: {
        productid: productid
      },
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var productHtml = template('productHtmlTpl', data)
        $('.product').html(productHtml)
      }
    })
  },
  getcategorybyid() {
    var cateid = parseInt(this.GetQueryString('cateid'))
    $.ajax({
      url: this.baseURI + "getcategorybyid",
      data: {
        categoryid: cateid
      },
      dataType: 'json',
      success: function (data) {
        $('.category').html(data.result[0].category)
      }
    })
  },
  getproductcom() {
    var productid = parseInt(this.GetQueryString('productid'))
    $.ajax({
      url: this.baseURI + "getproductcom",
      data: {
        productid: productid
      },
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var commentContentHtml = template('commentContentTpl', data)
        $('.comment').html(commentContentHtml)
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