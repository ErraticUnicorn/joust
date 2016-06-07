var menuState = {

    create: function() { 
        // Name of the game
        var nameLabel = game.add.text(game.width/2, 80, 'Name', { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);

        // How to start the game
        var startLabel = game.add.text(game.width/2, game.height-80, 'press the up arrow key to start', { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);  
        game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 1000).to({angle:0}, 500).loop().start(); 

        // Add a mute button
        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
        this.muteButton.frame = game.sound.mute ? 1 : 0;

        // Start the game when the up arrow key is pressed
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },

    toggleSound: function() {
        game.sound.mute = ! game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;    
    },

    start: function() {
        game.state.start('play');   
    }
};