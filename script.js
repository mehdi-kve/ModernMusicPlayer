import data from './data.json' with {type : 'json'};
document.addEventListener("DOMContentLoaded", ready);

const trackList = document.getElementById('t-list');
const playButton = document.getElementById('playButt');
const play = document.getElementById('play');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const darkmodeBut = document.getElementById('dmode');
const darkmodeIcon = document.getElementById('dmodeicon');
const trackname = document.getElementById('trname');
const artistname = document.getElementById('arname');
const trackimage = document.getElementById('trackimg');
const heart = document.getElementById('heart');
const progressBar = document.getElementById('bar');

let currentSong = database[0].src;
let isPlaying;
let isOnDarkmode;
let currentSongId = 0;
let heartOn;
let increacper;
var audio = new Audio(currentSong);

playButton.addEventListener("click", playButt);
darkmodeBut.addEventListener("click", darkmode);
forward.addEventListener("click", nextTrack);
backward.addEventListener("click", preTrack);
heart.addEventListener('click', redHeart);
audio.addEventListener('timeupdate', progress);
audio.addEventListener('ended', nextTrack);


function ready() {
    for (let i = 0;  i < database.length; i++) {
        const tracks = document.createElement("div");
        const cover = document.createElement("div");
        const img = document.createElement("img");
        const detail = document.createElement("div");
        const arist = document.createElement("p");
        const track = document.createElement("p");
        const duration = document.createElement("div");
        const durpara = document.createElement("p");

        tracks.className = "tracks";

        cover.className = "play-but";
        img.src = database[i].cover;
        cover.appendChild(img);
        tracks.appendChild(cover);

        detail.className = "detail";
        track.className = "tname";
        track.innerHTML = database[i].track;
        arist.className = "arname";
        arist.innerHTML = database[i].artist;
        detail.appendChild(track);
        detail.appendChild(arist);
        tracks.appendChild(detail);

        duration.className = "duration";
        durpara.innerHTML = database[i].duration;
        duration.appendChild(durpara);
        tracks.appendChild(duration);

        trackList.appendChild(tracks);


        tracks.addEventListener("click", function() {
            player(database[i]);
            currentSongId = i;
            render();
        });
    }
}

function player(data)
{
    audio.src = data.src;
    audio.play();
    increacper = 0;
    isPlaying = true;
    play.className = "fa-solid fa-pause";
}

function playButt(){
    if (isPlaying == true) {
        isPlaying = false;
        play.className = "fa-solid fa-play";
        audio.pause();
    }else
    {    
        audio.play();
        isPlaying = true;
        play.className = "fa-solid fa-pause";
    }
}


function nextTrack()
{
    audio.pause();
    increacper = 0;
    isPlaying = false;
    audio.src = database[currentSongId + 1].src;
    currentSongId += 1;
    render();
    playButt();
}

function preTrack()
{
    audio.pause();
    increacper = 0;
    isPlaying = false;
    audio.src = database[currentSongId - 1].src;
    currentSongId -= 1;
    render();
    playButt();
}

function render()
{
    trackname.innerHTML = database[currentSongId].track;
    artistname.innerHTML = database[currentSongId].artist;
    trackimage.src = database[currentSongId].cover;
}


function progress()
{
    increacper = 100 * (audio.currentTime/audio.duration) + "%";
    progressBar.style.width = increacper;
}


function redHeart()
{
    if (!heartOn){
        heart.className = "fa-solid fa-heart";
        heartOn = true;}
    else{
        heart.className = "fa-regular fa-heart";
        heartOn = false;
    }
}


function darkmode(){
    if(!isOnDarkmode){
        darkmodeIcon.className = "fa-regular fa-sun";
        document.documentElement.style.setProperty('--background-def', 'var(--background-dark)');
        document.documentElement.style.setProperty('--sidebar-def', 'var(--sidebar-dark)');
        document.documentElement.style.setProperty('--trackbck-def', 'var(--trackbck-dark)');
        document.documentElement.style.setProperty('--cardcontainer-def', 'var(--cardcontainer-dark)');
        isOnDarkmode = true;
    }else
    {
        isOnDarkmode = false;
        darkmodeIcon.className = "fa fa-moon-o";
        document.documentElement.style.setProperty('--background-def', 'var(--background-light)');
        document.documentElement.style.setProperty('--sidebar-def', 'var(--sidebar-light)');
        document.documentElement.style.setProperty('--trackbck-def', 'var(--trackbck-light)');
        document.documentElement.style.setProperty('--cardcontainer-def', 'var(--cardcontainer-light)');
    }

}
