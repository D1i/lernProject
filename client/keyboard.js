function keyboard(value) {
  //Создание объекта для регестрирования событий клавиатуры
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //Клавиша нажата
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //Клавиша отпущена
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Создание регистрации события
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  //Присоединение события
  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  //Отсоединение события
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
}
