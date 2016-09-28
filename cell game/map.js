var Mymap = {
    createNew: function() {
        var mymap = {};
        var i = 0;
        var j = 0;
        mymap.size = 200;
        mymap.map = new Array();
        mymap.init = function() {
            for (i = 0; i < mymap.size; i++) {
                mymap.map[i] = new Array()
                for (j = 0; j < mymap.size; j++) {
                    mymap.map[i][j] = Cell.createNew(mymap,i,j);
                }
            }
        }
        mymap.rand = function () {
            for (i = 0; i < mymap.size; i++) {
                for (j = 0; j < mymap.size; j++) {
                    if (Math.random() > 0.5) {
                        mymap.map[i][j].live = 1;
                    }else {
                        mymap.map[i][j].live = 0;
                    }
                }
            }
        }
        mymap.drawpic = function() {
            if ($("#mycanvas")[0] == undefined) {
                return;
            }
            var ctx = $("#mycanvas")[0].getContext("2d");
            ctx.clearRect(0,0,600,600)
            for (i = 0; i < mymap.size; i++) {
                for (j = 0; j < mymap.size; j++) {
                    if (mymap.map[i][j].live) {
                        ctx.beginPath();
                        ctx.arc(i * (550 / mymap.size) + 25,j * (550 / mymap.size) + 25, (200 / mymap.size), 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = 'rgba(255, 0, 0, 0.75)';
                        ctx.fill();
                    }
                }
            }
        }
        mymap.update = function () {
            for (i = 0; i < mymap.size; i++) {
                for (j = 0; j < mymap.size; j++) {
                    mymap.map[i][j].proc();
                }
            }
            for (i = 0; i < mymap.size; i++) {
                for (j = 0; j < mymap.size; j++) {
                    mymap.map[i][j].live = mymap.map[i][j].futurelive;
                }
            }
        }
        return mymap
    }
};

var Cell = {
    createNew: function(mymap,i,j) {
        var cell = {};
        cell.x = i;
        cell.y = j;
        cell.live = 0;
        cell.futurelive = 0;
        cell.themap = mymap;
        cell.proc = function () {
            sum = mymap.map[(i + mymap.size -1) % mymap.size][(j + mymap.size -1) % mymap.size].live
            + mymap.map[(i + mymap.size -1) % mymap.size][j].live
            + mymap.map[(i + mymap.size -1) % mymap.size][(j + 1) % mymap.size].live
            + mymap.map[i][(j + mymap.size -1) % mymap.size].live
            + mymap.map[i][(j + 1) % mymap.size].live
            + mymap.map[(i + 1) % mymap.size][(j + mymap.size -1) % mymap.size].live
            + mymap.map[(i + 1) % mymap.size][j].live
            + mymap.map[(i + 1) % mymap.size][(j + 1) % mymap.size].live
            if (sum == 3) {
                cell.futurelive = 1;
            }else {
                if (sum == 2) {
                    cell.futurelive = cell.live;
                }else{
                    cell.futurelive = 0;
                }
            }
        }
        return cell;
    }
};

var mymap = Mymap.createNew();

$(function() {
    mymap.init();
    mymap.rand();
    window.setInterval(function () {
        mymap.update();
        mymap.drawpic();
    },100)
});
