class Map {
  contructor(id, GameObjects) {
    this.id = id;
    this.GameObjects = this.GameObjects;
  }
}

class GameObject {
  constructor(positionX, positionY, width, height, sprite, id) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.id = id;
  }

  render() {
    ctx.drawImage(
      this.sprite,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
}

class Item extends GameObject {
  constructor(positionX, positionY, width, height, sprite, id) {
    super(positionX, positionY, width, height, sprite, id);
    this.locate = 'map';
  }
  pickuped(playerId) {
    this.locate = playerId;
  }

  droped() {
    this.locate = 'map';
  }
}

class Player extends GameObject {
  constructor(positionX, positionY, width, height, sprite, id) {
    super(positionX, positionY, width, height, sprite, id);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.dropZone = 64;
    this.inventory = [];
  }

  pickup(itemId) {
    this.inventory.push(itemId);
  }

  drop(itemId) {
    this.inventory.splice(this.inventory.indexOf(itemId), 1);
  }

  moveX() {
    this.positionX += this.xSpeed;
  }

  moveY() {
    this.positionY += this.ySpeed;
  }

  focus() {
    ctx.restore();
    ctx.save();
    const canvasHeight = window.innerHeight * 0.8;
    const canvasWidth = window.innerWidth * 0.8;
    ctx.translate(
      -this.positionX + canvasWidth / 2 - this.width / 2,
      -this.positionY + canvasHeight / 2 - this.height / 2
    );
  }
}

class Cat extends Player {
  constructor(positionX, positionY, width, height, sprite, id) {
    super(positionX, positionY, width, height, sprite, id);
    this.count = 0;
  }

  animateRender() {
    if (this.count < 10) {
      ctx.drawImage(
        this.sprite,
        0,
        0,
        490,
        540,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    } else {
      pop.play();
      ctx.drawImage(
        this.sprite,
        0,
        540,
        490,
        616,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  }
}
