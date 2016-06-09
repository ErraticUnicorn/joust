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
    },

    update: function() {
        this.player2.update();
        this.player1.update();
    },
};