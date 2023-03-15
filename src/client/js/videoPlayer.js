const playBtn = document.getElementById('play');
const playBtnIcon = playBtn.querySelector('i');
const muteBtn = document.getElementById('mute');
const muteBtnIcon = muteBtn.querySelector('i');
const currnetTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('volume');
const video = document.querySelector('video');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const fullScreenIcon = fullScreenBtn.querySelector('i');
const videoContainer = document.getElementById('videoContainer');
const controls = document.getElementById('controls');

let _volume = 0;
let timeout;
let i;
volumeRange.value = 0.5;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
    playBtnIcon.className = 'fas fa-pause';
  } else {
    video.pause();
    playBtnIcon.className = 'fas fa-play';
  }
};

const handleMute = (event) => {
  if (video.muted) {
    volumeRange.value = _volume;
    video.muted = false;
    muteBtnIcon.className = 'fas fa-volume-mute';
  } else {
    _volume = volumeRange.value;
    video.muted = true;
    muteBtnIcon.className = 'fas fa-volume-up';
  }
};

const handleVolumeChange = (event) => {
  video.volume = event.target.value;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }
};

const formatTime = (seconds) => {
  return new Date(seconds).toISOString().substring(i, 19);
};

const handleLoadedMetadata = () => {
  if (video.duration >= 36000) i = 11;
  else if (video.duration >= 3600) i = 12;
  else if (video.duration >= 600) i = 14;
  else i = 15;
  currentTime.innerText = formatTime(0);
  totalTime.innerText = formatTime(Math.floor(video.duration) * 1000);
  timeline.max = video.duration;
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime) * 1000);
  timeline.value = video.currentTime;
};

const handleTimelineChange = (event) => {
  video.currentTime = event.target.value;
};

const handleFullScreen = () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else videoContainer.requestFullscreen();
};

const handleFullScreenIcon = () => {
  fullScreenIcon.className = document.fullscreenElement
    ? 'fas fa-compress'
    : 'fas fa-expand';
};
const handleMouseMove = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  controls.classList.add('showing');
  timeout = setTimeout(() => controls.classList.remove('showing'), 3000);
};

const handleKeydown = (event) => {
  const key = event.key;
  if (key === ' ') {
    event.preventDefault();
    handlePlayClick();
  } else if (key === 'm' || key === 'M') handleMute();
  else if (key === 'f' || key === 'F') handleFullScreen();
};

const handleEnded = async () => {
  const id = videoContainer.dataset.id;
  await fetch(`/api/videos/${id}/view`, { method: 'POST' });
};
playBtn.addEventListener('click', handlePlayClick);
video.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.readyState
  ? handleLoadedMetadata()
  : video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener('input', handleTimelineChange);
fullScreenBtn.addEventListener('click', handleFullScreen);
videoContainer.addEventListener('mousemove', handleMouseMove);
videoContainer.addEventListener('keydown', handleKeydown);
video.addEventListener('dblclick', handleFullScreen);
document.addEventListener('fullscreenchange', handleFullScreenIcon);
video.addEventListener('ended', handleEnded);
