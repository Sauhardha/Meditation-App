const app = () => {
    const audioContainer = document.getElementById('audio-container');

    const audio = document.querySelector('audio');

    const playBtn = document.getElementById('play');



    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll('.time-select button');

    let fakeDuration = 600;

    

    // Play Audio
    function playAudio(){
        audioContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
        isPaused = false;
    }



    // Pause Audio
    function pauseAudio(){
        audioContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.add('fa-play');
        playBtn.querySelector('i.fas').classList.remove('fa-pause');

        audio.pause();
        isPaused = true;
    }

    //Event Listener
    playBtn.addEventListener('click', () => {
        const isPlaying = audioContainer.classList.contains('play');

        if(isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    audio.ontimeupdate = () => {
        let currentTime = audio.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            pauseAudio();
            audio.currentTime = 0;
            
        }
    }

   

    //Select
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            audio.currentTime = 0;
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} : ${Math.floor(fakeDuration % 60)}`;

        });
     });
     
   


  

    //Time update
    audio.addEventListener('timeupdate', updateProgress);

    //Audio ends
    audio.addEventListener('ended', pauseAudio);
}

app();