const left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown'),
  space = keyboard(' ');

left.press = () => {
  choisenPlayer.xSpeed = -5;
};
 
left.release = () => {
  if (right.isUp) {
    choisenPlayer.xSpeed = 0;
  } else {
    choisenPlayer.xSpeed = 5;
  }
};

right.press = () => {
  choisenPlayer.xSpeed = 5;
};

right.release = () => {
  if (left.isUp) {
    choisenPlayer.xSpeed = 0;
  } else {
    choisenPlayer.xSpeed = -5;
  }
};

up.press = () => {
  choisenPlayer.ySpeed = -5;
};

up.release = () => {
  if (down.isUp) {
    choisenPlayer.ySpeed = 0;
  } else {
    choisenPlayer.ySpeed = 5;
  }
};

down.press = () => {
  choisenPlayer.ySpeed = 5;
};

down.release = () => {
  if (up.isUp) {
    choisenPlayer.ySpeed = 0;
  } else {
    choisenPlayer.ySpeed = -5;
  }
};

space.press = () => {
  if (choisenPlayer === newPlayer) {
    choisenPlayer = newPlayer2;
    newPlayer.xSpeed = 0;
    newPlayer.ySpeed = 0;
  } else {
    choisenPlayer = newPlayer;
    newPlayer2.xSpeed = 0;
    newPlayer2.ySpeed = 0;
  }
};
