require(["config"], function(){
	require(["jquery", "header","template", "cookie", "footer"], function($,header,template,cookie){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html .top,.logo", function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){

			});
		}).then(function(){
			header.welcome();
		})
		.then(function(){
			var str = location.search.slice(1);
			var arr = str.split("=");
			var obj = {}
			obj[arr[0]] = arr[1];
			$.ajax({
				method: "get",
				async: false,
				url: "http://rap2api.taobao.org/app/mock/117155/pro",
				success: function(res){
					var html = template("pro-temp",{products: res.products});
					$("#cart").html(html);
				}
			})
		}).then(function(){
			var product = JSON.parse($.cookie("product"));
			var html = template("pro-temp",{product: product});
			$("#cart-zxh").html(html);
			$(".cart").css("display","block");
			$("#cart-zxh").css("display","block");
			$(".empty").css("display","none");
		}).then(function(){
			$("#cart-plus").click(function(){
				var plus = parseInt($("#num").val());
				var product = $.cookie("product");
				if(product){
					$('#num').val(plus+1);
				}
				$.cookie("product",JSON.stringify(product),{expires: 7, path: '/'});

			})
			$("#cart-minus").click(function(){
				var minus = parseInt($("#num").val());
				var product = $.cookie("product");
				if(product){
					if(minus<=1){
						minus=1;
						alert("商品不能再减啦~");
					}else{
						$('#num').val(minus-1);
					}
					// $.cookie("phone",JSON.stringify(data.product),{
					// 	path:"/"
					// })
					console.log(product)
				}
			})
		}).then(function(){
			$(".pro-remove").click(function(){
				alert("确定删除吗？")
				for(var i = 0;i<$(".cart-main").length;i++){
					$(".cart-main")[i].remove();

					if($(".cart-main").length=0){
						$(".cart").css("display","none");
						$("#cart-zxh").css("display","none");
						$(".empty").css("display","block");
					}
				}
				
				$.cookie("product[0].name",null,{expires: -1, path: '/'});

			})
		}).then(function(){
			$(".star").click(function(e){
				alert("已成功添加到收藏");
			})
		})
	})
})