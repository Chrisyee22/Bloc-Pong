var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');

   var width = 800;
   var height = 400;

   var player = new Player();
   var computer = new Computer();
   var ball = new Ball(400, 200);

   canvas.width = width;
   canvas.height = height;

    var render = function(){
       context.fillStyle = "#79ff4d";
       context.fillRect(0, 0, width, height);
       context.beginPath();
       context.moveTo(400, 0);
       context.lineTo(400, 400);
       context.lineWidth = 15;
       context.setLineDash ([13]);
       context.strokeStyle = "#0066ff";
       context.stroke();
       player.render();
       computer.render();
       ball.render();

    };


   window.onload = function() {
       document.body.appendChild(canvas);
       animate(step)
       player.paddle.render();
       computer.paddle.render();
       ball.render();
   };


   var step = function(){
     update();
     render();
     animate(step);
   };

   var keysDown = {};
   window.addEventListener("keydown", function(event){
     keysDown[event.keyCode] = true;
   });

   window.addEventListener("keyup", function(event){
     delete keysDown[event.keyCode];
   });

   var update = function() {
     ball.update();
   };

   Ball.prototype.update = function() {
     this.x += this.x_speed;
     this.y += this.y_speed;
   };

   var update = function(){
     player.update();
     ball.update(player.paddle, computer.paddle);
   };

   Player.prototype.update = function(){
     for(var key in keysDown) {
       var value = Number(key);
       if(value == 38) {
         this.paddle.move(-4, 0);
       } else if (value == 40) {
         this.paddle.move(4, 0);
       }else {
         this.paddle.move(0, 0);
       }
     }
   };

   Paddle.prototype.move = function(y){
     this.y += y;
     this.y_speed = y;
     if(this.y < 0){
       this.y = 0;
       this.y_speed = 0;
     } else if (this.y + this.height > 400){
       this.y = 400 - this.height;
       this.y_speed = 0;
     }
   }

//Paddle: {
   function Paddle(x, y, width, height) {
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.x_speed = 0;
       this.y_speed = 0;
   }

   Paddle.prototype.render = function() {
       context.fillStyle = "#ff00ff";
       context.fillRect(this.x, this.y, this.width, this.height);
   };

   function Player() {
       this.paddle = new Paddle(10, 180, 10, 50);
   }

   Player.prototype.render = function() {
        this.paddle.render();
   };

//ai paddle
   function Computer() {
       this.paddle = new Paddle(780, 180, 10, 50);
   }

   Computer.prototype.render = function() {
       this.paddle.render();
   };


//Ball: {
   function Ball(x, y) {
       this.x = x;
       this.y = y;
       this.x_speed = 3;
       this.y_speed = 0;
       this.radius = 8;
   }

   Ball.prototype.render = function() {
       context.beginPath();
       context.arc(this.x, this.y, this.radius, 2* Math.PI, false);
       context.fillStyle = "#ff751a";
       context.fill();
   };

   Ball.prototype.create = function() {
       this.ball.create();
   };
