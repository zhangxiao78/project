require(["config"], function(){
	require(["jquery", "tools", "header", "lunbo", "footer","cookie"], function($,tools,header){
		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){

			});
			$("#lunbo").load("/html/component/lunbo.html", function(){
				$("#lunbo").lunbo({
					goPrev: "goPrev",
					goNext: "goNext"
				});
			});
		}).then(function(){
			header.welcome();
		});
	})
})
