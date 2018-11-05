$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart',function () {
    NProgress.start()
  })
  $(document).on('ajaxStop',function () {
    NProgress.done()
  })
  mmb.initFirstCategory()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  baseURI: 'http://localhost:9090/api/',
  // baseURI:'http://mmb.ittun.com/api/',
  initFirstCategory() {
    var that = this
    $.ajax({
      url: this.baseURI + "getcategorytitle",
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var firstCateHtml = template('firstCateTpl', data)
        $('.mui-table-view').html(firstCateHtml) 

        $('.mui-table-view li').on('tap',function () {
          
          $.ajax({
            url: that.baseURI + "getcategory",
            dataType: 'json',
            data: {
              titleid: $(this).data('id')
            },
            success: function (data) {
              // console.log(data)
              var secondCateHtml = template('secondCateTpl', data)
              $('.mui-row').html(secondCateHtml)
              $('.mui-row >div').on('tap',function () {
                var cateId =  $(this).data('cateid')
                location.href = 'goodslist.html?cateId='+cateId
              })
            }
          })

          
        })
      }
    })
  }
}