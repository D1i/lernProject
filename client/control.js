const left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown'),
  space = keyboard(' '),
  one = keyboard('1'),
  two = keyboard('2'),
  third = keyboard('3'),
  four = keyboard('4'),
  five = keyboard('5'),
  six = keyboard('6'),
  seven = keyboard('7'),
  eight = keyboard('8'),
  nine = keyboard('9'),
  zero = keyboard('0'),
  g = keyboard('g'),
  e = keyboard('e');

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

e.press = () => {
  choisenPlayer.pickup(maps[0]);
};

one.press = () => {
  choisenPlayer.inventory.choisenItem = 0;
};

two.press = () => {
  choisenPlayer.inventory.choisenItem = 1;
};

third.press = () => {
  choisenPlayer.inventory.choisenItem = 2;
};

four.press = () => {
  choisenPlayer.inventory.choisenItem = 3;
};

five.press = () => {
  choisenPlayer.inventory.choisenItem = 4;
};

six.press = () => {
  choisenPlayer.inventory.choisenItem = 5;
};

seven.press = () => {
  choisenPlayer.inventory.choisenItem = 6;
};

eight.press = () => {
  choisenPlayer.inventory.choisenItem = 7;
};

nine.press = () => {
  choisenPlayer.inventory.choisenItem = 8;
};

zero.press = () => {
  choisenPlayer.inventory.choisenItem = 9;
};

g.press = () => {
  const item =
    choisenPlayer.inventory.GameObjects[choisenPlayer.inventory.choisenItem];
  console.log(item);
  choisenPlayer.drop(item, maps[0]);
};
