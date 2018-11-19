require(["config"], function(){
	require(["jquery", "header", "cookie","footer"], function($,header,cookie){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			})
			$("footer").load("/html/component/footer.html", function(){

			});
		}).then(function(){
			$("#login").submit(function(e){
				//构造请求携带的参数
				var data = {
					phone: $("#phone").val(),
					password: $("#password").val()

				};
				// console.log(data);
				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/test/project/projectserver/api/login.php",
					success: function(res){
						if(res.code === 1){
							$.cookie("phone",data.phone,{
								path:"/"
							})
							location.href = "http://localhost:2333";
						}else{
							alert("用户名或密码错误");
						}
						// console.log(res)
					}
				})
				e.preventDefault();
			})
		}).then(function(){
			$("#register").submit(function(e){
				var data = {
					email: $("#email").val(),
					password1: $("#password1").val(),
					passagain: $("#passagain").val(),
					imgyzm: $("#imgyzm").val(),
					phone1: $("#phone1").val(),
					mesyzm: $("#mesyzm").val(),
					name: $("#name").val()
				};
				console.log(data)
				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/test/project/projectserver/api/register.php",
					success: function(res){
						console.log("djsp")
						if(res.code == 1){
							// $.cookie("phone1",data.phone1,{
							// 	path:"/"
							// })
							// location.reload();
							alert("注册成功！请登录");
							console.log("dskajlh");
						}else{
							alert('请输入正确的信息');
						}
					}
				})
				e.preventDefault();
			})
		}).then(function(){
			header.welcome();
		})
	})
})