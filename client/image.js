const images = [new Image(), new Image(), new Image()];
const [wingImg, plImg, wateringCanImg] = images;

wingImg.src = 'img/pngwing.png';
plImg.src = 'img/popCat.png';
wateringCanImg.src = 'img/wateringCan.png';

const imgLoadings = [];
images.forEach((e, i) => {
  imgLoadings.push(false);
  e.onload = () => {
    imgLoadings[i] = true;
  };
  e.onerror = (err) => {
    console.log(err);
  };
});
