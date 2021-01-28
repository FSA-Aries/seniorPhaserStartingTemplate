import Phaser from 'phaser'
const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude'
export default class GameScene extends Phaser.Scene {

    constructor() {
        super('game-scene')
        this.player = undefined;
        this.cursors = undefined;
    }

    preload() {
        //this.load.image('sky', 'assets/sky.png')
        this.load.image(GROUND_KEY, 'assets/platform.png')
        //this.load.image('star', 'assets/star.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.image("tileMap", 'assets/tilesets/RF_Catacombs_v1.0/mainlevbuild.png');
        this.load.tilemapTiledJSON('level1', 'assets/tilesets/TiledMap.json')


        this.load.spritesheet(DUDE_KEY,
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        )

    }

    create() {
        //this.add.image(400, 300, 'sky')
        //this.add.image(400, 300, 'star');

        const platforms = this.createPlatforms();




        var map = this.make.tilemap({ key: 'level1' })
        var tileSet = map.addTilesetImage('mainlevbuild', 'tileMap')
        const belowLayer = map.createLayer('Ground', tileSet, 0, 0)
        const worldLayer = map.createLayer('Walls', tileSet, 0, 0)

        this.player = this.createPlayer();

        //this.physics.add.collider(this.player, platforms)

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        this.player.body.setVelocity(0)
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true)
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn')
        }

        if (this.cursors.up.isDown /*&& this.player.body.touching.down*/) {
            this.player.setVelocityY(-100)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(100)
        }

    }

    createPlatforms() {
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();

        platforms.create(600, 400, GROUND_KEY);
        platforms.create(50, 250, GROUND_KEY)
        platforms.create(750, 220, GROUND_KEY)

        return platforms;
    }

    createPlayer() {
        const player = this.physics.add.sprite(100, 450, DUDE_KEY);
        player.setBounce(.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [{ key: DUDE_KEY, frame: 4 }],
            frameRate: 10,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        return player

    }
}
