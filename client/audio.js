const audios = [new Audio()];
const [pop] = audios;

pop.src = 'audio/pop.mp3';

const audioLoadings = [];
audios.forEach((e, i) => {
  audioLoadings.push(false);
  e.oncanplaythrough = () => {
    audioLoadings[i] = true;
  };
  e.onerror = (err) => {
    console.log(err);
  };
});
