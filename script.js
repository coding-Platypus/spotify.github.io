

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('master-song');
let songItems = Array.from(document.getElementsByClassName('song-item'));

let songs = [
    {songname: "let-me-love-you", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg", duration: "3:25"},
    {songname: "Barsan-lagi", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "4:54"},
    {songname: "Perfect", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "3:07"},
    {songname: "Tere-naina", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "4:15"},
    {songname: "Thumkeshwari", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "2:43"},
    {songname: "Cold-mess", filePath: "songs/6.mp3", coverPath: "covers/6.jpg",  duration: "4:41"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songname;
    element.getElementsByClassName("time")[0].innerText = songs[i].duration;
})

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    let index = document.getElementById(songIndex);
    if(audioElement.paused || audioElement.currentTime<=0){
        index.classList.remove('fa-circle-play');
        index.classList.add('fa-stop-circle');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        index.classList.remove('fa-stop-circle');
        index.classList.add('fa-circle-play');
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
     }
})


//listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update Seekbar    
    if (audioElement.currentTime>=audioElement.duration) {
        let index = document.getElementById(songIndex);
        let songNextIndex = songIndex+1;
        let index1 = document.getElementById(songNextIndex);
        if(songIndex >= 5){
            songIndex = 0; 
            index1 = document.getElementById(songIndex);
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songname;
            audioElement.currentTime = 0;
            index.classList.remove('fa-stop-circle');
            index.classList.add('fa-circle-play');
            index1.classList.remove('fa-circle-play');
            index1.classList.add('fa-stop-circle');
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            songIndex += 1;
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songname;
            audioElement.currentTime = 0;
            index.classList.remove('fa-stop-circle');
            index.classList.add('fa-circle-play');
            index1.classList.remove('fa-circle-play');
            index1.classList.add('fa-stop-circle');
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
        }
    }
    else{
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 1000);
    myProgressBar.value = progress;
    }


})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/1000;
})

makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitem-play')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-stop-circle');
    })
}

Array.from(document.getElementsByClassName('songitem-play')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-stop-circle');
            masterSongName.innerText = songs[songIndex].songname;
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-stop-circle');
            e.target.classList.add('fa-circle-play');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.pause();
            masterSongName.innerText = songs[songIndex].songname;
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-circle-play');
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    let index = document.getElementById(songIndex);
    let songNextIndex = songIndex+1;
    let index1 = document.getElementById(songNextIndex);
    if(songIndex >= 5){
        songIndex = 0; 
        index1 = document.getElementById(songIndex);
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        index.classList.remove('fa-stop-circle');
        index.classList.add('fa-circle-play');
        index1.classList.remove('fa-circle-play');
        index1.classList.add('fa-stop-circle');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        songIndex += 1;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        index.classList.remove('fa-stop-circle');
        index.classList.add('fa-circle-play');
        index1.classList.remove('fa-circle-play');
        index1.classList.add('fa-stop-circle');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
    }
})

document.getElementById('previous').addEventListener('click', ()=>{
    let index = document.getElementById(songIndex);
    let songNextIndex = songIndex-1;
    let index1 = document.getElementById(songNextIndex);
    if(songIndex <= 0){
        songIndex = 5; 
        index1 = document.getElementById(songIndex);
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        index.classList.remove('fa-stop-circle');
        index.classList.add('fa-circle-play');
        index1.classList.remove('fa-circle-play');
        index1.classList.add('fa-stop-circle');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        songIndex -= 1;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        index.classList.remove('fa-stop-circle');
        index.classList.add('fa-circle-play');
        index1.classList.remove('fa-circle-play');
        index1.classList.add('fa-stop-circle');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
    }
})



