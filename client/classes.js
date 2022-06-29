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
    for (let i = 0; ; i++) {
      console.log('сработало');
      if (!this.GameObjects[i]) {
        // console.log('сработало');
        gameObj.x = x;
        gameObj.y = y;
        gameObj.locate = this.id;
        gameObj.id = i;
        const gameObjDescription = {
          gameObj: gameObj,
          x: x,
          y: y,
          id: i,
        };
        this.GameObjects[i] = gameObjDescription;
        return;
      }
    }
  }

  removeIn(gameObj) {
    this.GameObjects[gameObj.id] = null;
  }

  distanceFromPlayer(choisenPlayer) {
    return this.GameObjects.map((e) => {
      if (!e) return;
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

class PlayerInventory extends Package {
  constructor() {
    super();
    this.id = null;
    this.choisenItem = 0;
    this.GameObjects = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
  }

  addItem(item) {
    if (this.GameObjects[this.choisenItem]) return null;
    this.GameObjects[this.choisenItem] = item;
    return true;
    // const adding = this.GameObjects.some((e, i, arr) => {
    //   if (!e) {
    //     arr[i] = item;
    //     return true;
    //   }
    // });
    // return null;
  }

  removeItem(item) {
    this.GameObjects[this.GameObjects.indexOf(item)] = null;
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
  droped(mapId) {
    this.locate = mapId;
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
    distanse.forEach((e) => {
      if (!e) return;
      if (e.obj.pickuped) {
        if (Math.abs(e.distanceX) <= 100 && Math.abs(e.distanceY) <= 100) {
          const adding = this.inventory.addItem(e.obj);
          if (adding) {
            map.removeIn(e.obj);
            e.obj.pickuped(this.id);
          }
        }
      }
    });
  }

  drop(item, map) {
    if (!item) return;
    this.inventory.removeItem(item);
    console.log(item);
    map.addIn(item, choisenPlayer.x, choisenPlayer.y);
    console.log(map);
    item.droped(map.id);
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
