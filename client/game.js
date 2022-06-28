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
let choisenPlayer = newPlayer;
const newMap = new GameMap();
newMap.addIn(newObject, 64, 64);
newMap.addIn(newPlayer, 0, 0);
const timer = setInterval(loadingAudio, 100);

const gameStart = () => {
  setInterval(() => {
    renderMap(newMap, choisenPlayer);
  }, 10);
};

const clearMap = (canvasWidth, canvasHeight) => {
  ctx.clearRect(0, 0, canvasWidth * 2, canvasHeight * 2);
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
};
