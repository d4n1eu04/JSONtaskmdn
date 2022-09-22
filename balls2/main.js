// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {

  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = (this.x + this.size) - (ball.x + ball.size);
        const dy = (this.y + this.size) - (ball.y + ball.size);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          this.velX = -(this.velX);
          this.velY = -(this.velY);
        }
      }
    }
  }
}

class evilCircle extends Shape {
  constructor(x, y) {
    const velXY = 20;
    super(x, y, velXY, velXY);
    this.color = 'white';
    this.size = 13;

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break
        case 's':
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= 2;

    }
    if ((this.x - this.size) <= 0) {
      this.x += 2;
    }

    if ((this.y + this.size) >= height) {
      this.y -= 2;

    }
    if ((this.y - this.size) <= 0) {
      this.y += 2;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists === true) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
        }
      }
    }
  }
}
class evilBallPTwo extends Shape {
  constructor(x, y) {
    const velXY = 20;
    super(x, y, velXY, velXY);
    this.color = 'yellow';
    this.size = 13;

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.x -= this.velX;
          break;
        case 'ArrowRight':
          this.x += this.velX;
          break;
        case 'ArrowUp':
          this.y -= this.velY;
          break
        case 'ArrowDown':
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 4;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= 2;

    }
    if ((this.x - this.size) <= 0) {
      this.x += 2;
    }

    if ((this.y + this.size) >= height) {
      this.y -= 2;

    }
    if ((this.y - this.size) <= 0) {
      this.y += 2;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists === true) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
        }
      }
    }
  }
}

const evilBall = new evilCircle(
  random(-7, 7),
  random(-7, 7)
)
const evilBall2 = new evilBallPTwo(
  random(-7, 7),
  random(-7, 7)
)

const balls = [];

while (balls.length < 30) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

const counter = document.querySelector('.ballcount');

let twoPlayerMode = false;
let btn2P = document.querySelector('.duo');

btn2P.addEventListener('click', () => {
  if (twoPlayerMode) {
    twoPlayerMode = false;
  } else if (!twoPlayerMode) {
    twoPlayerMode = true;
  }
});

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  let ballcounter = balls.length;
  for (const ball of balls) {
    if (ball.exists === true) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    } else if (ball.exists === false) {
      ballcounter--;
    }

    counter.textContent = `Bolas restantes: ${ballcounter}`;
  }

  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  if (twoPlayerMode) {
    evilBall2.draw();
    evilBall2.checkBounds();
    evilBall2.collisionDetect();
  };

  requestAnimationFrame(loop);
}

loop();
