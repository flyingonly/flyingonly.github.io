var Modalclass = {
    createnew: function() {
        var m = document.createElement("div");
        m.style.position = 'absolute';
        m.style.height = "100px";
        m.style.width = "500px";
        m.style.backgroundColor = "blue";
        m.style.textAlign = "center";
        m.style.fontSize = "50px";
        m.innerHTML = "asd";
        m.draggable = false;
        m.mydraggable = true;
        m.closekey = 27;
        m.show = false;
        m.style.display = "none";
        m.dragging = false;
        m.mousex = 0;
        m.mousey = 0;
        m.init = function(argument) {
        	this.focus();
            if (argument["content"] != undefined) {
                m.innerHTML = argument["content"];
            }
            if (argument["draggable"] != undefined) {
                m.mydraggable = argument["draggable"];
            }
            
            if (argument["closekey"] != undefined) {
                m.closekey = argument["closekey"];
            }
        }
        m.onmousedown = function(event) {
            if (!this.mydraggable || !this.show) {
                return;
            }
            this.dragging = true;
            this.originx = this.offsetLeft - event.x;
            this.originy = this.offsetTop - event.y;
        }
        m.onmousemove = function(event) {
            if (this.dragging) {
                this.style.left = this.originx + event.x + "px";
                this.style.top = this.originy + event.y + "px";
                console.log(this.offsetLeft);
                console.log(event.x, event.y);
            }
        }

        m.onmouseup = function(event) {
            this.dragging = false;
        }

        m.onmouseout = function(event) {
            this.dragging = false;
        }

        document.addEventListener("keydown",function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == m.closekey) {
                m.style.display = "none";
                m.show = false;
            }
        })
        return m;
    }
}

var Modal1 = Modalclass.createnew();
Modal1.init({
	content:"这个是默认设置"
})
var Modal2 = Modalclass.createnew();
Modal2.init({
	content:"这个是不能拖动的",
	draggable: false
})
var Modal3 = Modalclass.createnew();
Modal3.init({
	content:"这个是用TAB关闭的",
	closekey:9
})
if (document.body != null) {
    document.body.appendChild(Modal1);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(Modal1);
}
if (document.body != null) {
    document.body.appendChild(Modal3);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(Modal3);
}
if (document.body != null) {
    document.body.appendChild(Modal2);
}
if (document.documentElement != null) {
    document.documentElement.appendChild(Modal2);
}

Modal1.id = "but";
Modal2.id = "so";
Modal3.id = "anyway";