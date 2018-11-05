$(function () {
  var mmb = new MMB();
  $(document).on('ajaxStart', function () {
    NProgress.start()
  })
  $(document).on('ajaxStop', function () {
    NProgress.done()
  })
  mmb.getproductlist()
  mmb.paginationFnc()
  mmb.goProductDetail()
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  baseURI: 'http://localhost:9090/api/',
  // baseURI:'http://mmb.ittun.com/api/',
  pageid: 1,
  optionNum: 0,
  isFirst: true,
  getproductlist() {
    var cateId = this.GetQueryString('cateId')
    var that = this
    // console.log(cateId)

    $.ajax({
      url: this.baseURI + "getproductlist",
      data: {
        categoryid: cateId,
        pageid: this.pageid
      },
      dataType: 'json',
      success: function (data) {
        //算出option个数  让一个空数组长度为这个数 用于遍历
        optionNum = data.totalCount / data.pagesize
        var arr = []
        arr.length = optionNum
        data.arr = arr
        data.currentPage = that.pageid
        console.log(data)
        var productHtml = template('productHtmlTpl', data)
        $('#productList').html(productHtml)
        if (that.isFirst) {
          that.isFirst = false;
          var paginationHtml = template('paginationHtmlTpl', data)
          $('#pagination').html(paginationHtml)
        }
      }
    })
  },
  paginationFnc() {
    var that = this
    $('#pagination').on('tap', '.prev', function () {
      // console.log(11)
      if (that.pageid == 1) {
        mui.toast('已经是第一页了', {
          duration: '1000',
          type: 'div'
        })
        return
      }
      that.pageid--
      // console.log(that.pageid)
      that.getproductlist()
      $('.pageSelect').val(that.pageid / that.optionNum)
    })
    $('#pagination').on('tap', '.next', function () {
      // console.log($(this))

      if (that.pageid == $(this).data('pagecount')) {
        mui.toast('已经是最后一页了', {
          duration: '1000',
          type: 'div'
        })
        return
      }
      that.pageid++
      // console.log(that.pageid)
      that.getproductlist()
      $('.pageSelect').val(that.pageid / that.optionNum)
    })
    $('#pagination').on('change', '.pageSelect', function () {
      that.pageid = $(this).val()
      that.getproductlist()

    })
  },
  goProductDetail() {
    //点击商品列表
    $('#productList').on('tap', '.product', function () {
      var productId = $(this).data('productid')
      var cateid = $(this).data('cateid')

      location.href = `goodsdetail.html?productid=${productId}&cateid=${cateid}`
    })
  },
  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}