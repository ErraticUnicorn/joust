var loadState = {

    preload: function () {      
        // Add a loading label 
        var loadingLabel = game.add.text(game.width/2, game.height/2 -20, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Add a progress bar
        var progressBar = game.add.sprite(game.width/2, game.height/2 +20, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        // Load all assets
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        // ...
    },

    create: function() { 
        game.state.start('menu');
    }
};