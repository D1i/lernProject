class Package {
  constructor(id) {
    this.GameObjects = [];
    this.countId = 0;
    this.id = id;
  }
}

class GameMap extends Package {
  constructor(GameObjects, id) {
    super(GameObjects, id);
  }
  addIn(gameObj, x, y) {
    gameObj.x = x;
    gameObj.y = y;
    gameObj.locate = this.id;
    const gameObjDescription = {
      gameObj: gameObj,
      x: x,
      y: y,
      id: this.countId,
    };
    this.GameObjects.push(gameObjDescription);
    this.countId++;
  }
}

class Inventory extends Package {
  constructor(GameObjects) {
    super(GameObjects);
  }
}

class GameObject {
  constructor(width, height, sprite) {
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.x = 0;
    this.y = 0;
    this.locate = null;
  }

  render(
    canvasWidth,
    canvasHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  ) {
    ctx.drawImage(
      this.sprite,
      this.x - playerX - playerWidth + canvasWidth,
      this.y - playerY - playerHeight + canvasHeight,
      this.width,
      this.height
    );
  }
}

class Item extends GameObject {
  constructor(width, height, sprite, id) {
    super(width, height, sprite, id);
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
  constructor(width, height, sprite, id) {
    super(width, height, sprite, id);
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
    this.x += this.xSpeed;
  }

  moveY() {
    this.y += this.ySpeed;
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
  render(
    canvasWidth,
    canvasHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  ) {
    ctx.drawImage(
      this.sprite,
      this.x - playerX - playerWidth + canvasWidth,
      this.y - playerY - playerHeight + canvasHeight,
      this.width,
      this.height
    );
  }

  render(
    canvasWidth,
    canvasHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  ) {
    if (this.count < 50) {
      ctx.drawImage(
        this.sprite,
        0,
        0,
        490,
        540,
        this.x - playerX - playerWidth + canvasWidth,
        this.y - playerY - playerHeight + canvasHeight,
        this.width,
        this.height
      );
    } else {
      if (this.count === 50) pop.play();
      ctx.drawImage(
        this.sprite,
        0,
        540,
        490,
        616,
        this.x - playerX - playerWidth + canvasWidth,
        this.y - playerY - playerHeight + canvasHeight,
        this.width,
        this.height
      );
    }
    this.count++;
    if (this.count === 100 || !(this.xSpeed || this.ySpeed)) this.count = 0;
  }
}
