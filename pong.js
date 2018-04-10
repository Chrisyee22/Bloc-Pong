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



   Ball.prototype.update = function(paddle1, paddle2) {
     this.x += this.x_speed;
     this.y += this.y_speed;
     var top_x = this.x - 8;
     var top_y = this.y - 8;
     var bottom_x = this.x + 8;
     var bottom_y = this.y + 8;

     //hitting bottom wall
     if(this.y - 8 > 400) {
       this.y= 392;
       this.y_speed = -this.y_speed;
     }else if (this.y + 8 < 0) { //top wall
       this.y = 8;
       this.y_speed = -this.y_speed;
     }

     if(this.x < 0 || this.x > 800 ){
       //point scored
       this.x_speed = -3;
       this.y_speed = 0;
       this.x = 400;
       this.y = 200;
     }

       if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x){
         //player paddle collision
         this.x_speed = 3;
         this.y_speed += (paddle1.y_speed / 2);
         this.x += this.x_speed;
       }
       if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x){
         //computer paddle
         this.x_speed = -3;
         this.y_speed +=(paddle2.y_speed / 2);
         this.x += this.x_speed;
       }

   };

   var update = function(){
     player.update();
     computer.update(ball);
     ball.update(player.paddle, computer.paddle);
   };

   Computer.prototype.update = function(ball){
     var y_pos = ball.y;
     var diff = - ((this.paddle.y + (this.paddle.width / 2)) - y_pos);
     if (diff < 0 && diff < -4){
       diff = -5;
     }else if (diff > 0 && diff > 4){
       diff = 5;
     }
     this.paddle.move(diff, 0);
     if (this.paddle.x < 0){
       this.paddle.x = 0;
     }else if (this.paddle.y + this.paddle.width > 400) {
       this.paddle.y = 800 - this.paddle.width;
     }
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
       this.x_speed = -3;
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
