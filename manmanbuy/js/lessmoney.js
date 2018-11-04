$(function () {
  var mmb = new MMB();
  mmb.getmoneyctrl()
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
    $.ajax({
      url: this.baseURI + "getmoneyctrl",
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var productHtml = template('productTpl', data)
        $('#product').html(productHtml)
      }
    })
  },
  goDetail(){
    $('#product').on('tap','.product-content',function () {
      var productid= $(this).data('productid')
      location.href = `lessmoney-detail.html?productid=${productid}`
    })
  },
  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}