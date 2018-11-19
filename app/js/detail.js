require(["config"], function(){
	require(["jquery", "template", "header", "cookie","footer"], function($,template,header,cookie){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){

			});
		}).then(function(){
			var str = location.search.slice(1);
			var arr = str.split("=");
			var obj = {}
			obj[arr[0]] = arr[1];
			$.ajax({
				method: "get",
				async: false,
				url: "http://rap2api.taobao.org/app/mock/117155/productsadd",
				success: function(res){
					var html = template("pro-temp",{products: res.productsadd});
					$("#zxh").html(html);
				}
			})
		}).then(function(){
			$.ajax({
				method: "get",
				async: false,
				url: "http://rap2api.taobao.org/app/mock/117155/productscar",
				success: function(res){
					var html = template("pro-template",{products: res.products});
					$("#main-buy").html(html);
				}
			})
		}).then(function(){
			header.welcome();
		}).then(function(){
			$("#plus").click(function(){
				var plus = parseInt($("#choose-num").val());
				var product = $.cookie("product");

				var obj = {
					name: $('#deli-name').text(),
					pic: $('#deli-pic').attr('src'),
					num: $('#choose-num').val(),
					price: $('#deli-price').text()
				}
				
				if(product){
					product = JSON.parse(product);
					$('#choose-num').val(plus+1);
						
				}else{
					product = [];
				}

				var n = 0;
				product.forEach((curr)=>{
					if(curr.name === obj.name){
						console.log(curr.name,obj.name)
						curr.num++;
						return;
					}
					n++;
				})
				if(n == product.length){
					product.push(obj);
				}
				
				$.cookie("product",JSON.stringify(product),{expires: 7, path: '/'});
				console.log(product)
			})
			$("#minus").click(function(){
				var minus = parseInt($("#choose-num").val());
				var product = $.cookie("product");

				var obj = {
					name: $('#deli-name').text(),
					pic: $('#deli-pic').attr('src'),
					num: $('#choose-num').val(),
					price: $('#deli-price').text()
				}

				if(product){
					product = JSON.parse(product);
					if(minus<=1){
						minus=1;
						alert("商品不能再减啦~");
					}else{
						$('#choose-num').val(minus-1);
					}
				}else{
					product = [];
				}

				var n = 0;
				product.forEach((curr)=>{
					if(curr.name === obj.name){
						curr.num;
						
						return;
					}
					n++;
				})
				if(n == product.length){
					product.push(obj);
				}
				
				$.cookie("product",JSON.stringify(product),{expires: 7, path: '/'});
				console.log(product)
			})
			$(".btn-adP").click(function(e){
				var obj = {
					name: $('#deli-name').text(),
					pic: $('#deli-pic').attr('src'),
					num: $('#choose-num').val(),
					price: $('#deli-price').text()
				}
				console.log(obj);
				var product = $.cookie("product");
				
				if(product){
					product = JSON.parse(product);
				}else{
					product = [];
				}
				var n = 0;
				product.forEach((curr)=>{
					if(curr.name === obj.name){
						console.log(curr.name,obj.name)
						curr.num++;
						return;
					}
					n++;
				})
	
				if(n == product.length){
					product.push(obj);
				}
				
				$.cookie("product",JSON.stringify(product),{expires: 7, path: '/'});
				alert("成功加入购物车");
			})
			// $("#star").click(function(e){
			// 	alert("已成功添加到收藏");
			// })
		})
	})
})