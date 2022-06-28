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
    gameObj.id = this.countId;
    const gameObjDescription = {
      gameObj: gameObj,
      x: x,
      y: y,
      id: this.countId,
    };
    this.GameObjects.push(gameObjDescription);
    this.countId++;
  }

  distanceFromPlayer(choisenPlayer) {
    return this.GameObjects.map((e) => {
      const obj = e.gameObj;

      if (obj !== choisenPlayer) {
        const distanse = {
          obj: obj,
          distanceX: choisenPlayer.x - obj.x,
          distanceY: choisenPlayer.y - obj.y,
        };
        return distanse;
      }
      return null;
    });
  }
}

class Inventory extends Package {
  constructor(GameObjects) {
    super(GameObjects);
    this.id = null;
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
    this.id = null;
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
  itemRender(
    canvasWidth,
    canvasHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  ) {
    ctx.drawImage(
      this.sprite,
      -playerWidth + canvasWidth + playerWidth * 2,
      -playerHeight + canvasHeight,
      this.width,
      this.height
    );
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

  setInventoty(inventory) {
    inventory.id = this.id;
    this.inventory = inventory;
  }

  pickup(map) {
    const distanse = map.distanceFromPlayer(this);
    console.log(distanse);
    distanse.forEach((e) => {
      if (e === null) return;
      if (e.obj.pickuped) {
        console.log('lol');
        if (e.distanceX <= 100 && e.distanceY <= 100) {
          console.log('lol, lol');
          map.GameObjects.splice(map.GameObjects.indexOf(e.obj), 1);
          this.inventory.GameObjects.push(e.obj);
          e.obj.pickuped(this.id);
          return;
        }
      }
    });
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
