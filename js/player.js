function player () {
    
    this.preload = function () {
        this.createTextures();
    };
    
    this.create = function (startx, starty, facing_right) {
        
        this.facing_right = facing_right;
        
        this.sprite = game.add.sprite(startx, starty, 'character');
        this.shield = game.add.sprite(startx + 35, starty, 'shield');
        this.lance = game.add.sprite(startx + 20, starty, 'lance');
        this.lance_tip = game.add.sprite(startx + 60, starty, 'lance_tip');
        this.sprite.anchor.setTo(0.5);
        this.shield.anchor.setTo(0.5);
        this.lance.anchor.setTo(0.5);
        this.lance_tip.anchor.setTo(0.5);
        
        game.physics.arcade.enable(this.sprite);
        game.physics.arcade.enable(this.shield);
        game.physics.arcade.enable(this.lance);
        game.physics.arcade.enable(this.lance_tip);
        
        this.initial_velocity = 200;
        
        if(this.facing_right == false) {
            this.sprite.scale.x *= -1;
            this.shield.x = startx - 35;
            this.lance.x = startx - 20;
            this.lance_tip.x = startx - 60;
            
            this.sprite.body.velocity.x = this.initial_velocity * -1;
            this.shield.body.velocity.x = this.initial_velocity * -1;
            this.lance.body.velocity.x = this.initial_velocity * -1;
            this.lance_tip.body.velocity.x = this.initial_velocity * -1;
        } else {
            
            this.sprite.body.velocity.x = this.initial_velocity;
            this.shield.body.velocity.x = this.initial_velocity;
            this.lance.body.velocity.x = this.initial_velocity;
            this.lance_tip.body.velocity.x = this.initial_velocity;
            
        }
        //this.sprite.body.gravity.y = 500;
        // try to make it a group and move it together?
        // this.character = game.add.group();
        // this.character.add(this.sprite, shield, lance, lance_tip);
        // this.character.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();
    };
    
    this.update = function () {
        this.movement();
    };
    
    this.die = function () {
        game.state.start('menu');
    };
    
    this.movement = function () {
        
        if(this.lance_tip.x > game.width || this.lance_tip.x < 0) {
            
            if(this.facing_right == true) {
                this.sprite.scale.x *= -1;
                this.shield.x = this.sprite.x - 35;
                this.lance.x = this.sprite.x - 20;
                this.lance_tip.x = this.sprite.x - 60;
                this.facing_right = false;
                this.velocity = 200;
            } else {
                this.sprite.scale.x *= -1;
                this.shield.x = this.sprite.x + 35;
                this.lance.x = this.sprite.x + 20;
                this.lance_tip.x = this.sprite.x + 60;
                this.facing_right = true;
                this.velocity = -200
            }
            
            this.sprite.body.velocity.x = this.velocity * -1;
            this.shield.body.velocity.x = this.velocity * -1;
            this.lance.body.velocity.x = this.velocity * -1;
            this.lance_tip.body.velocity.x = this.velocity * -1;
        }
    };
    
    this.createTextures = function () {
        var lance = ['6666666'];
        game.create.texture('lance', lance, 11, 7, 0);
        
        var lance_tip = ['0'];
        game.create.texture('lance_tip', lance_tip, 7, 7, 0);
        
        var shield= [    '1',

                         '1',

                         '1',

                         '1' ];
        game.create.texture('shield', shield, 7, 9, 0);

        var shield_pommel = [ '.',
                              '0',
                              '0',
                              '.'];

        var character = [   '.11111.',

                            '.11818.',

                            '.18010.',

                            '.18888.',

                            '0223220',

                            '1233321',

                            '1223221',

                            '8EEEEE8',

                            '.E...E.',

                            '.E...E.',

                            '.6...6.'];
        
        game.create.texture('character', character, 7, 7, 0);
    }
    
}