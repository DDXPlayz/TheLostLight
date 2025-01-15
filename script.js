const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Still Here",
    name: "DDXPlayz",
    source:
      "Songs/Still_Here-audio.mp3",
  },
  {
    title: "Chasing Dreams",
    name: "DDXPlayz",
    source:
      "Songs/Chasing_Dreams-audio.mp3",
  },
  {
    title: "Can't Talk to You",
    name: "DDXPlayz",
    source:
      "Songs/Cant_Talk_to_You-audio.mp3",
  },
  {
    title: "Irreplacable",
    name: "DDXPlayz",
    source:
      "Songs/Irreplaceable-audio.mp3",
  },
  {
    title: "Suppressed Feelings",
    name: "DDXPlayz",
    source:
      "Songs/Suppressed_Feelings-audio.mp3",
  },

  {
    title: "Fool for Hope",
    name: "DDXPlayz",
    source:
      "Songs/Fool_for_Hope-audio.mp3",
  },
  {
    title: "Lost in My Mind",
    name: "DDXPlayz",
    source:
      "Songs/Lost_in_my_Mind-audio.mp3",
  },
  {
  title: "Find a Way",
  name: "DDXPlayz",
  source:
    "Songs/Find_a_Way-audio.mp3",
  },
  {
    title: "Afraid to Fall",
    name: "DDXPlayz",
    source:
      "Songs/Afraid_to_Fall-audio.mp3",
  },
  {
  title: "Let go",
  name: "DDPlayz",
  source:
    "Songs/Let_Go-audio.mp3",
  }
];

let currentSongIndex = 5;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); 
  playSong(); 
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 5,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo(); 
  playPause(); 
});
