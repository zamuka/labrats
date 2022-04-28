const sounds = {
  step: {
    audio: new Audio('/sounds/step.wav'),
    volume: 0.2,
  },
  chew: {
    audio: new Audio('/sounds/chew.wav'),
    volume: 1,
  },
};

sounds.step.volume = 0.1;

/**
 *
 * @param {keyof typeof sounds} effectName
 */
export function play(effectName) {
  const { audio, volume } = sounds[effectName];
  audio.pause();
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();

}