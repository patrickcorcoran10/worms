var s;
var scl = 20;
var food;
var score = 0;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder");
  s = new Worm();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  s.death();
  s.update();
  s.show();

  if (s.eat(food)) {
    pickLocation();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.direction(-1, 0);
  }
}

function Worm() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.direction = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (position) {
    var d = dist(this.x, this.y, position.x, position.y);

    if (d < 1) {
      this.total++;
      score++;
      document.getElementById("score").innerHTML = score;
      return true;
    } else {
      return false;
    }
  };

  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var position = this.tail[i];
      var distance = dist(this.x, this.y, position.x, position.y);
      if (distance < 1) {
        this.total = 0;
        this.tail = [];
        alert("You Got Got Pal. Your score was " + score);
        location.reload();
      }
    }
  };

  this.update = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.show = function () {
    fill(255);
    for (var i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };
}
