function player () {
    
    this.stamina = 100;
    
    this.preload = function () {
        this.createTextures();
    };
    
    this.create = function (startx, starty, is_player_one) {
                
        this.stamina = 100;
        
        this.shield_protected = false;
        
        this.is_player_one = is_player_one;

        this.shield_offset = 35;
        lance_offset = 30;
        lance_tip_offset =  50;
        
        initial_velocity = 200;
        this.velocity = initial_velocity
        this.shield_stamina_drain = .1;
        this.lance_stamina_drain = .1;
        
        this.sprite = game.add.sprite(startx, starty, 'character');
        this.shield_pommel = game.add.sprite(-10, -15, 'shield_pommel');
        this.shield = game.add.sprite(startx + this.shield_offset, starty, 'shield');
        this.lance = game.add.sprite(lance_offset, 0, 'lance');
        this.lance_tip = game.add.sprite(lance_tip_offset, 0, 'lance_tip');
        this.sprite.anchor.setTo(0.5);
        this.shield.anchor.setTo(0.5);
        this.lance.anchor.setTo(0.5);
        this.lance_tip.anchor.setTo(0.5);
        
        this.lance.addChild(this.lance_tip);
        this.shield.addChild(this.shield_pommel);
        this.sprite.addChild(this.lance);
        
        
        game.physics.arcade.enable(this.sprite);
        game.physics.arcade.enable(this.shield);
        
        if(this.is_player_one == false) {
            this.facing_right = false
            this.sprite.scale.x *= -1;
            this.shield.scale.x *= -1;
            this.shield.x = startx - this.shield_offset;
           
            this.sprite.body.velocity.x = initial_velocity * -1;
            this.shield.body.velocity.x = initial_velocity * -1;;
            this.keys = game.input.keyboard.addKeys({ 'shield_up': Phaser.Keyboard.P, 'shield_down': Phaser.Keyboard.L, 'lance_up': Phaser.Keyboard.O, 'lance_down':  Phaser.Keyboard.K});
        } else {
            this.facing_right = true;
            this.sprite.body.velocity.x = initial_velocity;
            this.shield.body.velocity.x = initial_velocity;
            this.keys = game.input.keyboard.addKeys({ 'shield_up': Phaser.Keyboard.Q, 'shield_down': Phaser.Keyboard.A, 'lance_up': Phaser.Keyboard.W, 'lance_down': Phaser.Keyboard.S});
            
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
        this.lanceMechanic();
                
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
        if(this.keys.shield_up.isDown && this.shield.y >= 225){
            this.shield.y -= .3;
            this.stamina -= this.shield_stamina_drain;
        }
        
        if(this.keys.shield_down.isDown && this.shield.y <=275 ) {
            this.shield.y += .3;
            this.stamina -= this.shield_stamina_drain;
        }
        //old mechanic
//        if (this.keys.shield_up.isDown) {
//            this.shield.visible = true;
//            this.stamina -= this.shield_stamina_drain;
//        } else {
//            this.shield.visible = false;
//        }   
    };
    
    this.lanceMechanic = function () {
        if (this.keys.lance_up.isDown && this.lance.angle >= -30) {
            this.lance.angle -= 1;
            this.stamina -= this.lance_stamina_drain;
            if (this.lance.angle < 0) {
                this.lance.x +=.1;
            } else {
                this.lance.x -= .1;
            }
        }
        
        if (this.keys.lance_down.isDown && this.lance.angle <= 30) {
            this.lance.angle += 1;
            this.stamina -= this.lance_stamina_drain;
            if (this.lance.angle > 0) {
                this.lance.x +=.1;
            } else {
                this.lance.x -= .1;
            }
        }
        
    }
    
    this.movement = function () {
        if(this.shield.x > game.width || this.shield.x < 0) {
            
            this.shield_protected = false;
            this.sprite.scale.x *= -1;
            this.shield.scale.x *= -1;
            
            if(this.facing_right == true) {
                this.shield.x = this.sprite.x - this.shield_offset;
                this.facing_right = false;
                this.velocity = this.velocity;
            } else {
                this.shield.x = this.sprite.x + this.shield_offset;
                this.facing_right = true;
                this.velocity = -this.velocity;
            }
            
            this.sprite.body.velocity.x = this.velocity * -1;
            this.shield.body.velocity.x = this.velocity * -1;
        }
    };
    
    this.createTextures = function () {
        var lance = ['6666666'];
        game.create.texture('lance', lance, 14, 7, 0);
        
        var lance_tip = ['0'];
        game.create.texture('lance_tip', lance_tip, 7, 7, 0);
        
        var shield= [    '1',

                         '1',

                         '1',

                         '1' ];
        game.create.texture('shield', shield, 7, 8, 0);

        var shield_pommel = [ '.',
                              '0',
                              '0',
                              '.'];
        game.create.texture('shield_pommel', shield_pommel, 7, 8, 0);

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