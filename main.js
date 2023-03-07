let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
const playlist = document.querySelector(".playlist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;


// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },

  {
    name: "Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau",
    artist: "O.Lew",
    image: "https://avatar-ex-swe.nixcdn.com/song/share/2022/12/28/b/a/a/2/1672214551101.jpg",
    path: "a.mp3",
  },

  {
    name: "Mong Một Ngày Em Nhớ Đến Anh",
    artist: " Huỳnh James, Pjnboys",
    image: "https://avatar-ex-swe.nixcdn.com/song/2023/02/02/7/3/b/e/1675315450366_640.jpg",
    path: "MongMotNgayAnhNhoDenEm.mp3",
  },

  {
    name: "My Stupid Heart",
    artist: "Walk Off The Earth, Lauv",
    image: "https://i.scdn.co/image/ab67616d0000b273e7394926d34dc63fa76102a0",
    path: "https://vnso-zn-15-tf-mp3-320s1-zmp3.zmdcdn.me/99b1d5246c64853adc75/268433311058632030?authen=exp=1678285747~acl=/99b1d5246c64853adc75/*~hmac=563b0b14e07ffae8997e82a673becbe8&fs=MTY3ODExMjk0Nzg1NXx3ZWJWNnwxMDE0NjQ5NzmUsICyfDExNi45Ni40Ny4yNTQ",
  },
];

//set màu của màn hình.
function random_bg_color() {
  
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}


//Load bài hát
function loadTrack(idx_select) {
  track_index = idx_select;

  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[idx_select].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[idx_select].image + ")";
  track_name.textContent = track_list[idx_select].name;
  track_artist.textContent = track_list[idx_select].artist;
  now_playing.textContent = "PLAYING " + (idx_select + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
  this.render();
  this.playTrack();
}

//Thời gian của bài hát
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}


function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }


  
}

 function render () {

  let htmls = ""
  for(let index =0; index<track_list.length;index++){
    let song = track_list[index];
    htmls +=   `
    <div onclick = "loadTrack(${index})"  class="song ${
      index == track_index ? "active" : ""
    }" data-index="${index}" >
        <div class="thumb"
            style="background-image: url('${song.image}')">
        </div>
        <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.artist}</p>
        </div>
        <!-- 
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
        --!>
        
      
    </div>
`;
  }


  playlist.innerHTML = htmls;
}




