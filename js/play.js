var playState = {

    preload: function () {
        
        this.player2 = new player();
        this.player1 = new player();

        this.player2.preload();
        this.player1.preload();
    },
    
    create: function() { 
        this.player2.create(game.width - 30, game.height/2, false, false);
        this.player1.create(30, game.height/2, true, true);
        
        var barConfig = {x: 200, y: 100, bar: {color: '#00E500'}};
        this.myHealthBar1 = new HealthBar(this.game, barConfig);
        var barConfig = {x: 600, y: 100, bar: { color: '#00E500'}};
        this.myHealthBar2 = new HealthBar(this.game, barConfig);
    },

    update: function() {
        this.player2.update();
        this.player1.update();
        
        this.myHealthBar1.setPercent(this.player1.stamina);
        this.myHealthBar2.setPercent(this.player2.stamina);
    },
};