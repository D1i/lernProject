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

const newPlayer = new Cat(0, 0, 64, 64, plImg, 0);
const newPlayer2 = new Cat(64, 64, 64, 64, plImg, 1);
const obj = new GameObject(32, 32, 64, 64, wingImg, 2);

let choisenPlayer = newPlayer;

const timer = setInterval(loadingAudio, 100);

const gameStart = () => {
  console.log('Старт игры');
  const clearScreen = () => {
    const canvasHeight = window.innerHeight * 0.8;
    const canvasWidth = window.innerWidth * 0.8;
    ctx.clearRect(
      choisenPlayer.positionX - canvasWidth / 2 + choisenPlayer.width / 2,
      choisenPlayer.positionY - canvasHeight / 2 + choisenPlayer.height / 2,
      canvasWidth,
      canvasHeight
    );
  };

  const calculate = () => {
    if (
      choisenPlayer.count < 20 &&
      (choisenPlayer.xSpeed || choisenPlayer.ySpeed)
    ) {
      choisenPlayer.count++;
    } else {
      choisenPlayer.count = 0;
    }
    clearScreen();
    choisenPlayer.moveX();
    choisenPlayer.moveY();
    choisenPlayer.focus();
    newPlayer.animateRender();
    newPlayer2.animateRender();
    obj.render();
  };

  setInterval(calculate, 10);
};
