function startGame(){
	$("#launchbtn").hide();
	game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
}
var game;
var player;
var cursors;
var music;
var state = "main"; 
/*
main: main menu
play: play game
decisions: desc
minigame: mini

*/
//main menu
otherSprites = $.parseJSON(otherSprites);
var mainMenu;
var playbtn;
var volupbtn;
var voldownbtn;
var songupbtn;
var songdownbtn;
var volLabel;
var volValue;
var songLabel;
var songValue;
var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
var style2 = { font: "50px Arial", fill: "#ffffff", align: "center" };
var style3 = { font: "30px Arial", fill: "#ffffff", align: "center" };
var title;
var musicArr = ['assets/sounds/Chance at Romance.ogg','assets/sounds/Losing Your Way.ogg','assets/sounds/Playing Around.ogg'];
var countMusic = musicArr.length;
var ran = Math.floor(Math.random() * ((countMusic-1-0)+1) + 0);
var songNum = ran + 1;
var volume = .4;
//end main menu
//start play
var playGroup;
var wallGroup;
var start = false;
var menuButton;
var curtains;
var goTable;
var minigames = { font: "12px Arial", fill: "#ffffff", align: "center" };
var miniLabel;
var desk;
var table;
var crystal;
var othersNum = -1;
var player1;
var player2;
var player3;
var player4;
var player5;
var state1;
var state2;
var state3;
var state4;
var state5;
var backKey;
setInterval(function(){ 
	state1 = Math.floor(Math.random() * ((4-0)+1) + 0);
	state3 = Math.floor(Math.random() * ((4-0)+1) + 0);
	state5 = Math.floor(Math.random() * ((4-0)+1) + 0);
 }, 1000);
 setInterval(function(){ 
	state2 = Math.floor(Math.random() * ((4-0)+1) + 0);
	state4 = Math.floor(Math.random() * ((4-0)+1) + 0);
 }, 1500);
//end play

//start minigames
var minigameGroup;
var miniScore = 0;
var scoreText;
var timeText;
var backButton;
var minibackground;
var diamond;
var star;
var miniTime;
var againButton;
var yesmini;
var nomini;
var playmini;
var menubackground;
var miniMenuGroup;
var miniLabel;
//end minigame

function preload() {
	var height = document.getElementById("spriteSheet").height / 4;
	var width = document.getElementById("spriteSheet").width / 4;
    game.load.spritesheet('sprite', spriteSess, width, height, 16);
	
	for(var i = 0; i < otherSprites.length; i++){
		othersNum = i;
		var tmp = i + 1;
		height = document.getElementById("spriteSheet"+tmp).height / 4;
		var width = document.getElementById("spriteSheet"+tmp).width / 4;
		game.load.spritesheet('sprite'+tmp, otherSprites[i], width, height, 16);
		if(i == 4){
			break;
		}
	}
	
	
	for(var i = 0; i < countMusic; i++){
		game.load.audio('music'+i,musicArr[i]);
	}
	game.load.spritesheet('button', 'assets/tilesets/menubutton.png', 35, 35);
	game.load.spritesheet('backbutton', 'assets/tilesets/backbtn.png', 35, 35);
	game.load.spritesheet('corners', 'assets/tilesets/wallcorners.png',10,16,6);
	game.load.spritesheet('vleftwalls', 'assets/tilesets/vertwallleft.png',10,70);
	game.load.spritesheet('vrightwalls', 'assets/tilesets/vertwallright.png',10,70);
	game.load.spritesheet('htopwalls', 'assets/tilesets/horizwalltop.png',70,16);
	game.load.spritesheet('hbotwalls', 'assets/tilesets/horizwallbot.png',70,16);
	
	game.load.spritesheet('backwall', 'assets/tilesets/backwall.png',32,64);
	game.load.spritesheet('crystal', 'assets/tilesets/crystal.png',18,14);
	game.load.spritesheet('curtains', 'assets/tilesets/curtains.png',64,29);
	game.load.spritesheet('desk', 'assets/tilesets/desk.png',32,37);
	game.load.image('floorh', 'assets/tilesets/floorh.png');
	game.load.image('floorv', 'assets/tilesets/floorv.png');
	game.load.image('floorwood', 'assets/tilesets/floorwood.png');
	game.load.spritesheet('go', 'assets/tilesets/go.png',28,36);
	game.load.spritesheet('plant1', 'assets/tilesets/plant1.png',30,39);
	game.load.spritesheet('plant2', 'assets/tilesets/plant2.png',29,50);
	game.load.spritesheet('swords', 'assets/tilesets/swords.png',59,29);
	game.load.spritesheet('tableclothe', 'assets/tilesets/tableclothe.png',32,34);
	game.load.image('window1', 'assets/tilesets/window1.png');
	game.load.image('window2', 'assets/tilesets/window2.png');
	
	//minigame
	game.load.image('miniback', 'assets/tilesets/minigamebackground.png');
	game.load.image('popmenu', 'assets/tilesets/menu.png');
	
	game.load.spritesheet('star', 'assets/tilesets/star.png',24,22);
	game.load.spritesheet('diamond', 'assets/tilesets/diamond.png',32,28);
	
	game.load.spritesheet('dcarg', 'assets/tilesets/frontg.png',766,1380);
	game.load.spritesheet('ucarg', 'assets/tilesets/backg.png',766,1380);
	game.load.spritesheet('lcarg', 'assets/tilesets/sideg.png',920,407);
	game.load.spritesheet('rcarg', 'assets/tilesets/rightg.png',920,407);
	
	game.load.spritesheet('dcarp', 'assets/tilesets/frontp.png',766,1380);
	game.load.spritesheet('ucarp', 'assets/tilesets/backp.png',766,1380);
	game.load.spritesheet('lcarp', 'assets/tilesets/sidep.png',920,407);
	game.load.spritesheet('rcarp', 'assets/tilesets/rightp.png',920,407);
	
	game.load.spritesheet('dcarr', 'assets/tilesets/frontr.png',766,1380);
	game.load.spritesheet('ucarr', 'assets/tilesets/backr.png',766,1380);
	game.load.spritesheet('lcarr', 'assets/tilesets/sider.png',920,407);
	game.load.spritesheet('rcarr', 'assets/tilesets/rightr.png',920,407);
	
	//decisions
	game.load.image('descmenu', 'assets/tilesets/decisionmenu.png');
}

function createMiniGame(){
	minigameGroup.add(game.add.tileSprite(0, 0, 800, 600, 'miniback',0));
	backButton = game.add.button(0,0, 'backbutton', changeToPlay, this, 1, 0, 1, 0);
	minigameGroup.add(backButton);
	playerMini = game.add.sprite(15, 585 , 'sprite');
	
	//  We need to enable physics on the player
	game.physics.arcade.enable(playerMini);

	playerMini.body.collideWorldBounds = true;
	//  Our two animations, walking left and right.
	playerMini.animations.add('down', [0, 1, 2, 3], 10, true);
	playerMini.animations.add('left', [4, 5, 6, 7], 10, true);
	playerMini.animations.add('right', [8, 9, 10, 11], 10, true);
	playerMini.animations.add('up', [12, 13, 14, 15], 10, true);
	
	scoreText = game.add.text(16, 570, 'Score: 0', { fontSize: '24px', fill: '#000' });
	minigameGroup.add(scoreText);
	stars = game.add.group();
	stars.enableBody = true;
	diamonds = game.add.group();
	diamonds.enableBody = true;
	cars = game.add.group();
	cars.enableBody = true;
	minigameGroup.add(stars);
	minigameGroup.add(diamonds);
	minigameGroup.add(cars);
	minigameGroup.add(playerMini);
}
function create(){ //main menu
	game.physics.startSystem(Phaser.Physics.ARCADE);
	descGroup = game.add.group();
	gameOverGroup = game.add.group();
	minigameGroup = game.add.group();
	miniMenuGroup = game.add.group();
	mainMenu = game.add.group();
	playGroup = game.add.group();
	wallGroup = game.add.physicsGroup();
	createMainMenu();
	createInput();
	createMusic();
	miniMenuGroup.visible = false;
	minigameGroup.visible = false;
	playGroup.visible = false;
	descGroup.visible = false;
	game.input.keyboard.enabled = false;
	createPlayBackground();
	createMiniMenu();
	createMiniGame();
	createGameOverMenu();
}

function update() {
	if(state == "play"){
		playState();
		otherMove();
	}else{
		stopMove();
	}
	if(state == "mini"){
		miniState();
	}
}

function render(){
	
}
function stopMove(){
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	player.animations.stop();
	player.frame = 0;
	if(othersNum > -1){
		player1.body.velocity.x = 0;
		player1.body.velocity.y = 0;
		player1.animations.stop();
		player1.frame = 0;
	}
	if(othersNum > 0){
		player2.body.velocity.x = 0;
		player2.body.velocity.y = 0;
		player2.animations.stop();
		player2.frame = 0;
	}
	if(othersNum > 1){
		player3.body.velocity.x = 0;
		player3.body.velocity.y = 0;
		player3.animations.stop();
		player3.frame = 0;
	}
	if(othersNum > 2){
		player4.body.velocity.x = 0;
		player4.body.velocity.y = 0;
		player4.animations.stop();
		player4.frame = 0;
	}
	if(othersNum > 3){
		player5.body.velocity.x = 0;
		player5.body.velocity.y = 0;
		player5.animations.stop();
		player5.frame = 0;
	}
}
function answerDecision(pointer){
	if(state == "desc"){
		if(pointer.y > 140 && pointer.y < 370 && pointer.x < 400 && pointer.x > 0){
			//a
			answerDecisionSend("A");
		}else if(pointer.y > 140 && pointer.y < 370 && pointer.x > 400 && pointer.x < 800){
			//b
			answerDecisionSend("B");
		}else if(pointer.y > 370 && pointer.y < 600 && pointer.x < 400 && pointer.x > 0){
			//c
			answerDecisionSend("C");
		}else if(pointer.y > 370 && pointer.y < 600 && pointer.x > 400 && pointer.x < 800){
			//d
			answerDecisionSend("D");
		}
	}
}
var diamonds;
var stars;
var cars;
function miniState(){
	//  Reset the players velocity (movement)
	game.physics.arcade.overlap(playerMini, diamonds, collectDiamond, null, this);
	game.physics.arcade.overlap(playerMini, stars, collectStar, null, this);
	game.physics.arcade.overlap(playerMini, cars, collectCar, null, this);
	playerMini.body.velocity.x = 0;
	playerMini.body.velocity.y = 0;
	if (cursors.left.isDown || aKey.isDown){
		//  Move to the left
		playerMini.body.velocity.x = -150 - (miniScore / 4);

		playerMini.animations.play('left');
	}else if (cursors.right.isDown || dKey.isDown){
		//  Move to the right
		playerMini.body.velocity.x = 150 + (miniScore / 4);

		playerMini.animations.play('right');
	}else if (cursors.up.isDown || wKey.isDown){
		//  Move to the up
		playerMini.body.velocity.y = -150 - (miniScore / 4);

		playerMini.animations.play('up');
	}else if (cursors.down.isDown || sKey.isDown){
		//  Move to the down
		playerMini.body.velocity.y = 150 + (miniScore / 4);

		playerMini.animations.play('down');
	}else{
		// Stand Still
		playerMini.animations.stop();
		playerMini.frame = 0;
	}
	if(backKey.isDown){
		changeToPlay();
	}
	if(spawned == false){
		if(spawn == 3){
			spawned = true;
			//diamond spawn
			var b = Math.floor(Math.random() * ((3-0)+1) + 0);
			if(b == 0){
				var diamond = diamonds.create(game.rnd.between(30, 170), game.rnd.between(180, 420) , 'diamond');
			}else if(b == 1){
				var diamond = diamonds.create(game.rnd.between(630, 770), game.rnd.between(180, 420) , 'diamond');
			}else if(b == 2){
				var diamond = diamonds.create(game.rnd.between(230, 630), game.rnd.between(30, 120), 'diamond');
			}else if(b == 3){
				var diamond = diamonds.create(game.rnd.between(230, 630), game.rnd.between(480, 570) , 'diamond');
			}
		}
		if(spawn > 3){
			spawned = true;
			//star spawn
			var b = Math.floor(Math.random() * ((3-0)+1) + 0);
			if(b == 0){
				var star = stars.create(game.rnd.between(30, 170), game.rnd.between(180, 420) , 'star');
			}else if(b == 1){
				var star = stars.create(game.rnd.between(630, 770), game.rnd.between(180, 420) , 'star');
			}else if(b == 2){
				var star = stars.create(game.rnd.between(230, 630), game.rnd.between(30, 120), 'star');
			}else if(b == 3){
				var star = stars.create(game.rnd.between(230, 630), game.rnd.between(480, 570) , 'star');
			}
		}
	}
	trafficCounter++;
	if(traffic == 1 && trafficCounter == trafficCounted){
		trafficCounter = 0;
		//vertical
		var a = Math.floor(Math.random() * ((2-0)+1) + 0);
		var b = Math.floor(Math.random() * ((2-0)+1) + 0);
		if(a == 0){
			var car = cars.create(game.rnd.between(420, 540), 600, 'ucarg'); //500 585
		}else if(a == 1){
			var car = cars.create(game.rnd.between(420, 540), 600, 'ucarp');
		}else if(a == 2){
			var car = cars.create(game.rnd.between(420, 540), 600, 'ucarr');
		}
		car.body.velocity.y = -1 * (trafficSpeed + (miniScore / 2)) * 3 / 4;
		if(b == 0){
			var car1 = cars.create(game.rnd.between(250, 380), 0, 'ucarg');
		}else if(b == 1){
			var car1 = cars.create(game.rnd.between(250, 380), 0, 'ucarp');
		}else if(b == 2){
			var car1 = cars.create(game.rnd.between(250, 380), 0, 'ucarr');
		}
		car1.body.velocity.y = (trafficSpeed + (miniScore / 2)) * 3 / 4;
		car.scale.setTo(.07, .07);
		car1.scale.setTo(-.07, -.07);
		car.events.onOutOfBounds.add(carOut, this);
		car1.events.onOutOfBounds.add(carOut, this);
	}else if(traffic == 0 && trafficCounter == trafficCounted){
		trafficCounter = 0;
		//vertical
		var a = Math.floor(Math.random() * ((2-0)+1) + 0);
		var b = Math.floor(Math.random() * ((2-0)+1) + 0);
		if(a == 0){
			var car = cars.create( 800, game.rnd.between(180, 280), 'rcarg');
		}else if(a == 1){
			var car = cars.create(800, game.rnd.between(180, 280), 'rcarp');
		}else if(a == 2){
			var car = cars.create( 800, game.rnd.between(180, 280), 'rcarr');
		}
		car.body.velocity.x = -1 * (trafficSpeed + (miniScore / 2)) * 3 / 4;
		if(b == 0){
			var car1 = cars.create( 0, game.rnd.between(320, 400), 'rcarg');
		}else if(b == 1){
			var car1 = cars.create( 0, game.rnd.between(320, 400), 'rcarp');
		}else if(b == 2){
			var car1 = cars.create( 0, game.rnd.between(320, 400), 'rcarr');
		}
		car1.body.velocity.x = (trafficSpeed + (miniScore / 2)) * 3 / 4;
		car.scale.setTo(-.1, .1);
		car1.scale.setTo(.1, .1);
		car.events.onOutOfBounds.add(carOut, this);
		car1.events.onOutOfBounds.add(carOut, this);
		
	}
	
}
var trafficCounted = 90;
function carOut(car){
	car.kill();
}
function collectDiamond(player, diamond){
	diamond.kill();
    miniScore += 50;
    scoreText.text = 'Score: ' + miniScore;
	faster += 50;
	if(faster > 49){
		faster = faster - 50;
		if(trafficMax >= 3250){
			trafficMax = trafficMax - 250;
		}
		if(trafficMin >= 2250){
			trafficMin = trafficMin - 250;
		}
		if(trafficCounted >= 55 ){
			trafficCounted = trafficCounted - 5;
		}
	}
}
function collectStar(player, star){
	star.kill();
    miniScore += 10;
    scoreText.text = 'Score: ' + miniScore;
	faster += 10;
	if(faster > 49){
		faster = faster - 50;
		if(trafficMax >= 3250){
			trafficMax = trafficMax - 250;
		}
		if(trafficMin >= 2250){
			trafficMin = trafficMin - 250;
		}
		if(trafficCounted >= 55 ){
			trafficCounted = trafficCounted - 5;
		}
	}
}
function collectCar(player, car){
	//end and call ajax to update risk
	sendScore(miniScore);
	state = "game over";
	miniScoreLabel.text = miniScore;
	gameOverGroup.visible = true;
	playerMini.visible = false;
}
function riskProfile2(){
	$('#profileRiskChart').modal('show');
	riskProfile();
}
function playState(){

	game.physics.arcade.collide(player, table, runSimulation);
	game.physics.arcade.collide(player, desk, changeToDescisions);
	game.physics.arcade.collide(player, goTable, riskProfile2);
	game.physics.arcade.collide(player, curtains, popMini);
	game.physics.arcade.collide(player, wallGroup);
	
	
	//  Reset the players velocity (movement)
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	if (cursors.left.isDown || aKey.isDown){
		//  Move to the left
		player.body.velocity.x = -150;

		player.animations.play('left');
	}else if (cursors.right.isDown || dKey.isDown){
		//  Move to the right
		player.body.velocity.x = 150;

		player.animations.play('right');
	}else if (cursors.up.isDown || wKey.isDown){
		//  Move to the up
		player.body.velocity.y = -150;

		player.animations.play('up');
	}else if (cursors.down.isDown || sKey.isDown){
		//  Move to the down
		player.body.velocity.y = 150;

		player.animations.play('down');
	}else{
		// Stand Still
		player.animations.stop();
		player.frame = 0;
	}
	if(backKey.isDown){
		toMainMenu();
	}
}
function restartMinigame(item){
	item.fill = "#000000";
	state = "mini";
	playerMini.visible = true;
	stopMinigame();
	startMinigame();
}
var trafficCounter = 0;
var faster = 0;
var spawn = 0;
var miniSpawner;
var traffic = 0;
var trafficSpeed = 200;
var trafficMax = 10000;
var trafficMin = 5000;
var trafficTime = Math.floor(Math.random() * ((trafficMax-trafficMin)+1) + trafficMin);
var trafficSwitch;
function trafficFunction(){
	if(traffic == 0){
		traffic = 1;
	}else{
		traffic = 0;
	}
	clearInterval(trafficSwitch);
	trafficTime = Math.floor(Math.random() * ((trafficMax-trafficMin)+1) + trafficMin);
	newTraffic();
}
function newTraffic(){
	trafficSwitch  = setInterval(function(){ 
		trafficFunction();
		
	}, trafficTime);
}
function stopMinigame(){
	stars.callAll('kill');
	diamonds.callAll('kill');
	cars.callAll('kill');
	miniScore = 0;
	playerMini.visible = true;
	playerMini.reset(15,15);
	wallGroup.visible = true;
	clearInterval(miniSpawner);
	clearInterval(trafficSwitch);
}
function changeToDescisions(){
	createDecisionsMenu();
	descGroup.visible = true;
	state = "desc";
	playGroup.visible = true;
}
function toMainMenu(){
	game.input.keyboard.enabled = false;
	descGroup.visible = false;
	game.input.reset();
	state = "main";
	wallGroup.visible = false;
	mainMenu.visible = true;
	playGroup.visible = false;
}
function quitDecisions(){
	descGroup.callAll('kill');
	player.reset(400,300);
	player.position.x = 400;
	player.position.y = 300;
	mainMenu.visible = false;
	minigameGroup.visible = false;
	miniMenuGroup.visible = false;
	descGroup.visible = false;
	playGroup.visible = true;
	scoreText.text = 'Score: ' + miniScore;
	state = "play";
}
function changeToPlay(){
	stopMinigame();
	game.input.keyboard.enabled = true;
	state = "play";
	playGroup.visible = true;
	mainMenu.visible = false;
	minigameGroup.visible = false;
	miniMenuGroup.visible = false;
	descGroup.visible = false;
	scoreText.text = 'Score: ' + miniScore;
	
}
function changeToPlayOver(item){
	item.fill = "#00000";
	miniScore = 0;
	scoreText.text = 'Score: ' + miniScore;
	changeToPlay();
}
var spawned = false;
function changeToMinigame(item){
	spawned = false;
	descGroup.visible = false;
	spawn = 0;
	miniSpawner = setInterval(function(){ 
		spawn = Math.floor(Math.random() * ((10-0)+1) + 0);
		spawned = false;
	}, 3000);
	trafficSwitch  = setInterval(function(){ 
		trafficFunction();	
	}, trafficTime);
	item.fill = "#00000";
	game.input.keyboard.enabled = true;
	state = "mini";
	mainMenu.visible = false;
	miniMenuGroup.visible = false;
	playGroup.visible = false;
	gameOverGroup.visible = false;
	minigameGroup.visible = true;
	scoreText.text = 'Score: ' + miniScore;
}
function startMinigame(){
	spawned = false;
	spawn = 0;
	miniSpawner = setInterval(function(){ 
		spawn = Math.floor(Math.random() * ((10-0)+1) + 0);
		spawned = false;
	}, 3000);
	trafficSwitch  = setInterval(function(){ 
		trafficFunction();	
	}, trafficTime);
	game.input.keyboard.enabled = true;
	state = "mini";
	mainMenu.visible = false;
	miniMenuGroup.visible = false;
	playGroup.visible = false;
	gameOverGroup.visible = false;
	minigameGroup.visible = true;
	playerMini.reset(25,25);
	miniScore = 0;
	scoreText.text = 'Score: ' + miniScore;
}
function createMainMenu(){
	game.stage.backgroundColor = '#182d3b';
	title = game.add.text(game.world.centerX, game.world.centerY - 200, "AIG Game", style);
	title.anchor.set(0.5);
	playbtn = game.add.text(game.world.centerX, game.world.centerY - 50, "Play", style2);
	volupbtn = game.add.text(game.world.centerX - 50, game.world.centerY + 50, "/\\", style3);
	voldownbtn = game.add.text(game.world.centerX - 50, game.world.centerY + 150, "\\/", style3);
	songupbtn = game.add.text(game.world.centerX + 175, game.world.centerY + 50, "/\\", style3);
	songdownbtn = game.add.text(game.world.centerX + 175, game.world.centerY + 150, "\\/", style3);
	volLabel = game.add.text(game.world.centerX - 175, game.world.centerY + 100, "Volume", style3);
	volValue = game.add.text(game.world.centerX - 50, game.world.centerY + 100, "40%", style3);
	songLabel = game.add.text(game.world.centerX + 75, game.world.centerY + 100, "Song", style3);
	songValue = game.add.text(game.world.centerX + 175, game.world.centerY + 100, songNum, style3);
	playbtn.anchor.set(0.5);
	volupbtn.anchor.set(0.5);
	voldownbtn.anchor.set(0.5);
	songupbtn.anchor.set(0.5);
	songdownbtn.anchor.set(0.5);
	volLabel.anchor.set(0.5);
	volValue.anchor.set(0.5);
	songLabel.anchor.set(0.5);
	songValue.anchor.set(0.5);
	
	playbtn.inputEnabled = true;
	volupbtn.inputEnabled = true;
	voldownbtn.inputEnabled = true;
	songupbtn.inputEnabled = true;
	songdownbtn.inputEnabled = true;
	
	playbtn.events.onInputOver.add(over, this);
    playbtn.events.onInputOut.add(out, this);
    playbtn.events.onInputUp.add(changeToPlay, this);
	
	volupbtn.events.onInputOver.add(over, this);
    volupbtn.events.onInputOut.add(out, this);
    volupbtn.events.onInputUp.add(volUp, this);
	
	voldownbtn.events.onInputOver.add(over, this);
    voldownbtn.events.onInputOut.add(out, this);
    voldownbtn.events.onInputUp.add(volDown, this);
	
	songupbtn.events.onInputOver.add(over, this);
    songupbtn.events.onInputOut.add(out, this);
    songupbtn.events.onInputUp.add(songUp, this);
	
	songdownbtn.events.onInputOver.add(over, this);
    songdownbtn.events.onInputOut.add(out, this);
    songdownbtn.events.onInputUp.add(songDown, this);
	
	mainMenu.add(title);
	mainMenu.add(playbtn);
	mainMenu.add(volupbtn);
	mainMenu.add(voldownbtn);
	mainMenu.add(songupbtn);
	mainMenu.add(songdownbtn);
	mainMenu.add(volLabel);
	mainMenu.add(volValue);
	mainMenu.add(songLabel);
	mainMenu.add(songValue);
}
function volUp(){
	if(music.volume < 1){
		music.volume += .05;
		volume += .05;
		volValue.text = (music.volume * 100).toFixed(0) + "%";
	}
}
function volDown(){
	if(music.volume > 0){
		music.volume += -.05;
		volume += -.05;
		if(music.volume < .05){
			music.volume = 0;
			volume = 0;
		}
		volValue.text = (music.volume * 100).toFixed(0) + "%";
	}
}
function songDown(){
	if(songNum > 1){
		songNum += -1;
		var i = songNum - 1;
		music.stop();
		music = game.add.audio('music'+i);
		music.loop = true;
		music.volume = volume;
		music.play();
		songValue.text = songNum;
	}
}
function songUp(){
	if(songNum < countMusic){
		songNum += 1;
		var i = songNum - 1;
		music.stop();
		music = game.add.audio('music'+i);
		music.loop = true;
		music.volume = volume;
		music.play();
		songValue.text = songNum;
	}
}
function over(item) {
    item.fill = "#D9D9D9";
}

function out(item) {
    item.fill = "#ffffff";
}
function overMini(item) {
    item.fill = "#D9D9D9";
}

function outMini(item) {
    item.fill = "#00000";
}
function createInput(){
	cursors = game.input.keyboard.createCursorKeys();
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	backKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
}
function createMusic(){
	music = game.add.audio('music'+ran);
	music.loop = true;
	music.volume = .4;
    music.play();
}
function otherMove(){
	if(othersNum > -1){
		game.physics.arcade.collide(player1, wallGroup);
		game.physics.arcade.collide(player, player1);
		player1.body.velocity.x = 0;
		player1.body.velocity.y = 0;
		if(state1 == 0){
			player1.animations.stop();
			player1.frame = 0;
		}else if(state1 == 1){
			player1.body.velocity.x = -100;
			player1.animations.play('left');
		}else if(state1 == 2){
			player1.body.velocity.x = 100;
			player1.animations.play('right');
		}else if(state1 == 3){
			player1.body.velocity.y = -100;
			player1.animations.play('up');
		}else if(state1 == 4){
			player1.body.velocity.y = 100;
			player1.animations.play('down');
		}
	}
	if(othersNum > 0){
		game.physics.arcade.collide(player2, wallGroup);
		game.physics.arcade.collide(player, player2);
		game.physics.arcade.collide(player1, player2);
		player2.body.velocity.x = 0;
		player2.body.velocity.y = 0;
		if(state2 == 0){
			player2.animations.stop();
			player2.frame = 0;
		}else if(state2 == 1){
			player2.body.velocity.x = -100;
			player2.animations.play('left');
		}else if(state2 == 2){
			player2.body.velocity.x = 100;
			player2.animations.play('right');
		}else if(state2 == 3){
			player2.body.velocity.y = -100;
			player2.animations.play('up');
		}else if(state2 == 4){
			player2.body.velocity.y = 100;
			player2.animations.play('down');
		}
	}
	if(othersNum > 1){
		game.physics.arcade.collide(player3, wallGroup);
		game.physics.arcade.collide(player, player3);
		game.physics.arcade.collide(player1, player3);
		game.physics.arcade.collide(player2, player3);
		player3.body.velocity.x = 0;
		player3.body.velocity.y = 0;
		if(state3 == 0){
			player3.animations.stop();
			player3.frame = 0;
		}else if(state3 == 1){
			player3.body.velocity.x = -100;
			player3.animations.play('left');
		}else if(state3 == 2){
			player3.body.velocity.x = 100;
			player3.animations.play('right');
		}else if(state3 == 3){
			player3.body.velocity.y = -100;
			player3.animations.play('up');
		}else if(state3 == 4){
			player3.body.velocity.y = 100;
			player3.animations.play('down');
		}
	}
	if(othersNum > 2){
		game.physics.arcade.collide(player4, wallGroup);
		game.physics.arcade.collide(player, player4);
		game.physics.arcade.collide(player1, player4);
		game.physics.arcade.collide(player2, player4);
		game.physics.arcade.collide(player3, player4);
		player4.body.velocity.x = 0;
		player4.body.velocity.y = 0;
		if(state4 == 0){
			player4.animations.stop();
			player4.frame = 0;
		}else if(state4 == 1){
			player4.body.velocity.x = -100;
			player4.animations.play('left');
		}else if(state4 == 2){
			player4.body.velocity.x = 100;
			player4.animations.play('right');
		}else if(state4 == 3){
			player4.body.velocity.y = -100;
			player4.animations.play('up');
		}else if(state4 == 4){
			player4.body.velocity.y = 100;
			player4.animations.play('down');
		}
	}
	if(othersNum > 3){
		game.physics.arcade.collide(player5, wallGroup);
		game.physics.arcade.collide(player, player5);
		game.physics.arcade.collide(player1, player5);
		game.physics.arcade.collide(player2, player5);
		game.physics.arcade.collide(player3, player5);
		game.physics.arcade.collide(player4, player5);
		player5.body.velocity.x = 0;
		player5.body.velocity.y = 0;
		if(state5 == 0){
			player5.animations.stop();
			player5.frame = 0;
		}else if(state5 == 1){
			player5.body.velocity.x = -100;
			player5.animations.play('left');
		}else if(state5 == 2){
			player5.body.velocity.x = 100;
			player5.animations.play('right');
		}else if(state5 == 3){
			player5.body.velocity.y = -100;
			player5.animations.play('up');
		}else if(state5 == 4){
			player5.body.velocity.y = 100;
			player5.animations.play('down');
		}
	}
}
function createPlayBackground(){
	game.physics.setBoundsToWorld();
		//floor
	for(var i = 0; i < 4; i++){
		var y = 16 + 64 + 128 * i;
		for(var j = 0; j < 7; j++){
			var x = 10 + 128 * j;
			playGroup.add(game.add.tileSprite(x, y, 64, 32, 'floorh',0));
			z = y + 32;
			playGroup.add(game.add.tileSprite(x, z, 64, 32, 'floorh',0));
			z = z + 32;
			a = x + 64;
			playGroup.add(game.add.tileSprite(a, z, 64, 32, 'floorh',0));
			z = z + 32;
			playGroup.add(game.add.tileSprite(a, z, 64, 32, 'floorh',0));
		}
	}
	for(var i = 0; i < 4; i++){
		var y = 16 + 64 + 64 + 128 * i;
		for(var j = 0; j < 7; j++){
			var x = 10 + 128 * j;
			playGroup.add(game.add.tileSprite(x, y, 32, 64, 'floorv',0));
			z = x + 32;
			playGroup.add(game.add.tileSprite(z, y, 32, 64, 'floorv',0));
			z = z + 32;
			a = y + 64;
			b = y - 64;
			playGroup.add(game.add.tileSprite(z, a, 32, 64, 'floorv',0));
			playGroup.add(game.add.tileSprite(z, b, 32, 64, 'floorv',0));
			z = z + 32;
			playGroup.add(game.add.tileSprite(z, a, 32, 64, 'floorv',0));
			playGroup.add(game.add.tileSprite(z, b, 32, 64, 'floorv',0));
		}
	}
	playGroup.add(game.add.tileSprite(362, 16, 32, 32, 'floorwood',0));
	playGroup.add(game.add.tileSprite(362, 48, 32, 32, 'floorwood',0));
	playGroup.add(game.add.tileSprite(394, 16, 32, 32, 'floorwood',0));
	playGroup.add(game.add.tileSprite(394, 48, 32, 32, 'floorwood',0));
	
	curtains = wallGroup.create(362, 16,'curtains');
	curtains.body.immovable = true;
	curtains.body.setSize(64,15);
	
	miniLabel = game.add.text(365, 58, "MINIGAME", minigames);
	playGroup.add(miniLabel);
	//backwall
	for(var i = 0; i < 11; i++){
		var x = 10 + 32 * i;
		var back = wallGroup.create(x, 16,'backwall');
		back.body.immovable = true;
		back.body.setSize(32,32);

	}
	for(var i = 0; i < 12; i++){
		var x = 426 + 32 * i;
		var back = wallGroup.create(x, 16,'backwall');
		back.body.immovable = true;
		back.body.setSize(32,32);
	}
	//vertical walls
	for(var i = 0; i < 8; i++){
		var y = 16 + 70 * i;
		var wall = wallGroup.create(0, y, 'vleftwalls');
		var wall2 = wallGroup.create(790, y, 'vrightwalls');
		wall.body.immovable = true;
		wall2.body.immovable = true;
	}
	var tmp = wallGroup.create(0, 520, 'vleftwalls');
	tmp.body.immovable = true;
	tmp = wallGroup.create(790, 520, 'vrightwalls');
	tmp.body.immovable = true;
	//horizontal walls
	for(var i = 0; i < 11; i++){
		var x = 10 + 70 * i;
		var wall = wallGroup.create(x, 0,  'htopwalls');
		var wall2 = wallGroup.create(x, 584,  'hbotwalls');
		wall.body.immovable = true;
		wall2.body.immovable = true;
	}
	tmp = wallGroup.create(720, 0,'htopwalls');
	tmp.body.immovable = true;
	tmp = wallGroup.create(720, 584, 'hbotwalls');
	tmp.body.immovable = true;
	//corners
	tmp = wallGroup.create(0, 0,'corners',5);
	tmp.body.immovable = true;
	tmp = wallGroup.create(0, 584, 'corners',2);
	tmp.body.immovable = true;
	tmp = wallGroup.create(790, 584,'corners',0);
	tmp.body.immovable = true;
	tmp = wallGroup.create(790, 0, 'corners',3);
	tmp.body.immovable = true;
	
	tmp = wallGroup.create(80, 80, 'plant1');
	tmp.body.immovable = true;
	tmp = wallGroup.create(700, 150, 'plant1');
	tmp.body.immovable = true;
	tmp = wallGroup.create(50, 450, 'plant1');
	tmp.body.immovable = true;
	
	tmp = wallGroup.create(240, 250, 'plant2');
	tmp.body.immovable = true;
	tmp = wallGroup.create(200, 400, 'plant2');
	tmp.body.immovable = true;
	tmp = wallGroup.create(600, 400, 'plant2');
	tmp.body.immovable = true;
	
	tmp = wallGroup.create(400, 550, 'swords');
	tmp.body.immovable = true;
	goTable = wallGroup.create(10, 300, 'go');
	goTable.body.immovable = true;
	
	desk = wallGroup.create(400, 400, 'desk');
	desk.body.immovable = true;
	table = wallGroup.create(500, 200, 'tableclothe');
	table.body.immovable = true;
	crystal = wallGroup.create(507, 200, 'crystal');
	crystal.body.immovable = true;
	
	wallGroup.add(game.add.tileSprite(111, 22, 23, 25, 'window1',0));
	wallGroup.add(game.add.tileSprite(591, 22, 23, 25, 'window1',0));
	wallGroup.add(game.add.tileSprite(239, 22, 23, 25, 'window2',0));
	wallGroup.add(game.add.tileSprite(527, 22, 23, 25, 'window2',0));
	
	menuButton = game.add.button(10,16, 'button', toMainMenu, this, 1, 0, 1, 0);
	wallGroup.add(menuButton);
	
	
	player = game.add.sprite(game.world.centerX, game.world.centerY , 'sprite');
	
	//  We need to enable physics on the player
	game.physics.arcade.enable(player);

	player.body.collideWorldBounds = true;
	//  Our two animations, walking left and right.
	player.animations.add('down', [0, 1, 2, 3], 10, true);
	player.animations.add('left', [4, 5, 6, 7], 10, true);
	player.animations.add('right', [8, 9, 10, 11], 10, true);
	player.animations.add('up', [12, 13, 14, 15], 10, true);
	game.physics.arcade.enable(wallGroup);
	playGroup.add(wallGroup);
	playGroup.add(player);
	
	for(var i = 0; i < otherSprites.length; i++){
		othersNum = i;
		if(i == 0){
			player1 = game.add.sprite(100, 150 , 'sprite1');
			game.physics.arcade.enable(player1);
			player1.body.collideWorldBounds = true;
			player1.animations.add('down', [0, 1, 2, 3], 10, true);
			player1.animations.add('left', [4, 5, 6, 7], 10, true);
			player1.animations.add('right', [8, 9, 10, 11], 10, true);
			player1.animations.add('up', [12, 13, 14, 15], 10, true);
			playGroup.add(player1);
		}else if(i == 1){
			player2 = game.add.sprite(200, 450 , 'sprite2');
			game.physics.arcade.enable(player2);
			player2.body.collideWorldBounds = true;
			player2.animations.add('down', [0, 1, 2, 3], 10, true);
			player2.animations.add('left', [4, 5, 6, 7], 10, true);
			player2.animations.add('right', [8, 9, 10, 11], 10, true);
			player2.animations.add('up', [12, 13, 14, 15], 10, true);
			playGroup.add(player2);
		}else if(i == 2){
			player3 = game.add.sprite(700, 300 , 'sprite3');
			game.physics.arcade.enable(player3);
			player3.body.collideWorldBounds = true;
			player3.animations.add('down', [0, 1, 2, 3], 10, true);
			player3.animations.add('left', [4, 5, 6, 7], 10, true);
			player3.animations.add('right', [8, 9, 10, 11], 10, true);
			player3.animations.add('up', [12, 13, 14, 15], 10, true);
			playGroup.add(player3);
		}else if(i == 3){
			player4 = game.add.sprite(750, 450 , 'sprite4');
			game.physics.arcade.enable(player4);
			player4.body.collideWorldBounds = true;
			player4.animations.add('down', [0, 1, 2, 3], 10, true);
			player4.animations.add('left', [4, 5, 6, 7], 10, true);
			player4.animations.add('right', [8, 9, 10, 11], 10, true);
			player4.animations.add('up', [12, 13, 14, 15], 10, true);
			playGroup.add(player4);
		}else if(i == 4){
			player5 = game.add.sprite(300, 200 , 'sprite5');
			game.physics.arcade.enable(player5);
			player5.body.collideWorldBounds = true;
			player5.animations.add('down', [0, 1, 2, 3], 10, true);
			player5.animations.add('left', [4, 5, 6, 7], 10, true);
			player5.animations.add('right', [8, 9, 10, 11], 10, true);
			player5.animations.add('up', [12, 13, 14, 15], 10, true);
			playGroup.add(player5);
		}
		if(i == 4){
			break;
		}
	}

}
function popMini(){
	miniMenuGroup.visible = true;
	playGroup.visible = true;
}
function closeMinimenu(item){
	item.fill = "#00000";
	miniMenuGroup.visible = false;
}
var styleMini = { font: "28px Arial", fill: "#000000", align: "center" };
var styleMini2 = { font: "24px Arial", fill: "#000000", align: "center" };
function createMiniMenu(){
	miniLabel = game.add.text(400, 325, "Play Minigame?", styleMini);
	miniLabel.anchor.set(0.5);
	yesmini = game.add.text(350, 400, "Yes", styleMini2);
	nomini = game.add.text(475, 400, "No", styleMini2);

	yesmini.anchor.set(0.5);
	nomini.anchor.set(0.5);
	
	yesmini.inputEnabled = true;
	nomini.inputEnabled = true;

	yesmini.events.onInputOver.add(overMini, this);
    yesmini.events.onInputOut.add(outMini, this);
    yesmini.events.onInputUp.add(changeToMinigame, this);
	
	nomini.events.onInputOver.add(overMini, this);
    nomini.events.onInputOut.add(outMini, this);
    nomini.events.onInputUp.add(closeMinimenu, this);
	
	miniMenuGroup.add(game.add.tileSprite(250, 275, 300, 200, 'popmenu',0));
	miniMenuGroup.add(miniLabel);
	miniMenuGroup.add(yesmini);
	miniMenuGroup.add(nomini);
	playGroup.add(miniMenuGroup);
}
var gameOverGroup;
var gameOverLabel;
var scoreLabelOver;
var miniScoreLabel;
var againOver;
var quitOver;
function createGameOverMenu(){
	gameOverLabel = game.add.text(400, 315, "Game Over", styleMini);
	gameOverLabel.anchor.set(0.5);
	scoreLabelOver = game.add.text(365, 350, "Score:", styleMini2);
	miniScoreLabel = game.add.text(425, 350, miniScore, styleMini2);
	againOver = game.add.text(325, 400, "Again", styleMini2);
	quitOver = game.add.text(425, 400, "Quit", styleMini2);

	scoreLabelOver.anchor.set(0.5);
	miniScoreLabel.anchor.set(0.5);
	
	againOver.inputEnabled = true;
	quitOver.inputEnabled = true;

	againOver.events.onInputOver.add(overMini, this);
    againOver.events.onInputOut.add(outMini, this);
    againOver.events.onInputUp.add(restartMinigame, this);
	
	quitOver.events.onInputOver.add(overMini, this);
    quitOver.events.onInputOut.add(outMini, this);
    quitOver.events.onInputUp.add(changeToPlayOver, this);
	
	gameOverGroup.add(game.add.tileSprite(250, 275, 300, 200, 'popmenu',0));
	gameOverGroup.add(gameOverLabel);
	gameOverGroup.add(scoreLabelOver);
	gameOverGroup.add(miniScoreLabel);
	gameOverGroup.add(againOver);
	gameOverGroup.add(quitOver);
	
	minigameGroup.add(gameOverGroup);
}
var descGroup;
var quitDesc;
var questionDesc;
var aDesc;
var bDesc;
var cDesc;
var dDesc;
var gameOverStyleTitle = { font: "24px Arial", fill: "#000000", align: "center", wordWrap: true, wordWrapWidth: 600};
var gameOverStyle = { font: "24px Arial", fill: "#000000", align: "center", wordWrap: true, wordWrapWidth: 300};
var descDecoded = $.parseJSON(decisions);
function createDecisionsMenu(){
	if(dec < 5){
		var obj = descDecoded[dec];
		questionDesc = game.add.text(75, 40, obj["Question"], gameOverStyleTitle);
		gameOverLabel.anchor.set(0.5);
		aDesc = game.add.text(200, 220, obj["Answers"][0], gameOverStyle);
		aDesc.anchor.set(0.5);
		bDesc = game.add.text(600, 220, obj["Answers"][1], gameOverStyle);
		bDesc.anchor.set(0.5);
		cDesc = game.add.text(200, 450, obj["Answers"][2], gameOverStyle);
		cDesc.anchor.set(0.5);
		dDesc = game.add.text(600, 450, obj["Answers"][3], gameOverStyle);
		dDesc.anchor.set(0.5);
		
		quitDesc = game.add.text(10, 5, "X", gameOverStyle);
		quitDesc.inputEnabled = true;
		quitDesc.events.onInputOver.add(overMini, this);
		quitDesc.events.onInputOut.add(outMini, this);
		quitDesc.events.onInputUp.add(quitDecisions, this);

		game.input.onDown.add(answerDecision, this);
		descGroup.add(game.add.tileSprite(0, 0, 800, 600, 'descmenu',0));
		descGroup.add(aDesc);
		descGroup.add(bDesc);
		descGroup.add(cDesc);
		descGroup.add(dDesc);
		descGroup.add(quitDesc);
		descGroup.add(questionDesc);
		
		playGroup.add(descGroup);
	}else{
		questionDesc = game.add.text(75, 40, "No More Questions, Go to the Orb", gameOverStyleTitle);
		gameOverLabel.anchor.set(0.5);
		
		quitDesc = game.add.text(10, 5, "X", gameOverStyle);
		quitDesc.inputEnabled = true;
		quitDesc.events.onInputOver.add(overMini, this);
		quitDesc.events.onInputOut.add(outMini, this);
		quitDesc.events.onInputUp.add(quitDecisions, this);

		game.input.onDown.add(answerDecision, this);
		descGroup.add(game.add.tileSprite(0, 0, 800, 600, 'descmenu',0));
		descGroup.add(quitDesc);
		descGroup.add(questionDesc);
		
		playGroup.add(descGroup);
	}
}
function answerDecisionSend(letter){
	if(dec < 5){
		var riskNew = $.parseJSON(riskSess);
		var obj = descDecoded[dec];
		var change = obj[letter];
		for(var i = 0; i < change.length; i++){
			var tmp = change[i];
			var arr = tmp.split("|");
			riskNew[arr[0]] += Number(arr[1]);
		}
		riskSess = JSON.stringify(riskNew); //make changes on client side
		dec = dec + 1;
		$.ajax({
		   url: 'assets/php/social.php?request=decision&risk='+JSON.stringify(riskNew)+'&dec='+dec,
		   error: function() {
		   },
		   dataType: 'text',
		   success: function(data) {
			   
		   },
		   type: 'GET'
		});
		quitDecisions();
		createDecisionsMenu();
	}
}