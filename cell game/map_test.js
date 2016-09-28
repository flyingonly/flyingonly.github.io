describe('地图类', function() {
    it('应该具有大小的属性', function() {
        chai.expect(mymap).to.have.a.property("size")
    });
    it('应该具有地图的属性', function() {
        chai.expect(mymap).to.have.a.property("map")
    });
    it('应该有一个函数用来初始化地图', function() {
        assert.isFunction(mymap.init);
    });
    it('应该有一个函数用来随机地图', function() {
        assert.isFunction(mymap.rand);
    });
});

describe('细胞类', function() {
    before(function() {
        mymap.init();
        cell = mymap.map[1][1];
    });
    it('应该具有现在生存的属性', function() {
        chai.expect(cell).to.have.a.property("live")
    });
    it('应该具有未来生存状态的属性', function() {
        chai.expect(cell).to.have.a.property("futurelive")
    });
    it('应该可以访问到地图周边元素', function() {
        chai.expect(cell).to.have.a.property("themap")
    });
    it('应该有改变生存状态的函数', function() {
        assert.isFunction(cell.proc);
    });
    it('周围有两个细胞应该保持生存状态', function() {
        mymap.map[0][0].live = 1;
        mymap.map[0][1].live = 1;
        cell.proc();
        chai.expect(cell.futurelive).to.be.equal(cell.live);
    });
    it('周围有三个细胞应变成存活状态', function() {
        mymap.map[0][0].live = 1;
        mymap.map[0][1].live = 1;
        mymap.map[2][1].live = 1;
        cell.proc();
        chai.expect(cell.futurelive).to.be.equal(1);
    });
    it('周围细胞数其他状况应变成死亡状态', function() {
        mymap.map[0][0].live = 1;
        mymap.map[0][1].live = 1;
        mymap.map[2][1].live = 1;
        mymap.map[2][2].live = 1;
        mymap.map[2][0].live = 1;
        cell.proc();
        chai.expect(cell.futurelive).to.be.equal(0);
    });
});

describe('地图初始化', function() {
    before(function() {
        mymap.init();
    });
    it('地图应有合适的长度', function() {

        assert.equal(mymap.map.length, mymap.size);
    });
    it('地图应有合适的宽度', function() {
        assert.equal(mymap.map[Math.floor(mymap.size / 2)].length, mymap.size);
    });
});



describe('地图随机生成', function() {
    before(function() {
        mymap.rand();
    });
    it('细胞应有生存或死亡状态', function() {
        chai.expect(mymap.map[Math.floor(mymap.size / 2)][Math.floor(mymap.size / 2)].live).to.be.within(0,1)
    });
});
