var backtotopclass = {
    createnew : function() {
        var BackToTop = document.createElement("input");
        BackToTop.type = "button";
        BackToTop.style.display = "none";
        BackToTop.value = "回到上面去";
        BackToTop.style.height = "100px";
        BackToTop.style.width = "300px";

        BackToTop.init = function(argument) {
            if (argument["x"] != null) {
                this.style.position = 'fixed';
                this.style.left = argument["x"] + "px";
                this.style.top = argument["y"] + "px";
            }
            if (argument["LeftUp"]) {
                this.style.position = 'fixed';
                this.style.left = "0px";
                this.style.top = "0px";
            }
            if (argument["RightUp"]) {
                this.style.position = 'fixed';
                this.style.right = "0px";
                this.style.top = "0px";
            }
            if (argument["LeftDown"]) {
                this.style.position = 'fixed';
                this.style.left = "0px";
                this.style.bottom = "0px";
            }
            if (argument["RightDown"]) {
                this.style.position = 'fixed';
                this.style.right = "0px";
                this.style.bottom = "0px";
            }
        }
        BackToTop.onclick = function() {
            var x = document.body.scrollTop || document.documentElement.scrollTop;
            var timer = setInterval(function() {
                x = x - 3;
                if (x < 20) {
                    x = 0;
                    window.scrollTo(x, x);
                    clearInterval(timer);
                }
                window.scrollTo(x, x);
            }, "10");
        }
        window.addEventListener("scroll",function() {
            var x = document.body.scrollTop || document.documentElement.scrollTop;
            console.log(x);
            if (x == 0) {
                BackToTop.style.display = "none";
            }
            if (x > 0) {
                BackToTop.style.display = "inline";
            }
        })

        document.addEventListener("keydown", function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 8) { 
                var x = document.body.scrollTop || document.documentElement.scrollTop;
                var timer = setInterval(function() {
                    x = x - 3;
                    if (x < 20) {
                        x = 0;
                        window.scrollTo(x, x);
                        clearInterval(timer);
                    }
                    window.scrollTo(x, x);
                }, "10");
            }
        })
        return BackToTop;
    }
}





var BackToTop1 = backtotopclass.createnew();
var BackToTop2 = backtotopclass.createnew();
var BackToTop3 = backtotopclass.createnew();
var BackToTop4 = backtotopclass.createnew();
var BackToTop5 = backtotopclass.createnew();
BackToTop1.init({ x:200,y:200 });
BackToTop2.init({ LeftUp: true });
BackToTop3.init({ LeftDown: true });
BackToTop4.init({ RightUp: true });
BackToTop5.init({ RightDown: true });
if (document.body != null) {
    document.body.appendChild(BackToTop1);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(BackToTop1);
}
if (document.body != null) {
    document.body.appendChild(BackToTop2);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(BackToTop2);
}
if (document.body != null) {
    document.body.appendChild(BackToTop3);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(BackToTop3);
}
if (document.body != null) {
    document.body.appendChild(BackToTop4);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(BackToTop4);
}
if (document.body != null) {
    document.body.appendChild(BackToTop5);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(BackToTop5);
}

