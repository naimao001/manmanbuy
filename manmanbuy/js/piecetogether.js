$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
  mmb.getgsshop()
  mmb.getgsshoparea()
  mmb.getgsproduct()
  mmb.selectChange()
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
  shopid:0,
  areaid:0,
	getgsshop:function () {
    $.ajax({
      url:this.baseURI+"getgsshop",
      dataType:'json',
      success:function (data) {
        console.log(data)
        var shopHtmlTpl = template('shopTpl',data)
        $('#shop').html(shopHtmlTpl)
      }
    })
  },
  getgsshoparea:function () {
    $.ajax({
      url:this.baseURI+"getgsshoparea",
      dataType:'json',
      success:function (data) {
        var areaHtmlTpl = template('areaTpl',data)
        $('#area').html(areaHtmlTpl)
      }
    })
  },
  getgsproduct(){
    $.ajax({
      url:this.baseURI+"getgsproduct",
      dataType:'json',
      data:{
        shopid:this.shopid,
        areaid :this.areaid
      },
      success:function (data) {
        console.log(data)
        var productHtmlTpl = template('productTpl',data)
        $('.product-content').html(productHtmlTpl)
      }
    })
  },
  selectChange(){
    var that = this
    $('#select-nav').on("change","#shop",function () {
      that.shopid =  $(this).val()
      that.areaid = $("#area").val()
      that.getgsproduct()
    })
    $('#select-nav').on("change","#area",function () {
      that.shopid =  $(this).val()
      that.areaid = $("#shop").val()
      that.getgsproduct()
    })
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