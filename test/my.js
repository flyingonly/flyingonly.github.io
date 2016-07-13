var playerpos = {
    x: 140,
    y: 70
}

var groundtype = 0;
var src = [
    ['1610.png', '1812.png', '1781.png', '1754.png'],
    ['1616.png', '1820.png', '1783.png', '1767.png'],
    ['1618.png', '1819.png', '1787.png', '1761.png'],
    ['1622.png', '1816.png', '1784.png', '1756.png']
]
var img = new Image();
img.src = src[groundtype][0];
var rock = new Image();
rock.src = src[groundtype][1];
var rift = new Image();
rift.src = src[groundtype][2];
var img1 = new Image();
img1.src = src[groundtype][3];

var finalimg = new Image();
finalimg.src = '1281.png'
var bullet1 = new Image();
bullet1.src = '1654.png'
var holeimg = new Image();
holeimg.src = '1752.png'
var img2 = new Image();
img2.src = '577.png';
var img4 = new Image();
img4.src = '1673.png';
var bloodimg = new Image();
bloodimg.src = '2300.png';
var protect = new Image();
protect.src = '452.png'
var monstroimg = new Image();
monstroimg.src = '13.png';
var head = new Image();
head.src = '564.png'
var startimg = new Image();
startimg.src = '2258.png';
var deathimg = new Image();
deathimg.src = '2120.png';
var endimg = new Image();
endimg.src = '2282.png';
var endimg1 = new Image();
endimg1.src = '2294.png';
var totalendimg = new Image();
totalendimg.src = '2247.png';
var totalendimg1 = new Image();
totalendimg1.src = '1671.png';
var enemyimg = new Array(100)
var itemimg = new Array(100)
for (var i = 0; i < 100; i++) {
    itemimg[i] = new Image();
}
itemimg[1].src = '940.png';
itemimg[2].src = '929.png';
itemimg[3].src = '926.png';
itemimg[4].src = '1226.png';

for (var i = 0; i < 100; i++) {
    enemyimg[i] = new Image();
}
enemyimg[1].src = '1428.png';
enemyimg[2].src = '1392.png';
enemyimg[3].src = '1378.png';
var mapnew;
var sh;
var state = 0;
const unitblockx = (268.2 - 30) / 13;
const unitblocky = (124.5 - 23) / 7;
var playerAttackThrough = false;
var bullet = new Array(100);
var bulletchose = 0;
var bulletsta = 0;
var bulleton = 0;
var attack = 20;
var playerdireciton = 1;
var headsx = [97, 1, 97, 65];
var headsy = [32, 1, 65, 1];
var headwidth = 29;
var headheight = 26;
for (var i = 0; i < 100; i++) {
    bullet[i] = new Object();
    bullet[i].show = false;
    bullet[i].direction = 0; //1,2,3,4分别上，下，左，右
    bullet[i].x = 0;
    bullet[i].y = 0;
    bullet[i].img = img4;
    bullet[i].sx = 202;
    bullet[i].sy = 9;
    bullet[i].width = 13;
    bullet[i].height = 13;
}
var playerwidth = 19;
var playerheight = 13;
var playerfly = false;
var attackmode = 1;
var playerhealth = 12;
var attackdelay = 15;
var hurtable = true;

var EnemyBullet = {
    createNew: function() {
        var enemyBullet = {};
        enemyBullet.type = 0;
        enemyBullet.show = false;
        enemyBullet.img = "";
        enemyBullet.x = 0;
        enemyBullet.y = 0;
        enemyBullet.sx = 0;
        enemyBullet.sy = 0;
        enemyBullet.width = 0;
        enemyBullet.height = 0;
        enemyBullet.Xspeed = 0;
        enemyBullet.Yspeed = 0;
        enemyBullet.attack = 0;

        enemyBullet.init = function(t) {
            this.type = t;
            switch (t) {
                case 1:
                    this.img = img4;
                    this.sx = 202;
                    this.sy = 9;
                    this.width = 13;
                    this.height = 13;
                    this.attack = 1;
                    this.show = true;
                    break;
                default:
                    break;
            }
        }

        return enemyBullet;
    }
}


var enemy = {
    createNew: function() {　　　　　　
        var enemy = {};　　　　　　
        enemy.class = 1;
        enemy.attackforce = 1;
        enemy.health = 0;　　　　　　
        enemy.speed = 2;
        enemy.sx = 0;
        enemy.sy = 0;
        enemy.width = 0;
        enemy.height = 0;
        enemy.x = 100;
        enemy.y = 50;　
        enemy.img = null;　
        enemy.sta = 0;　
        enemy.count = 0;　
        enemy.the = 0;
        enemy.attackType = 0;
        enemy.attackdelay = 0;
        enemy.attackstate = 0;
        enemy.attack = function(t) {
            switch (t) {
                case 1:
                    for (var i = 0; i <= enemyBulletGroup.length; i++) {
                        if (i == enemyBulletGroup.length) {
                            enemyBulletGroup[i] = EnemyBullet.createNew();
                        }
                        if (enemyBulletGroup[i].show == false) {
                            enemyBulletGroup[i].init(1);
                            enemyBulletGroup[i].x = this.x;
                            enemyBulletGroup[i].y = this.y;
                            var dx = playerpos.x - this.x;
                            var dy = playerpos.y - this.y;
                            enemyBulletGroup[i].Xspeed = dx / (Math.sqrt(dx * dx + dy * dy));
                            enemyBulletGroup[i].Yspeed = dy / (Math.sqrt(dx * dx + dy * dy));
                            break;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        enemy.init = function(t) {
            enemy.class = t;
            enemy.img = enemyimg[t];
            switch (t) {
                case 1:
                    enemy.sx = [6, 54, 97, 54, 97];
                    enemy.sy = [1, 1, 1, 49, 49];
                    enemy.height = 45;
                    enemy.width = 42;
                    enemy.health = 100;
                    enemy.speed = 1;
                    break;
                case 2:
                    enemy.sx = [2, 2, 2, 0, 0];
                    enemy.sy = [2, 2, 2, 0, 0];
                    enemy.height = 30;
                    enemy.width = 30;
                    enemy.health = 50;
                    enemy.speed = 0;
                    enemy.attackType = 1;
                    enemy.attackdelay = 50;
                    break;
                case 3:
                    enemy.sx = [4, 35, 35, 35, 35];
                    enemy.sy = [0, 1, 17, 33, 49];
                    enemy.height = 15;
                    enemy.width = 25;
                    enemy.health = 50;
                    enemy.speed = 1;
                    break;
                default:
                    break;
            }
        }
        return enemy;
    }
};


var enemyBulletGroup = [];


const enemyTypeNumber = 3;
const itemTypeNumber = 4;
const bossTypeNumber = 1;

const blockPattern = [
    [
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]
    ],

    [
        [-1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
];



var Item = {
    createNew: function() {
        var item = new Object();
        item.name = "";
        item.type = 0;
        item.attackAdd = 0;
        item.hpAdd = 0;
        item.attackSpeedAdd = 0;
        item.speedAdd = 0;
        item.img = "";
        item.exist = false;
        item.init = function(t) {
            this.type = t;
            this.img = itemimg[t];
            switch (t) {
                case 1:
                    this.hpAdd = 2;
                    this.name = "OneHeart";
                    break;
                case 2:
                    this.attackAdd = 5;
                    this.name = "AttackUp";
                    break;
                case 3:
                    this.attackSpeedAdd = 5;
                    this.name = "AttackSpeedUp"
                    break;
                case 4:
                    this.attackThrough = true;
                    break;
                default:
                    break;
            }
            this.exist = true;
        }
        item.randomInit = function() {
            this.init(Math.floor(Math.random() * itemTypeNumber) + 1);
        }
        item.got = function() {
            //player属性改变
            attack += this.attackAdd;
            playerhealth += this.hpAdd;
            attackdelay -= this.attackSpeedAdd;
            if (this.attackThrough) {
                playerAttackThrough = true;
            }
            this.exist = false;
        }

        return item;
    }
}
var Boss = {
    createNew: function() {
        var boss = {};
        boss.name = ""
        boss.type = 0;
        boss.health = 0;
        boss.img = "";
        boss.x = 100;
        boss.y = 50;
        boss.sx = 0;
        boss.sy = 0;
        boss.height = 70;
        boss.width = 140;
        boss.speed = 0;
        boss.attackforce = 0;
        boss.init = function(t) {
            this.type = t;
            switch (t) {
                case 1:
                    this.name = "BOSS1";
                    this.attackforce = 6;
                    this.health = 1000;
                    this.img = monstroimg;
                    this.sx = [167, 1, 88, 166, 328, 86];
                    this.sy = [60, 187, 149, 156, 36, 66];
                    this.height = 66;
                    this.width = 51;
                    this.width1 = [66, 77, 64, 66, 64, 66];
                    this.height1 = [51, 36, 74, 67, 76, 46];
                    this.jumpClock = 0;
                    this.smallJumpState = 0;
                    this.bigJumpState = 0;
                    this.smallJumpStateClock = 0;
                    this.bigJumpStateClock = 0;
                    this.jumpSpeedX = 0;
                    this.jumpSpeedY = 0;
                    this.attack = function() {
                        this.jumpClock = (this.jumpClock + 1) % 351;
                        if (this.smallJumpStateClock > 0) {
                            this.smallJumpStateClock--;
                            this.smallJumpState = Math.ceil(this.smallJumpStateClock / 10);
                            if (this.smallJumpState == 4) {
                                this.y -= 3;
                            }
                            if (this.smallJumpState == 2) {
                                this.y += 3;
                            }
                            if (this.smallJumpState >= 2 && this.smallJumpState <= 4) {
                                this.x += this.jumpSpeedX;
                                this.y += this.jumpSpeedY;
                            }
                        }
                        if (this.bigJumpStateClock > 0) {
                            this.bigJumpStateClock--;
                            this.bigJumpState = Math.ceil(this.bigJumpStateClock / 20);
                            if (this.bigJumpState == 4) {
                                this.y -= 10;
                            }
                            if (this.bigJumpState == 2) {
                                this.y += 10;
                            }
                            if (this.bigJumpState == 3) {
                                this.x += this.jumpSpeedX;
                                this.y += this.jumpSpeedY;
                            }
                        }
                        if (this.jumpClock == 50 || this.jumpClock == 150) {
                            this.smallJumpStateClock = 50;
                            var dx = playerpos.x - this.x - (this.width - playerwidth) * 0.3;
                            var dy = playerpos.y - this.y - (this.height - playerheight) * 0.5;
                            var dis = 80;
                            if (Math.sqrt(dx * dx + dy * dy) < dis) {
                                dis = Math.sqrt(dx * dx + dy * dy);
                            }
                            this.jumpSpeedX = dx / Math.sqrt(dx * dx + dy * dy) * dis / 30;
                            this.jumpSpeedY = dy / Math.sqrt(dx * dx + dy * dy) * dis / 30;
                        }
                        if (this.jumpClock == 250) {
                            this.bigJumpStateClock = 100;
                            var dx = playerpos.x - this.x - (this.width - playerwidth) * 0.3;
                            var dy = playerpos.y - this.y - (this.height - playerheight) * 0.5;
                            this.jumpSpeedX = dx / 20;
                            this.jumpSpeedY = dy / 20;
                        }

                    }
                    break;
                default:
                    break;
            }
        }
        boss.randomInit = function() {
            this.init(Math.floor(Math.random() * bossTypeNumber) + 1);
        }

        return boss;
    }
}

var Room = {
    createNew: function() {
        var room = {};
        room.number = 0;
        room.haveDoor = [false, false, false, false];
        room.mapX;
        room.mapY;
        room.floorNumber = 0;
        room.enemyNumber = 0;
        room.enemyClear = false;
        room.blockMap = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        room.enemies = [];
        room.blockMapInit = function() {
            if (this.number != 1) {
                var pattern1 = Math.floor(Math.random() * blockPattern.length);
                var pattern2, pattern3;
                do {
                    pattern2 = Math.floor(Math.random() * blockPattern.length);
                    pattern3 = Math.floor(Math.random() * blockPattern.length);
                } while (pattern1 == pattern2 || pattern1 == pattern3 || pattern2 == pattern3)
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 13; j++) {
                        this.blockMap[i][j] = blockPattern[pattern1][i][j] + blockPattern[pattern2][i][j] + blockPattern[pattern3][i][j];
                    }
                }
            }
        }
        room.enemiesInit = function() {
            if (this.number == 1) {
                this.enemyNumber = 1;
                var newBoss = Boss.createNew();
                newBoss.randomInit();
                this.enemies[0] = newBoss;
            } else {
                this.enemyNumber = Math.floor(Math.random() * 6) + 1;
                for (var i = 0; i < this.enemyNumber; i++) {
                    var newEnemy = enemy.createNew();
                    newEnemy.init(Math.floor(Math.random() * enemyTypeNumber) + 1);
                    var blockX, blockY;
                    do {
                        blockX = Math.floor(Math.random() * 5) + 1;
                        blockY = Math.floor(Math.random() * 11) + 1;
                    } while (this.blockMap[blockX][blockY] != 0)
                    newEnemy.x = (268.2 - 30) / 13 * blockY + 30 - newEnemy.width * 0.6 / 2 + 0.5 * unitblockx;
                    newEnemy.y = (124.5 - 23) / 7 * blockX + 23 - newEnemy.height * 0.5 / 2 + 0.5 * unitblocky;
                    this.enemies[i] = newEnemy;
                }
            }
        }
        room.init = function() {
            this.blockMapInit();
            this.enemiesInit();
        }

        return room;
    }
}

var Floor = {
    createNew: function() {
        var floor = {};
        floor.number = 0;
        floor.name = "";
        floor.itemInfo = [];
        floor.map = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        floor.rooms = [];
        floor.mapInit = function() {
            //第一个房间：boss房
            var bossRoomX, bossRoomY;
            bossRoomX = Math.floor(Math.random() * 6);
            if (bossRoomX >= 1 && bossRoomX <= 5) {
                bossRoomY = Math.floor(Math.random() * 2) * 6;
            } else {
                bossRoomY = Math.floor(Math.random() * 5) + 1;
            }
            this.map[bossRoomX][bossRoomY] = 1;
            //第二个房间
            var currentX, currentY;
            if (bossRoomX == 0) {
                currentX = 1;
                currentY = bossRoomY;
                this.map[1][bossRoomY] = 2;
            } else if (bossRoomX == 6) {
                currentX = 5;
                currentY = bossRoomY;
                this.map[5][bossRoomY] = 2;
            } else if (bossRoomY == 0) {
                currentX = bossRoomX;
                currentY = 1;
                this.map[bossRoomX][1] = 2;
            } else if (bossRoomY == 6) {
                currentX = bossRoomX;
                currentY = 5;
                this.map[bossRoomX][5] = 2;
            }
            //第三到第十个房间
            for (var roomNumber = 3; roomNumber <= 10; roomNumber++) {
                var direction = Math.floor(Math.random() * 4);
                var loopCount = 0;
                while (loopCount <= 4) {
                    if (direction == 0) {
                        if ((currentX - 1) >= 1 && (currentX - 1) <= 5 && this.map[currentX - 1][currentY] == 0) {
                            this.map[currentX - 1][currentY] = roomNumber;
                            currentX = currentX - 1;
                            break;
                        }
                    } else if (direction == 1) {
                        if ((currentY + 1) >= 1 && (currentY + 1) <= 5 && this.map[currentX][currentY + 1] == 0) {
                            this.map[currentX][currentY + 1] = roomNumber;
                            currentY = currentY + 1;
                            break;
                        }
                    } else if (direction == 2) {
                        if ((currentX + 1) >= 1 && (currentX + 1) <= 5 && this.map[currentX + 1][currentY] == 0) {
                            this.map[currentX + 1][currentY] = roomNumber;
                            currentX = currentX + 1;
                            break;
                        }
                    } else if (direction == 3) {
                        if ((currentY - 1) >= 1 && (currentY - 1) <= 5 && this.map[currentX][currentY - 1] == 0) {
                            this.map[currentX][currentY - 1] = roomNumber;
                            currentY = currentY - 1;
                            break;
                        }
                    }
                    direction = (direction + 1) % 4;
                    loopCount++;
                }
                if (loopCount == 5) {
                    for (var i = 0; i < 7; i++) {
                        for (var j = 0; j < 7; j++) {
                            this.map[i][j] = 0;
                        }
                    }
                    this.mapInit();
                    return;
                }
            }
        }
        floor.roomsInit = function() {
            for (var i = 1; i <= 10; i++) {
                var newRoom = Room.createNew();
                newRoom.number = i;
                newRoom.init();
                this.rooms[i] = newRoom;
            }
            for (var j = 0; j < 7; j++) {
                for (var k = 0; k < 7; k++) {
                    if (this.map[j][k] > 0) {
                        this.rooms[this.map[j][k]].mapX = j;
                        this.rooms[this.map[j][k]].mapY = k;
                        if ((j - 1) >= 0 && this.map[j - 1][k] > 0) {
                            this.rooms[this.map[j][k]].haveDoor[0] = true;
                        }
                        if ((k + 1) < 7 && this.map[j][k + 1] > 0) {
                            this.rooms[this.map[j][k]].haveDoor[1] = true;
                        }
                        if ((j + 1) < 7 && this.map[j + 1][k] > 0) {
                            this.rooms[this.map[j][k]].haveDoor[2] = true;
                        }
                        if ((k - 1) >= 0 && this.map[j][k - 1] > 0) {
                            this.rooms[this.map[j][k]].haveDoor[3] = true;
                        }
                    }
                }
            }
        }
        floor.itemInit = function() {
            var newItem1 = Item.createNew();
            var newItem2 = Item.createNew();
            newItem1.randomInit();
            newItem2.randomInit();
            this.itemInfo[0] = newItem1;
            this.itemInfo[1] = Math.floor(Math.random() * 9) + 2;
            this.itemInfo[2] = newItem2;
        }
        floor.init = function(floorNumber) {
            this.mapInit();
            this.roomsInit();
            this.itemInit();
            this.number = floorNumber;
            groundtype = floorNumber - 1;
            img.src = src[groundtype][0];
            rock.src = src[groundtype][1];
            rift.src = src[groundtype][2];
            img1.src = src[groundtype][3];
        }

        return floor;
    }
};

var currentfloor = Floor.createNew();
currentfloor.init(1);
var currentroom = currentfloor.rooms[10];
mapnew = mapprocess(currentroom);

const maxfloor = 2;

var testenemy = enemy.createNew();
testenemy.init(1);

const miny = 23
const minx = 30;
const maxy = 118;
const maxx = 258;

var sh;

function run() {
    var canvas = document.getElementById("tutorial");
    var context = canvas.getContext("2d");
    context.drawImage(startimg, 0, 0, 478, 270, 0, 0, 300, 150);
    context.drawImage(startimg, 0, 280, 478, 100, 0, 0, 300, 63);
    context.drawImage(startimg, 0, 380, 164, 145, 95, 55, 100, 70);
}

var upmove = false;
var downmove = false;
var leftmove = false;
var rightmove = false;

function enemymove(enemy) {
    if (enemy.health == 0) {
        return;
    }
    var dx = playerpos.x - enemy.x - enemy.width * 0.6 / 2;
    var dy = playerpos.y - enemy.y - enemy.height * 0.5 / 2;
    if (dx * dx + dy * dy < 1600) {
        the = Math.atan(dx / dy);
        if (the < 0) {
            the = the + Math.PI;
        }
        if (dx > 0) {
            enemy.x = enemy.x + enemy.speed * Math.sin(the);
            var b = blockofroom(enemy.x, enemy.y, enemy.width, enemy.height);
            if (currentroom.blockMap[b[0]][b[1]] != 0) {
                enemy.x = enemy.x - enemy.speed * Math.sin(the);

            }
            enemy.y = enemy.y + enemy.speed * Math.cos(the);
            var b = blockofroom(enemy.x, enemy.y, enemy.width, enemy.height);
            if (currentroom.blockMap[b[0]][b[1]] != 0) {

                enemy.y = enemy.y - enemy.speed * Math.cos(the);
            }
        } else {
            enemy.x = enemy.x - enemy.speed * Math.sin(the);
            var b = blockofroom(enemy.x, enemy.y, enemy.width, enemy.height);
            if (currentroom.blockMap[b[0]][b[1]] != 0) {
                enemy.x = enemy.x + enemy.speed * Math.sin(the);

            }
            enemy.y = enemy.y - enemy.speed * Math.cos(the);
            var b = blockofroom(enemy.x, enemy.y, enemy.width, enemy.height);
            if (currentroom.blockMap[b[0]][b[1]] != 0) {

                enemy.y = enemy.y + enemy.speed * Math.cos(the);
            }
        }
    } else {
        if (enemy.sta == 3) {
            enemy.the = Math.random() * 2 * Math.PI;
        }
        rate = 0.5;
        enemy.x = enemy.x + enemy.speed * rate * Math.sin(enemy.the);
        var b = blockofroom(enemy.x, enemy.y, enemy.width, enemy.height);
        if (currentroom.blockMap[b[0]][b[1]] != 0) {
            enemy.x = enemy.x - enemy.speed * rate * Math.sin(enemy.the);

        }
        enemy.y = enemy.y + enemy.speed * rate * Math.cos(enemy.the);
        var b = blockofroom(enemy.x, enemy.y, enemy.width, enemy.height);
        if (currentroom.blockMap[b[0]][b[1]] != 0) {

            enemy.y = enemy.y - enemy.speed * rate * Math.cos(enemy.the);
        }
        if (enemy.x < minx) {
            enemy.x = minx;
        }
        if (enemy.x > maxx - enemy.width * 0.3) {
            enemy.x = maxx - enemy.width * 0.3;
        }
        if (enemy.y < miny) {
            enemy.y = miny;
        }
        if (enemy.y > maxy - enemy.height * 0.25) {
            enemy.y = maxy - enemy.height * 0.25;
        }

    }
    const shift = 2;
    for (var i = 0; i < currentroom.enemyNumber; i++) {
        if (currentroom.enemies[i].health > 0) {
            var dx = currentroom.enemies[i].x - enemy.x;
            var dy = currentroom.enemies[i].y - enemy.y;
            if (dx * dx + dy * dy < 80 && dx * dx + dy * dy > 0) {
                the = Math.atan(dx / dy);
                if (the < 0) {
                    the = the + Math.PI;
                }
                if (dx > 0) {
                    enemy.x = enemy.x - shift * Math.sin(the);
                    enemy.y = enemy.y - shift * Math.cos(the);
                    currentroom.enemies[i].x = currentroom.enemies[i].x + shift * Math.sin(the);
                    currentroom.enemies[i].y = currentroom.enemies[i].y + shift * Math.sin(the);
                } else {
                    enemy.x = enemy.x + shift * Math.sin(the);
                    enemy.y = enemy.y + shift * Math.cos(the);
                    currentroom.enemies[i].x = currentroom.enemies[i].x - shift * Math.sin(the);
                    currentroom.enemies[i].y = currentroom.enemies[i].y - shift * Math.sin(the);
                }
            }


        }
    }
    if (enemy.x < minx) {
        enemy.x = minx;
    }
    if (enemy.y + enemy.height / 2 < miny) {
        enemy.y = miny - enemy.height / 2;
    }
    if (hurtable && playerpos.x > enemy.x - playerwidth * 0.6 + 2 && playerpos.x < enemy.x + enemy.width * 0.6 - 2 && playerpos.y < enemy.y + enemy.height * 0.5 - 2 && playerpos.y > enemy.y - playerheight * 0.5 + 2) {
        hurtable = false;
        setTimeout(function() {
            hurtable = true;
        }, 2000)
        playerhealth-=enemy.attackforce;
    }
}

function shoot() {
    if (bulleton) {
        if (bulletsta == 0) {
            while (true) {
                if (bullet[bulletchose].show) {
                    bulletchose++;
                    bulletchose = bulletchose % 100;
                } else {
                    break;
                }
            }
            bullet[bulletchose].direction = bulleton;
            bullet[bulletchose].show = true;
            bullet[bulletchose].x = playerpos.x;
            bullet[bulletchose].y = playerpos.y;
            if (playerAttackThrough) {
                bullet[bulletchose].img = bullet1;
            }
            if (!playerAttackThrough) {
                bullet[bulletchose].img = img4;
            }
        }
        bulletsta = (bulletsta + 1) % attackdelay;
    }
}

function judge(bullet, enemy) {
    if (enemy.health > 0) {
        if (bullet.x > enemy.x - bullet.width * 0.6 + 3 && bullet.y > enemy.y - bullet.height * 0.5 + 2 && bullet.y < enemy.y + enemy.height * 0.5 - 2 && bullet.x < enemy.x + enemy.width * 0.6 - 3) {
            enemy.health = enemy.health - attack;
            bullet.x = 0;
            bullet.y = 0;
            bullet.direction = 0;
            bullet.show = false;
        }
    }
    return false;
}

var roomchanging = 0;
var changedirect = 0;
var nextroom;
var nextmap;

function roomchange(direc) {
    for (var i = 0; i < 100; i++) {
        bullet[i].x = 0;
        bullet[i].y = 0;
        bullet[i].direction = 0;
        bullet[i].show = false;
    }
    for (var i = 0; i < enemyBulletGroup.length; i++) {
        enemyBulletGroup[i].x = 0;
        enemyBulletGroup[i].y = 0;

        enemyBulletGroup[i].show = false;
    }
    changedirect = direc;
    if (direc != 0) {
        roomchanging = 30;
    }

    switch (direc) {
        case 1:
            nextroom = currentfloor.rooms[currentfloor.map[currentroom.mapX - 1][currentroom.mapY]];
            nextmap = mapprocess(nextroom);
            playerpos.y = -150 + maxy + 5;
            playerpos.x = 150 - playerwidth * 0.6 / 2;
            break;
        case 2:
            nextroom = currentfloor.rooms[currentfloor.map[currentroom.mapX + 1][currentroom.mapY]];
            nextmap = mapprocess(nextroom);
            playerpos.y = 150 + miny - 5;
            playerpos.x = 150 - playerwidth * 0.6 / 2;
            break;
        case 3:
            nextroom = currentfloor.rooms[currentfloor.map[currentroom.mapX][currentroom.mapY - 1]];
            nextmap = mapprocess(nextroom);
            playerpos.x = -300 + maxx + 10;
            playerpos.y = 75 - playerheight * 0.5 / 2;
            break;
        case 4:
            nextroom = currentfloor.rooms[currentfloor.map[currentroom.mapX][currentroom.mapY + 1]];
            nextmap = mapprocess(nextroom);
            playerpos.x = 300 + minx - 10;
            playerpos.y = 75 - playerheight * 0.5 / 2;
            break;
        default:

            break;
    }
    if (nextroom.number == 1) {
        console.log(nextroom.enemies[0]);
    }
}
const updoor = [142.5, 157.5];
const leftdoor = [69.5, 80.5];

function mapprocess(currentroom) {
    var ans = new Array(7);
    for (var i = 0; i < 7; i++) {
        ans[i] = new Array(13);
    }
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 13; j++) {
            if (currentroom.blockMap[i][j] == 1) {
                var s = Math.floor((Math.random() * 3));
                ans[i][j] = new Object();
                ans[i][j].x = 32 * s + 3;
                ans[i][j].y = 1;
            }
            if (currentroom.blockMap[i][j] == -1) {
                var type = 0;
                if (i < 1 || currentroom.blockMap[i - 1][j] != -1) {
                    type = type + 1000;
                }
                if (i > 5 || currentroom.blockMap[i + 1][j] != -1) {
                    type = type + 100;
                }
                if (j < 1 || currentroom.blockMap[i][j - 1] != -1) {
                    type = type + 10;
                }
                if (j > 11 || currentroom.blockMap[i][j + 1] != -1) {
                    type = type + 1;
                }
                ans[i][j] = new Object();
                switch (type) {
                    case 0: //上下左右的顺序 0,27,52,79,103  0,27,52,78,105,131,157,183,207
                        ans[i][j].x = 79;
                        ans[i][j].y = 78;
                        break;
                    case 101:
                        ans[i][j].x = 0;
                        ans[i][j].y = 52;
                        console.log([i, j]);
                        break;
                    case 100:
                        ans[i][j].x = 0;
                        ans[i][j].y = 105;
                        break;
                    case 1000:
                        ans[i][j].x = 52;
                        ans[i][j].y = 52;
                        break;
                    case 1010:
                        ans[i][j].x = 52;
                        ans[i][j].y = 27;
                        break;
                    case 110:
                        ans[i][j].x = 27;
                        ans[i][j].y = 52;
                        break;
                    case 10:
                        ans[i][j].x = 27;
                        ans[i][j].y = 105;
                        break;
                    case 1001:
                        ans[i][j].x = 79;
                        ans[i][j].y = 27;
                        break;
                    case 1:
                        ans[i][j].x = 79;
                        ans[i][j].y = 52;
                        break;
                    case 1100:
                        ans[i][j].x = 0;
                        ans[i][j].y = 27;
                        break;
                    case 111:
                        ans[i][j].x = 79;
                        ans[i][j].y = 0;
                        break;
                    case 11:
                        ans[i][j].x = 27;
                        ans[i][j].y = 157;
                        break;
                    case 1110:
                        ans[i][j].x = 0;
                        ans[i][j].y = 0;
                        break;
                    case 1101:
                        ans[i][j].x = 52;
                        ans[i][j].y = 0;
                        break;
                    case 1011:
                        ans[i][j].x = 27;
                        ans[i][j].y = 0;
                        break;
                    default:
                        ans[i][j].x = 79;
                        ans[i][j].y = 78;
                        break;
                }

            }
        }
    }
    return ans;
}

function blockofroom(x, y, width, height) {
    ans = [0, 0];
    ans[1] = Math.floor((x + width * 0.6 / 2 - 30) / unitblockx);
    if (ans[1] >= 13) {
        ans[1] = 12;
    }
    if (ans[1] <= 0) {
        ans[1] = 0;
    }
    ans[0] = Math.floor((y + height * 0.5 * 3 / 4 - 23) / unitblocky);
    if (ans[0] >= 7) {
        ans[0] = 6;
    }
    if (ans[0] <= 0) {
        ans[0] = 0;
    }
    return ans;
}

function drawroom(context, x, y, currentroom, mapnew) {
    context.translate(x, y);
    context.drawImage(img, 0, 0, 233, 156, 0, 0, 150, 75);
    context.save();
    context.translate(150, 75);
    context.rotate(Math.PI);
    context.drawImage(img, 0, 0, 233, 156, -150, -75, 150, 75);
    context.restore();
    context.save();
    context.translate(300, 0);
    context.scale(-1, 1);
    context.drawImage(img, 235, 0, 233, 156, 0, 0, 150, 75);
    context.restore();
    context.save();
    context.translate(0, 150);
    context.scale(1, -1);
    context.drawImage(img, 235, 0, 233, 156, 0, 0, 150, 75);
    context.restore();
    //绘制门
    if (currentroom.haveDoor[0]) {
        context.drawImage(img1, 8, 9, 49, 42, 135.5, 8, 29.4, 21);
        if (currentroom.enemyClear || roomchanging != 0) {
            context.drawImage(img1, 83, 16, 25, 22, 142.5, 12.5, 15, 11);
        } else {
            context.drawImage(img1, 19, 64, 13, 22, 142.5, 12.5, 7.5, 11);
            context.drawImage(img1, 96, 64, 13, 22, 150, 12.5, 7.5, 11);
        }

    }
    if (currentroom.haveDoor[2]) {
        context.save();
        context.translate(0, 150);
        context.scale(1, -1);
        context.drawImage(img1, 8, 9, 49, 42, 135.5, 8, 29.4, 21);
        if (currentroom.enemyClear || roomchanging != 0) {
            context.drawImage(img1, 83, 16, 25, 22, 142.5, 12.5, 15, 11);
        } else {
            context.drawImage(img1, 19, 64, 13, 22, 142.5, 12.5, 7.5, 11);
            context.drawImage(img1, 96, 64, 13, 22, 150, 12.5, 7.5, 11);
        }

        context.restore();
    }
    if (currentroom.haveDoor[1]) {
        context.save();
        context.rotate(Math.PI / 2);
        context.drawImage(img1, 8, 9, 49, 42, 64.5, -290, 21, 29.4);
        if (currentroom.enemyClear || roomchanging != 0) {
            context.drawImage(img1, 83, 16, 25, 22, 69, -283.7, 11, 15);
        } else {
            context.drawImage(img1, 19, 64, 13, 22, 69, -283.7, 5.5, 15);
            context.drawImage(img1, 96, 64, 13, 22, 75.1, -283.7, 5.5, 15);
        }
        context.restore();
    }
    if (currentroom.haveDoor[3]) {
        context.save();
        context.rotate(-Math.PI / 2);
        context.drawImage(img1, 8, 9, 49, 42, -85.5, 10, 21, 29.4);
        if (currentroom.enemyClear || roomchanging != 0) {
            context.drawImage(img1, 83, 16, 25, 22, -81, 16.3, 11, 15);
        } else {
            context.drawImage(img1, 19, 64, 13, 22, -81, 16.3, 5.5, 15);
            context.drawImage(img1, 96, 64, 13, 22, -75.5, 16.3, 5.5, 15);
        }
        context.restore();
    }
    //绘制地形
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 13; j++) {
            if (currentroom.blockMap[i][j] == 1) {
                context.drawImage(rock, mapnew[i][j].x, mapnew[i][j].y, 24, 29, unitblockx * j + 30, unitblocky * i + 23, unitblockx, unitblocky);
            }
            if (currentroom.blockMap[i][j] == -1) {
                context.drawImage(rift, mapnew[i][j].x, mapnew[i][j].y, 25, 25, unitblockx * j + 30, unitblocky * i + 23, unitblockx, unitblocky);
            }
        }
    }
    context.translate(-x, -y);
}

function start() {
    if (playerhealth <= 0) {
        state = 2;
        clearInterval(sh);
    }
    if (roomchanging == 1) {
        currentroom = nextroom;
        mapnew = nextmap;
        roomchanging--;
        return;
    }
    var canvas = document.getElementById("tutorial");
    var context = canvas.getContext("2d");

    if (roomchanging >= 2) {

        switch (changedirect) {
            case 1:
                drawroom(context, 0, 150 - 5 * roomchanging, currentroom, mapnew);
                drawroom(context, 0, -5 * roomchanging, nextroom, nextmap);
                playerpos.y = playerpos.y + 5;
                break;
            case 2:
                drawroom(context, 0, -150 + 5 * roomchanging, currentroom, mapnew);
                drawroom(context, 0, 5 * roomchanging, nextroom, nextmap);
                playerpos.y = playerpos.y - 5;
                break;
            case 3:
                drawroom(context, 300 - 10 * roomchanging, 0, currentroom, mapnew);
                drawroom(context, -10 * roomchanging, 0, nextroom, nextmap);
                playerpos.x = playerpos.x + 10;
                break;
            case 4:
                drawroom(context, -300 + 10 * roomchanging, 0, currentroom, mapnew);
                drawroom(context, 10 * roomchanging, 0, nextroom, nextmap);
                playerpos.x = playerpos.x - 10;
                break;
            default:
                // statements_def
                break;
        }
        //绘制人物
        context.drawImage(img2, 7, 11, playerwidth, playerheight, playerpos.x, playerpos.y, playerwidth * 0.6, playerheight * 0.5);
        context.drawImage(head, headsx[playerdireciton], headsy[playerdireciton], headwidth, headheight, playerpos.x + playerwidth * 0.6 / 2 - headwidth * 0.6 * 0.55 + 0.2, playerpos.y - headheight * 0.5 * 0.85, headwidth * 0.6, headheight * 0.5);
        roomchanging--;
        return;
    }
    if (currentroom.enemyClear) {
        if (currentroom.haveDoor[0] && upmove && playerpos.y < miny + 1 && playerpos.x > updoor[0] - playerwidth * 0.1 && playerpos.x < updoor[1] - playerwidth * 0.1) {
            roomchange(1);
        }
        if (currentroom.haveDoor[2] && downmove && playerpos.y > maxy - 1 && playerpos.x > updoor[0] - playerwidth * 0.1 && playerpos.x < updoor[1] - playerwidth * 0.1) {
            roomchange(2);
        }
        if (currentroom.haveDoor[3] && leftmove && playerpos.x < minx + 1 && playerpos.y > leftdoor[0] - playerheight * 0.2 && playerpos.y < leftdoor[1] - playerheight * 0.2) {
            roomchange(3);
        }
        if (currentroom.haveDoor[1] && rightmove && playerpos.x > maxx - 1 && playerpos.y > leftdoor[0] - playerheight * 0.2 && playerpos.y < leftdoor[1] - playerheight * 0.2) {
            roomchange(4);
        }
    }

    var s = [playerpos.x, playerpos.y];

    if (upmove && playerpos.y > miny) {
        playerpos.y = playerpos.y - 1;
    }
    if (downmove && playerpos.y < maxy) {
        playerpos.y = playerpos.y + 1;
    }
    if (leftmove && playerpos.x > minx) {
        playerpos.x = playerpos.x - 1;
    }
    if (rightmove && playerpos.x < maxx) {
        playerpos.x = playerpos.x + 1;
    }
    var b = blockofroom(playerpos.x, playerpos.y, playerwidth, playerheight);
    if (currentroom.blockMap[b[0]][b[1]] != 0) {
        playerpos.x = s[0];
        playerpos.y = s[1];
    }

    drawroom(context, 0, 0, currentroom, mapnew);
    if (currentroom.enemyClear && currentroom.number == 1) {
        if (currentfloor.itemInfo[0].exist) {
            context.drawImage(currentfloor.itemInfo[0].img, 0, 0, 31, 31, 140.7, 90, 31 * 0.6, 31 * 0.5);
            if (playerpos.x > 140.7 - playerwidth * 0.6 + 2 && playerpos.x < 140.7 + 31 * 0.6 - 2 && playerpos.y < 90 + 31 * 0.5 - 2 && playerpos.y > 90 - 31 * 0.5 + 2) {
                currentfloor.itemInfo[0].got();
            }
        }
        if (currentfloor.number != maxfloor) {
            context.drawImage(holeimg, 16, 16, 36, 36, 139, 30, 36 * 0.6, 36 * 0.5);
        } else {
            context.drawImage(finalimg, 0, 0, 31, 60, 140.7, 30, 31 * 0.6, 60 * 0.5);
        }

        if (playerpos.x > 140.7 - playerwidth * 0.6 + 2 && playerpos.x < 140.7 + 31 * 0.6 - 2 && playerpos.y < 30 + 50 * 0.5 - 2 && playerpos.y > 30 - 50 * 0.5 + 2) {
            if (currentfloor.number == maxfloor) {
                state = 3;
                clearInterval(sh);
            }
            if (currentfloor.number != maxfloor) {
                state = 4;
                clearInterval(sh);
            }
        }
    }

    //绘制enemy
    if (currentroom.number != 1) {
        currentroom.enemyClear = true;
        for (var i = 0; i < currentroom.enemyNumber; i++) {
            if (currentroom.enemies[i].health > 0) {
                currentroom.enemyClear = false;
                context.drawImage(currentroom.enemies[i].img, currentroom.enemies[i].sx[currentroom.enemies[i].sta], currentroom.enemies[i].sy[currentroom.enemies[i].sta], currentroom.enemies[i].width, currentroom.enemies[i].height, currentroom.enemies[i].x, currentroom.enemies[i].y, currentroom.enemies[i].width * 0.6, currentroom.enemies[i].height * 0.5)
                enemymove(currentroom.enemies[i]);
                if (currentroom.enemies[i].attackType != 0) {
                    if (currentroom.enemies[i].attackstate == 0) {
                        currentroom.enemies[i].attack(currentroom.enemies[i].attackType);
                    }
                    currentroom.enemies[i].attackstate++;
                    if (currentroom.enemies[i].attackstate == currentroom.enemies[i].attackdelay) {
                        currentroom.enemies[i].attackstate = 0
                    }
                }
                currentroom.enemies[i].count++;
                if (currentroom.enemies[i].count == 4) {
                    currentroom.enemies[i].count = 0;
                    currentroom.enemies[i].sta = (currentroom.enemies[i].sta + 1) % 5;
                }
                continue;
            }

        }
    }
    if (currentroom.number == 1) {
        currentroom.enemyClear = true;
        for (var i = 0; i < currentroom.enemyNumber; i++) {
            if (currentroom.enemies[i].health > 0) {
                currentroom.enemyClear = false;
                if (i == 0) {
                    if (hurtable && currentroom.enemies[i].smallJumpState == 0 && currentroom.enemies[i].bigJumpState == 0 && playerpos.x > currentroom.enemies[i].x - playerwidth * 0.6 + 2 && playerpos.x < currentroom.enemies[i].x + currentroom.enemies[i].width * 0.6 - 2 && playerpos.y < currentroom.enemies[i].y + currentroom.enemies[i].height * 0.5 - 2 && playerpos.y > currentroom.enemies[i].y - playerheight * 0.5 + 2) {
                        hurtable = false;
                        setTimeout(function() {
                            hurtable = true;
                        }, 2000)
                        playerhealth-=currentroom.enemies[i].attackforce;
                    }
                    if (currentroom.enemies[i].bigJumpState == 0) {
                        context.drawImage(currentroom.enemies[i].img, currentroom.enemies[i].sx[currentroom.enemies[i].smallJumpState], currentroom.enemies[i].sy[currentroom.enemies[i].smallJumpState], currentroom.enemies[i].width1[currentroom.enemies[i].smallJumpState], currentroom.enemies[i].height1[currentroom.enemies[i].smallJumpState], currentroom.enemies[i].x, currentroom.enemies[i].y + 51 * 0.5 - currentroom.enemies[i].height1[currentroom.enemies[i].smallJumpState] * 0.5, currentroom.enemies[i].width1[currentroom.enemies[i].smallJumpState] * 0.6, currentroom.enemies[i].height1[currentroom.enemies[i].smallJumpState] * 0.5);
                        continue;
                    }
                    context.drawImage(currentroom.enemies[i].img, currentroom.enemies[i].sx[currentroom.enemies[i].bigJumpState], currentroom.enemies[i].sy[currentroom.enemies[i].bigJumpState], currentroom.enemies[i].width1[currentroom.enemies[i].bigJumpState], currentroom.enemies[i].height1[currentroom.enemies[i].bigJumpState], currentroom.enemies[i].x, currentroom.enemies[i].y + 51 * 0.5 - currentroom.enemies[i].height1[currentroom.enemies[i].bigJumpState] * 0.5, currentroom.enemies[i].width1[currentroom.enemies[i].bigJumpState] * 0.6, currentroom.enemies[i].height1[currentroom.enemies[i].bigJumpState] * 0.5);
                    continue;
                }
                //context.drawImage(currentroom.enemies[i].img, currentroom.enemies[i].sx, currentroom.enemies[i].sy, currentroom.enemies[i].width, currentroom.enemies[i].height, currentroom.enemies[i].x, currentroom.enemies[i].y, currentroom.enemies[i].width * 0.6, currentroom.enemies[i].height * 0.5)
                //continue;
            }
        }
        currentroom.enemies[0].attack();
    }
    for (var i = 0; i < enemyBulletGroup.length; i++) {
        if (enemyBulletGroup[i].show) {
            if (playerhealth > 0) {
                if (enemyBulletGroup[i].x > playerpos.x - enemyBulletGroup[i].width * 0.6 && enemyBulletGroup[i].y > playerpos.y - enemyBulletGroup[i].height * 0.5 && enemyBulletGroup[i].y < playerpos.y + playerheight * 0.5 && enemyBulletGroup[i].x < playerpos.x + playerwidth * 0.6) {

                    if (hurtable) {
                        playerhealth = playerhealth - 1;
                        hurtable = false;
                        setTimeout(function() {
                            hurtable = true;
                        }, 2000)
                    }

                    enemyBulletGroup[i].x = 0;
                    enemyBulletGroup[i].y = 0;
                    enemyBulletGroup[i].show = false;
                    continue;
                }
            }
            enemyBulletGroup[i].y += enemyBulletGroup[i].Yspeed;
            enemyBulletGroup[i].x += enemyBulletGroup[i].Xspeed;
            context.drawImage(enemyBulletGroup[i].img, enemyBulletGroup[i].sx, enemyBulletGroup[i].sy, enemyBulletGroup[i].width, enemyBulletGroup[i].height, enemyBulletGroup[i].x, enemyBulletGroup[i].y, enemyBulletGroup[i].width * 0.6, enemyBulletGroup[i].height * 0.5);
            var b = blockofroom(enemyBulletGroup[i].x, enemyBulletGroup[i].y, enemyBulletGroup[i].width, enemyBulletGroup[i].height);
            if (currentroom.blockMap[b[0]][b[1]] == 1) {
                enemyBulletGroup[i].x = 0;
                enemyBulletGroup[i].y = 0;
                enemyBulletGroup[i].show = false;
                continue;
            }
        } else {
            enemyBulletGroup[i].x = 0;
            enemyBulletGroup[i].y = 0;
        }
        if (enemyBulletGroup[i].x < minx || enemyBulletGroup[i].x > maxx + 10 || enemyBulletGroup[i].y < miny || enemyBulletGroup[i].y > maxy + 2) {
            enemyBulletGroup[i].x = 0;
            enemyBulletGroup[i].y = 0;

            enemyBulletGroup[i].show = false;
        }
    }

    //绘制子弹
    shoot();
    for (var i = 0; i < 100; i++) {
        if (bullet[i].show) {
            switch (bullet[i].direction) {
                case 1:
                    bullet[i].y = bullet[i].y - 2;
                    break;
                case 2:
                    bullet[i].y = bullet[i].y + 2;
                    break;
                case 3:
                    bullet[i].x = bullet[i].x - 2.4;
                    break;
                case 4:
                    bullet[i].x = bullet[i].x + 2.4;
                    break;
                default:
                    break;
            }
            if (bullet[i].img == bullet1) {
                context.save();
                switch (bullet[i].direction) {

                    case 1:
                        context.rotate(-Math.PI / 2)
                        context.drawImage(bullet[i].img, bullet[i].sx, bullet[i].sy + 64, bullet[i].width, bullet[i].height, -bullet[i].y, bullet[i].x, bullet[i].height * 0.5, bullet[i].width * 0.6);
                    case 2:
                        context.rotate(Math.PI / 2)
                        context.drawImage(bullet[i].img, bullet[i].sx, bullet[i].sy + 64, bullet[i].width, bullet[i].height, bullet[i].y, -bullet[i].x - 10, bullet[i].height * 0.5, bullet[i].width * 0.6);
                        break;
                    case 3:
                        context.rotate(Math.PI)
                        context.drawImage(bullet[i].img, bullet[i].sx, bullet[i].sy + 64, bullet[i].width, bullet[i].height, -bullet[i].x, -bullet[i].y, bullet[i].width * 0.6, bullet[i].height * 0.5);
                        break;
                    case 4:
                        context.drawImage(bullet[i].img, bullet[i].sx, bullet[i].sy + 64, bullet[i].width, bullet[i].height, bullet[i].x, bullet[i].y, bullet[i].width * 0.6, bullet[i].height * 0.5);

                        break;
                    default:
                        break;

                }
                context.restore();
            } else {
                context.drawImage(bullet[i].img, bullet[i].sx, bullet[i].sy, bullet[i].width, bullet[i].height, bullet[i].x, bullet[i].y, bullet[i].width * 0.6, bullet[i].height * 0.5);
            }

            var b = blockofroom(bullet[i].x, bullet[i].y, bullet[i].width, bullet[i].height);
            if (currentroom.blockMap[b[0]][b[1]] == 1 && bullet[i].img != bullet1) {
                bullet[i].x = 0;
                bullet[i].y = 0;
                bullet[i].direction = 0;
                bullet[i].show = false;
                continue;
            }
            for (var j = 0; j < currentroom.enemyNumber; j++) {
                judge(bullet[i], currentroom.enemies[j])
            }

        } else {
            bullet[i].x = 0;
            bullet[i].y = 0;
            bullet[i].direction = 0;
        }
        if (bullet[i].x < minx || bullet[i].x > maxx + 10 || bullet[i].y < miny || bullet[i].y > maxy + 2) {
            bullet[i].x = 0;
            bullet[i].y = 0;
            bullet[i].direction = 0;
            bullet[i].show = false;
        }
    }

    //绘制人物

    //绘制血量
    for (var i = 0; i < playerhealth; i++) {
        if (playerhealth - i >= 2) {
            context.drawImage(bloodimg, 1, 1, 13, 12, 17 + 4.5 * i, 8, 7.2, 6);
            i = i + 1;
        } else {
            context.drawImage(bloodimg, 17, 1, 13, 12, 17 + 4.5 * i, 8, 7.2, 6);
        }

    }


    context.drawImage(img2, 7, 77, playerwidth, playerheight, playerpos.x, playerpos.y, playerwidth * 0.6, playerheight * 0.5);
    context.drawImage(head, headsx[playerdireciton], headsy[playerdireciton], headwidth, headheight, playerpos.x + playerwidth * 0.6 / 2 - headwidth * 0.6 * 0.55 + 0.2, playerpos.y - headheight * 0.5 * 0.85, headwidth * 0.6, headheight * 0.5);
    if (!hurtable) {
        context.drawImage(protect, 10, 10, 42, 42, playerpos.x + playerwidth * 0.6 / 2 - headwidth * 0.6 * 0.55 - 4, playerpos.y - headheight * 0.5 * 0.85 - 2, 25.2, 21);
    }
    if (currentroom.enemyClear && currentroom.number == currentfloor.itemInfo[1] && currentfloor.itemInfo[2].exist) {
        context.drawImage(currentfloor.itemInfo[2].img, 0, 0, 31, 31, 140.7, 67.25, 31 * 0.6, 31 * 0.5);
        if (playerpos.x > 140.7 - playerwidth * 0.6 + 2 && playerpos.x < 140.7 + 31 * 0.6 - 2 && playerpos.y < 67.25 + 31 * 0.5 - 2 && playerpos.y > 67.25 - 31 * 0.5 + 2) {
            currentfloor.itemInfo[2].got();
        }
    }

    if (state == 2) {
        context.drawImage(deathimg, 200, 8, 210, 240, 87, 15, 126, 120);
        context.drawImage(deathimg, 6, 5, 20, 25, 188, 33, 12, 12.5);
        context.drawImage(deathimg, 127, 135, 61, 20, 111, 65, 36.6, 10);
        context.drawImage(deathimg, 0, 101, 30, 24, 162, 65, 18, 12);
    }
    if (state == 3) {
        context.drawImage(totalendimg1, 0, 0, 420, 239, 0, 0, 300, 150);
        context.drawImage(totalendimg, 9, 17, 100, 124, 110, 40, 80, 72);
        setTimeout(function() {
            location.reload();
        }, 3000)
    }
    if (state == 4) {
        context.drawImage(endimg1, 0, 0, 476, 268, 0, 0, 300, 150);
        context.drawImage(endimg, 0, 10, 100, 100, 118, 83, 60, 50);
        setTimeout(function() {
            for (var i = 0; i < 100; i++) {
                bullet[i].show = false;

            }
            for (var i = 0; i < enemyBulletGroup.length; i++) {
                enemyBulletGroup[i].show = false;
            }
            playerpos = {
    			x: 140,
    		y: 70
			}
            sh = setInterval("start()", 20);
            state = 1;


        }, 2000)
        var s = currentfloor.number + 1;
        var newfloor =  Floor.createNew();
        newfloor.init(s);
        currentfloor = newfloor;
        currentroom = currentfloor.rooms[10];
        mapnew = mapprocess(currentroom);


    }
}

document.addEventListener("keydown", function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (state == 4 || state == 3) {
        return;
    }
    if (state == 0 && e && (e.keyCode == 32 || e.keyCode == 13)) {
        sh = setInterval("start()", 20);
        state = 1;
        return;
    }
    if (state == 2 && e && (e.keyCode == 32 || e.keyCode == 13)) {
        location.reload();
    }
    if (e && e.keyCode == 87) {
        upmove = true;
    }
    if (e && e.keyCode == 65) {
        leftmove = true;
    }
    if (e && e.keyCode == 68) {
        rightmove = true;
    }
    if (e && e.keyCode == 83) {
        downmove = true;
    }
    if (e && e.keyCode == 38) {
        bulleton = 1;
        playerdireciton = 0;
    }
    if (e && e.keyCode == 40) {
        bulleton = 2;
        playerdireciton = 1;
    }
    if (e && e.keyCode == 37) {
        bulleton = 3;
        playerdireciton = 2;
    }
    if (e && e.keyCode == 39) {
        bulleton = 4;
        playerdireciton = 3;
    }
});

document.addEventListener("keyup", function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 87) {
        upmove = false;
    }
    if (e && e.keyCode == 65) {
        leftmove = false;
    }
    if (e && e.keyCode == 68) {
        rightmove = false;
    }
    if (e && e.keyCode == 83) {
        downmove = false;
    }
    if (e && e.keyCode == 38 && bulleton == 1) {
        bulleton = 0;
    }
    if (e && e.keyCode == 40 && bulleton == 2) {
        bulleton = 0;
    }
    if (e && e.keyCode == 37 && bulleton == 3) {
        bulleton = 0;
    }
    if (e && e.keyCode == 39 && bulleton == 4) {
        bulleton = 0;
    }
});
