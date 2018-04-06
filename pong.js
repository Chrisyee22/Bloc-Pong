
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

    var width = 800;
    var height = 400;

   var player = new Player();
   var computer = new Computer();
   var ball = new Ball(400, 200);
   canvas.width = width;
   canvas.height = height;

   context.fillStyle = "#79ff4d";
   context.fillRect(0, 0, width, height);

   context.beginPath();
         context.moveTo(400, 0);
         context.lineTo(400, 400);
         context.lineWidth = 8;
         context.setLineDash ([8])
         context.strokeStyle = "#0066ff";
         context.stroke();

   window.onload = function() {
       document.body.appendChild(canvas);
       player.paddle.render();
       computer.paddle.render();
       ball.render();
   };

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

   function Computer() {
       this.paddle = new Paddle(780, 180, 10, 50);
   }

   Player.prototype.create = function() {
       this.paddle.create();
   };

   Computer.prototype.create = function() {
       this.paddle.create();
   };


//Ball: {
   function Ball(x, y) {
       this.x = x;
       this.y = y;
       this.x_speed = 0;
       this.y_speed = 0;
       this.radius = 8;
   }

   Ball.prototype.render = function() {
       context.beginPath();
       context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
       context.fillStyle = "#ff751a";
       context.fill();
   };

   Ball.prototype.create = function() {
       this.ball.create();
   };
