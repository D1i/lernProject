const loadingImg = () => {
  if (imgLoadings.every((e, i, arr) => e)) {
    console.log('Все изображения загружены!');
    clearTimeout(timer);
    gameStart();
  }
};

const loadingAudio = () => {
  if (audioLoadings.every((e, i, arr) => e)) {
    console.log('Все звуки загружены!');
    loadingImg();
  }
};

const newPlayer = new Cat(64, 64, plImg);
const newObject = new GameObject(64, 64, wingImg);
const wateringCan = new Item(64, 64, wateringCanImg);
const wateringCan2 = new Item(64, 64, wateringCanImg);
const wateringCan3 = new Item(64, 64, wateringCanImg);
const inventory = new PlayerInventory();
newPlayer.setInventoty(inventory);
let choisenPlayer = newPlayer;
const newMap = new GameMap();
const maps = [newMap];
maps.forEach((e, i) => {
  e.id = i;
});
newMap.addIn(newObject, 64, 64);
newMap.addIn(newPlayer, 0, 0);
newMap.addIn(wateringCan, -64, -64);
newMap.addIn(wateringCan2, 128, 128);
newMap.addIn(wateringCan3, -64, 56);
const timer = setInterval(loadingAudio, 100);

const gameStart = () => {
  requestAnimationFrame(() => {
    renderMap(newMap, choisenPlayer);
  });
  setInterval(() => {
    calculate(newMap);
  }, 20);
};

const clearMap = (canvasWidth, canvasHeight) => {
  ctx.clearRect(0, 0, canvasWidth * 2, canvasHeight * 2);
};

const calculate = (map) => {
  map.GameObjects.forEach((e) => {
    if (!e) return;
    const gameObj = e.gameObj;
    if (gameObj.moveX) {
      gameObj.moveX();
      e.x = gameObj.x;
      gameObj.moveY();
      e.y = gameObj.y;
    }
  });
};

const renderMap = (map, choisenPlayer) => {
  const canvasHeight = (window.innerHeight * 0.8) / 2;
  const canvasWidth = (window.innerWidth * 0.8) / 2;
  const playerX = choisenPlayer.x;
  const playerY = choisenPlayer.y;
  const playerWidth = choisenPlayer.width / 2;
  const playerHeight = choisenPlayer.height / 2;

  clearMap(canvasWidth, canvasHeight);
  map.GameObjects.forEach((e) => {
    if (!e) return;
    const gameObj = e.gameObj;
    gameObj.render(
      canvasWidth,
      canvasHeight,
      playerX,
      playerY,
      playerWidth,
      playerHeight
    );
  });

  const choisenItem = choisenPlayer.inventory.choisenItem;
  choisenPlayer.inventory.GameObjects.forEach((e, i) => {
    const gridInventory = domInventory.children[i];
    if (!e) {
      gridInventory.firstElementChild.setAttribute('src', './img/void.png');
      return;
    } else {
      gridInventory.firstElementChild.setAttribute('src', e.sprite.src);
    }

    if (choisenItem === i) {
      e.itemRender(canvasWidth, canvasHeight, playerWidth, playerHeight);
    }
  });
  requestAnimationFrame(() => {
    renderMap(newMap, choisenPlayer);
  });
};
