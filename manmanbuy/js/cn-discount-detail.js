$(function () {
  var mmb = new MMB();
  mmb.getdiscountproduct()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  baseURI: 'http://localhost:9090/api/',
  // baseURI:'http://mmb.ittun.com/api/',
  // 获取省钱搜 详情 
  getdiscountproduct: function () {
    var productid = this.GetQueryString('productid')
    $.ajax({
      url: this.baseURI + "getdiscountproduct",
      dataType: 'json',
      data: {
        productid:productid
      },
      success: function (data) {
        console.log(data)
        var productHtml = template('productContentTpl', data)
        $('#product').html(productHtml)
        
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