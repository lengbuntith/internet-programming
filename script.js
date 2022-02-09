const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variables
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let userName;
let loggedIn = false;

// Event Listeners
document.addEventListener("keydown", function (evt) {
  keys[evt.code] = true;
});
document.addEventListener("keyup", function (evt) {
  keys[evt.code] = false;
});

class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0;
    this.jumpForce = 15;
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;

    const image = new Image();
    image.src = "./img/Trex.png";

    image.onload = () => {
      this.image = image;
      this.width = 100;
      this.height = 100;
    };
  }

  Animate() {
    // Jump
    if (keys["ArrowUp"] || keys["KeyW"] || keys["Space"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys["ArrowDown"] || keys["ShiftLeft"] || keys["KeyS"]) {
      this.h = this.originalHeight / 2;
    } else {
      this.h = this.originalHeight;
    }

    this.y += this.dy;

    // Gravity
    if (this.y + this.h < canvas.height) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h;
    }

    this.Draw();
  }

  Jump() {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath();
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
  }
}

class Obstacle {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dx = -gameSpeed;

    const image = new Image();
    image.src = "./img/fire.png";
    image.onload = () => {
      this.image = image;
    };
  }

  Update() {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath();
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
  }
}

class Text {
  constructor(t, x, y, a, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}

// Game Functions
function SpawnObstacle() {
  let size = RandomIntInRange(20, 70);
  let type = RandomIntInRange(0, 1);
  let obstacle = new Obstacle(
    canvas.width + size,
    canvas.height - size,
    size,
    size,
    "#2484E4"
  );

  if (type == 1) {
    obstacle.y -= player.originalHeight - 10;
  }
  obstacles.push(obstacle);
}

function RandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start() {
  if (loggedIn) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highscore = 0;
    if (localStorage.getItem(userName)) {
      highscore = localStorage.getItem(userName);
    }

    player = new Player(25, 0, 80, 80, "#FF5858");

    scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");
    highscoreText = new Text(
      "Highscore: " + highscore,
      canvas.width - 25,
      25,
      "right",
      "#212121",
      "20"
    );

    requestAnimationFrame(Update);
  }
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
  if (loggedIn) {
    requestAnimationFrame(Update);
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;
    if (spawnTimer <= 0) {
      SpawnObstacle();
      console.log(obstacles);
      spawnTimer = initialSpawnTimer - gameSpeed * 8;

      if (spawnTimer < 60) {
        spawnTimer = 60;
      }
    }

    // Spawn Enemies
    for (let i = 0; i < obstacles.length; i++) {
      let o = obstacles[i];

      if (o.x + o.w < 0) {
        obstacles.splice(i, 1);
      }

      if (
        player.x < o.x + o.w &&
        player.x + player.w > o.x &&
        player.y < o.y + o.h &&
        player.y + player.h > o.y
      ) {
        obstacles = [];
        score = 0;
        spawnTimer = initialSpawnTimer;
        gameSpeed = 3;
        window.localStorage.setItem(userName, highscore);
        showLogin(true);
      }

      o.Update();
    }

    player.Animate();

    score++;
    scoreText.t = "Score: " + score;
    scoreText.Draw();

    if (score > highscore) {
      highscore = score;
      highscoreText.t = "Highscore: " + highscore;
    }

    highscoreText.Draw();

    gameSpeed += 0.003;
  }
}

const form = document.getElementById("form");
const playerName = document.getElementById("name");
const loginForm = document.getElementById("login");

function showLogin(bool) {
  if (bool) {
    loginForm.style.display = "flex";
    loggedIn = false;
    canvas.style.display = "none";
  } else {
    loggedIn = true;
    loginForm.style.display = "none";
    canvas.style.display = "inline-block";
  }
}

showLogin(true);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(playerName.value);
  userName = playerName.value;
  showLogin(false);

  Start();
});

//Start();
