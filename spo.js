
document.addEventListener('DOMContentLoaded', () => {
    let audioElement = new Audio('1.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let songItem = Array.from(document.getElementsByClassName('songItem'));
    let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
    let masterSongName = document.getElementById('masterSongName');
    let prevButton = document.getElementById('previous');
    let nextButton = document.getElementById('next');
    let gif = document.getElementById('gif'); // Main GIF
    let songs = [
        {songName: "Warriyo - Mortals ", filePath: "assets/1.mp3", coverPath: "assets/1.jpg"},
        {songName: "Cielo - Huma-Huma", filePath: "assets/2.mp3", coverPath: "assets/2.jpg"},
        {songName: "DEAF KEV - Invincible ", filePath: "assets/3.mp3", coverPath: "assets/3.jpg"},
        {songName: "Different Heaven & EH!DE - My Heart ", filePath: "assets/4.mp3", coverPath: "assets/4.jpg"},
        {songName: "Janji - Heroes Tonight", filePath: "assets/5.mp3", coverPath: "assets/5.jpg"},
        {songName: "Marhaban ya Ramadhan ", filePath: "assets/6.mp3", coverPath: "assets/6.jpg"},
        {songName: "Limitless", filePath: "assets/7.mp3", coverPath: "assets/7.jpg"},
        {songName: "Regular Fun", filePath: "assets/8.mp3", coverPath: "assets/8.jpg"},
        {songName: "Roller coaster", filePath: "assets/9.mp3", coverPath: "assets/9.jpg"},
        {songName: "Balada gitana", filePath: "assets/10.mp3", coverPath: "assets/10.jpg"}
    ];

    let currentSongIndex = 0;

    function playSong(index) {
        audioElement.src = songs[index].filePath;
        masterSongName.innerText = songs[index].songName;
        audioElement.play();
        gif.style.opacity = "1"; // Show GIF when playing

        // Update play/pause button
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        // Reset all play buttons
        songItemPlay.forEach(btn => {
            btn.classList.add('fa-circle-play');
            btn.classList.remove('fa-circle-pause');
        });

        // Set play/pause for current song
        songItemPlay[index].classList.remove('fa-circle-play');
        songItemPlay[index].classList.add('fa-circle-pause');
    }

    function pauseSong() {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        songItemPlay[currentSongIndex].classList.add('fa-circle-play');
        songItemPlay[currentSongIndex].classList.remove('fa-circle-pause');
        gif.style.opacity = "0"; // Hide GIF when paused
    }

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            playSong(currentSongIndex);
        } else {
            pauseSong();
        }
    });

    songItemPlay.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (currentSongIndex === index && !audioElement.paused) {
                pauseSong();
            } else {
                currentSongIndex = index;
                playSong(index);
            }
        });
    });

    audioElement.addEventListener('timeupdate', () => {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    });

    myProgressBar.addEventListener('input', () => {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    });

    // Next Button
    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    // Previous Button
    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    // Stop GIF when song ends
    audioElement.addEventListener('ended', () => {
        pauseSong();
    });
});
