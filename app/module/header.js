define(["jquery"], function($){
    function Header(){}

    Header.prototype.welcome = function(){
        var username =$.cookie("phone");
		if(username){
            $("#login-res").text(username+"欢迎您！");
            $("#welcome").css("margin-left","703px");
            $("#welcome").css("width","130px");
            $("#login-res").css("width","130px");
        }
    }
    
    return new Header();
})

        