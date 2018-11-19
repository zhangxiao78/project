require(["config"], function(){
	require(["jquery", "template", "cookie", "header", "footer"], function($,template,cookie,header){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){

			});
		}).then(function(){
			$.ajax({
				method: "get",
				async: false,
				url: "http://rap2api.taobao.org/app/mock/117155/products",
				success: function(res){
					var html = template("pro-template",{products: res.products});
					$("#main-col").html(html);
				}
			})
		}).then(function(){
			header.welcome();
		}).then(function(){
			$(".addMe").click(function(e){
				var obj = {
					name: $(this).siblings('#car-name').text(),
					pic: $('#car-pic').attr('src'),
					num: 1,
					price: $(this).siblings('#car-price').text().slice(1)
				}
				
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
		}).then(function(){
			$("#sort").click(function(){
				var val = $(".sort").css("display");
				
				if(val == 'none'){
					$(".sort").css("display" , "block"); //显示
				}else{
					$(".sort").css("display" , "none"); //隐藏
				}
			})
			$("#kind").click(function(){
				var val = $(".kind").css("display");
				if(val == 'none'){
					$(".kind").css("display" , "block"); //显示
					$("#kind").css({"color":"#7c0d02","background":"url(/img/bottom.jpg)","background-position":"117px center","background-repeat": "no-repeat"});
				}else{
					$(".kind").css("display" , "none"); //隐藏
					$("#kind").css({"color":"#7b7b7b","background":"url(/img/left.png)","background-position":"120px center","background-repeat": "no-repeat"});
				}
			})
			$("#set").click(function(){
				var val = $(".set").css("display");
				if(val == 'none'){
					$(".set").css("display" , "block"); //显示
					$("#set").css({"color":"#7c0d02","background":"url(/img/bottom.jpg)","background-position":"117px center","background-repeat": "no-repeat"});
				}else{
					$(".set").css("display" , "none"); //隐藏
					$("#set").css({"color":"#7b7b7b","background":"url(/img/left.png)","background-position":"120px center","background-repeat": "no-repeat"});
				}
			})
		}).then(function(){
			
		})
	})
})