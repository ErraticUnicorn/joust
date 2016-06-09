function player () {
    
    this.stamina = 100;
    
    this.preload = function () {
        this.createTextures();
    };
    
    this.create = function (startx, starty, is_player_one) {
                
        this.stamina = 100;
        
        this.shield_protected = false;
        
        this.is_player_one = is_player_one;

        this.shield_offset = 55;
        this.lance_offset = 20;
        this.lance_tip_offset =  60
        
        this.sprite = game.add.sprite(startx, starty, 'character');
        this.shield = game.add.sprite(startx + this.shield_offset, starty, 'shield');
        this.lance = game.add.sprite(startx + this.lance_offset, starty, 'lance');
        this.lance_tip = game.add.sprite(startx + this.lance_tip_offset, starty, 'lance_tip');
        this.sprite.anchor.setTo(0.5);
        this.shield.anchor.setTo(0.5);
        this.lance.anchor.setTo(0.5);
        this.lance_tip.anchor.setTo(0.5);
        
        game.physics.arcade.enable(this.sprite);
        game.physics.arcade.enable(this.shield);
        game.physics.arcade.enable(this.lance);
        game.physics.arcade.enable(this.lance_tip);
        
        this.shield.visible = false;
        this.initial_velocity = 200;
        
        if(this.is_player_one == false) {
            this.facing_right = false
            this.sprite.scale.x *= -1;
            this.shield.x = startx - this.shield_offset;
            this.lance.x = startx - this.lance_offset;
            this.lance_tip.x = startx - this.lance_tip_offset;
            
            this.sprite.body.velocity.x = this.initial_velocity * -1;
            this.shield.body.velocity.x = this.initial_velocity * -1;
            this.lance.body.velocity.x = this.initial_velocity * -1;
            this.lance_tip.body.velocity.x = this.initial_velocity * -1;
            this.keys = game.input.keyboard.addKeys({ 'shield_up': Phaser.Keyboard.ENTER });
        } else {
            this.facing_right = true;
            this.sprite.body.velocity.x = this.initial_velocity;
            this.shield.body.velocity.x = this.initial_velocity;
            this.lance.body.velocity.x = this.initial_velocity;
            this.lance_tip.body.velocity.x = this.initial_velocity;
            this.keys = game.input.keyboard.addKeys({ 'shield_up': Phaser.Keyboard.SPACEBAR });
            
        }
        
        //this.sprite.body.gravity.y = 500;
        // try to make it a group and move it together?
        // this.character = game.add.group();
        // this.character.add(this.sprite, shield, lance, lance_tip);
        // this.character.enableBody = true;
        
    };
    
    this.update = function () {
        this.movement();
        if(this.stamina < 0) {
            this.die();
        }
        this.shieldMechanic();
                
    };
    
    this.die = function () {
        if(this.is_player_one) {
           game.global.last_winner = " Player 2"; 
        } else {
            game.global.last_winner = " Player 1";
        }
        game.state.start('menu');
    };
    
    this.shieldMechanic = function () {
        if (this.keys.shield_up.isDown) {
            this.shield.visible = true;
            this.stamina -= .25;
        } else {
            this.shield.visible = false;
        }   
    };
    
    this.movement = function () {
        if(this.lance_tip.x > game.width || this.lance_tip.x < 0) {
            
            this.shield_protected = false;
            if(this.facing_right == true) {
                this.sprite.scale.x *= -1;
                this.shield.x = this.sprite.x - this.shield_offset;
                this.lance.x = this.sprite.x - this.lance_offset;
                this.lance_tip.x = this.sprite.x - this.lance_tip_offset;
                this.facing_right = false;
                this.velocity = 200;
            } else {
                this.sprite.scale.x *= -1;
                this.shield.x = this.sprite.x + this.shield_offset;
                this.lance.x = this.sprite.x + this.lance_offset;
                this.lance_tip.x = this.sprite.x + this.lance_tip_offset;
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