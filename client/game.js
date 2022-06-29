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

const domInventory = document.querySelector('.inventory');

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
  setInterval(() => {
    renderMap(newMap, choisenPlayer);
  }, 10);
};

const clearMap = (canvasWidth, canvasHeight) => {
  ctx.clearRect(0, 0, canvasWidth * 2, canvasHeight * 2);
};

// const renderInventory = () => {
//   choisenPlayer.
// }

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
    if (gameObj.moveX) {
      gameObj.moveX();
      e.x = gameObj.x;
      gameObj.moveY();
      e.y = gameObj.y;
    }
  });

  const choisenItem = choisenPlayer.inventory.choisenItem;
  const elemStyle = domInventory.children[choisenItem].style;

  choisenPlayer.inventory.GameObjects.forEach((e, i) => {
    const gridInventory = domInventory.children[i];
    gridInventory.style.backgroundColor = 'rgb(214, 151, 99)';
    gridInventory.style.border = 'solid 3px rgb(141, 78, 27)';
    if (!e) {
      gridInventory.firstElementChild.setAttribute('src', './img/void.png');
      return;
    } else {
      gridInventory.firstElementChild.setAttribute('src', e.sprite.src);
    }

    if (choisenItem === i) {
      e.itemRender(
        canvasWidth,
        canvasHeight,
        playerX,
        playerY,
        playerWidth,
        playerHeight
      );
    }
  });
  elemStyle.backgroundColor = 'rgb(181, 233, 121)';
  elemStyle.border = 'solid 3px green';
};
