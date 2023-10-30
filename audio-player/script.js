const container = document.querySelector('#container');
const musicImg = document.querySelector('#image img');
const musicName = document.querySelector('#name');
const musicArtist = document.querySelector('#artist');
const music = document.querySelector('#music');
const duration = document.querySelector('#duration');
const playPauseBtn = document.querySelector('#play-pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progressArea = document.querySelector('#container__progress-area');
const progressBar = document.querySelector('#progress-area__bar');

let musicIndex = 0;

// --------------- Загружаем данные музыки ---------------
window.addEventListener('load', () => {
    loadMusic(musicIndex);
});

function loadMusic(index) {
    musicName.innerHTML = playList[index].name;       // Название аудиотрека
    musicArtist.innerHTML = playList[index].artist;   // Автор трека
    musicImg.src = playList[index].img;               // Обложка аудиотрека
    music.src = playList[index].src;                  // Источник аудиотрека
    duration.innerHTML = playList[index].duration;    // Продолжительность аудиотрека
}

//  При клике по кнопке "Play" запускается проигрывание аудиотрека 
function playMusic() {
    container.classList.add('pause');
    playPauseBtn.src = "../audio-player/assets/icons/pause.svg"
    music.play();
}

//  При клике по кнопке "Pause" аудиотрек останавливается
function pauseMusic() {
    container.classList.remove('pause');
    playPauseBtn.src = "../audio-player/assets/icons/play.svg"
    music.pause();
}

// При клике по кнопке "Вперёд" переключается проигрываемый аудиотрек на следующий 
function nextMusic() {
    musicIndex++;
    if (musicIndex > playList.length - 1) musicIndex = 0; // При пролистывании последнего аудиотрека, возвращаемся к первому
    loadMusic(musicIndex);
    playMusic();
}

// При клике по кнопке "Назад" переключается проигрываемый аудиотрек на предыдущий 
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) musicIndex =  playList.length - 1; // Про пролистовании после первого идет последний аудиотрек
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener('click', () => {
    let isMusicPaused = container.classList.contains('pause');
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener('click', nextMusic);
prevBtn.addEventListener('click', prevMusic);

//  Oтображаем прогресс проигрывания текущего аудиотрека 
music.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const durationTime = e.target.duration;
    let progressLength = (currentTime/durationTime) * 100;
    progressBar.style.width = `${progressLength}%`;

    let musicCurrentTime = document.querySelector('#current');
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentMin < 10) currentMin = `0${currentMin}`;
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`;
});

//  При клике ползунка вручную меняется текущее время проигрывания аудиотрека 
progressArea.addEventListener('click', (e) => {
    let progressWidth = progressArea.clientWidth;
    let checkedOffSetX = e.offsetX;
    let musicDuration = music.duration;

    music.currentTime = (checkedOffSetX / progressWidth) * musicDuration;
    playMusic();
});

// Автоматическое переключение на следующий аудиотрек по истечении продолжительности текущего аудиотрека 
music.addEventListener('ended', () => {
    nextMusic();
});







