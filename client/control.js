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
  choisenPlayer.xSpeed = -10;
};

left.release = () => {
  if (right.isUp) {
    choisenPlayer.xSpeed = 0;
  } else {
    choisenPlayer.xSpeed = 10;
  }
};

right.press = () => {
  choisenPlayer.xSpeed = 10;
};

right.release = () => {
  if (left.isUp) {
    choisenPlayer.xSpeed = 0;
  } else {
    choisenPlayer.xSpeed = -10;
  }
};

up.press = () => {
  choisenPlayer.ySpeed = -10;
};

up.release = () => {
  if (down.isUp) {
    choisenPlayer.ySpeed = 0;
  } else {
    choisenPlayer.ySpeed = 10;
  }
};

down.press = () => {
  choisenPlayer.ySpeed = 10;
};

down.release = () => {
  if (up.isUp) {
    choisenPlayer.ySpeed = 0;
  } else {
    choisenPlayer.ySpeed = -10;
  }
};

e.press = () => {
  console.log('Нажате e');
  choisenPlayer.pickup(maps[0]);
};
space.press = () => {
  console.log('Нажате e');
  choisenPlayer.pickup(maps[0]);
};

const updateInvetory = (num) => {
  choisenPlayer.inventory.choisenItem = num;
  const choisenItem = choisenPlayer.inventory.choisenItem;
  Array.from(domInventory.children).forEach((e, i) => {
    const gridInventory = domInventory.children[i].style;
    if (i === choisenItem) {
      gridInventory.backgroundColor = 'rgb(181, 233, 121)';
      gridInventory.border = 'solid 3px green';
    } else {
      gridInventory.backgroundColor = 'rgb(214, 151, 99)';
      gridInventory.border = 'solid 3px rgb(141, 78, 27)';
    }
  });
};

one.press = () => {
  updateInvetory(0);
};

two.press = () => {
  updateInvetory(1);
};

third.press = () => {
  updateInvetory(2);
};

four.press = () => {
  updateInvetory(3);
};

five.press = () => {
  updateInvetory(4);
};

six.press = () => {
  updateInvetory(5);
};

seven.press = () => {
  updateInvetory(6);
};

eight.press = () => {
  updateInvetory(7);
};

nine.press = () => {
  updateInvetory(8);
};

zero.press = () => {
  updateInvetory(9);
};

g.press = () => {
  console.log('Нажате g');
  const item =
    choisenPlayer.inventory.GameObjects[choisenPlayer.inventory.choisenItem];
  choisenPlayer.drop(item, maps[0]);
};
