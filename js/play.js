var playState = {

    preload: function () {
        
        this.player2 = new player();
        this.player1 = new player();

        this.player2.preload();
        this.player1.preload();
    },
    
    create: function() { 
        this.player2.create(game.width - 30, game.height/2, false);
        this.player1.create(30, game.height/2, true);
        
        var barConfig = {x: 200, y: 100, bar: {color: '#00E500'}, animationDuration: 1};
        this.myHealthBar1 = new HealthBar(this.game, barConfig);
        barConfig.x = 600;
        barConfig.y = 100;
        this.myHealthBar2 = new HealthBar(this.game, barConfig);
    },

    update: function() {
        
        game.physics.arcade.overlap(this.player1.lance_tip, this.player2.shield, this.shield1Blocked, null, this);
        game.physics.arcade.overlap(this.player2.lance_tip, this.player1.shield, this.shield2Blocked, null, this);
        
        if (this.player1.shield_protected == false) {
            game.physics.arcade.overlap(this.player1.sprite, this.player2.lance_tip, this.lance2Hit, null, this);
        }
        
        if (this.player2.shield_protected == false) {
          game.physics.arcade.overlap(this.player2.sprite, this.player1.lance_tip, this.lance1Hit, null, this);  
        }
        
        this.player2.update();
        this.player1.update();
        
        this.myHealthBar1.setPercent(this.player1.stamina);
        this.myHealthBar2.setPercent(this.player2.stamina);
    },
    
    shield1Blocked: function () {
        this.player1.shield_protected = true;
        this.player1.stamina -= 10;
    },
    
    shield2Blocked: function () {
        this.player2.shield_protected = true;
        this.player2.stamina -= 10;
    },
    
    lance1Hit: function () {
        this.player1.die();
    },
    
    lance2Hit: function () {
        this.player2.die();
    },
};