const wingImg = new Image();
const plImg = new Image();
wingImg.src = 'img/pngwing.png';
plImg.src = 'img/popCat.png';

const newPlayer = new Cat(0, 0, 64, 64, plImg);
const newPlayer2 = new Cat(64, 64, 64, 64, plImg);
const obj = new Object(32, 32, 64, 64, wingImg);

let choisenPlayer = newPlayer;

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

const startGame = () => {
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

wingImg.onload = () => {
  plImg.onload = () => {
    // setTimeout(startGame(), 10);
    setInterval(startGame, 10);
    // startGame();
  };
};
