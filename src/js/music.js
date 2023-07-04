function music(){
    const allMusic = [
        {
            name : "1.aaaa",
            artist : "aaa",
            img : "music_image01",
            audio : "m_1"
        },{
            name : "2.aaaa",
            artist : "aaa",
            img : "music_image02",
            audio : "m_2"
        },{
            name : "3.aaaa",
            artist : "aaa",
            img : "music_image03",
            audio : "m_3"
        },{
            name : "4.aaaa",
            artist : "aaa",
            img : "music_image04",
            audio : "m_4"
        },{
            name : "5.aaaa",
            artist : "aaa",
            img : "music_image05",
            audio : "m_5"
        },{
            name : "6.aaaa",
            artist : "aaa",
            img : "music_image06",
            audio : "m_6"
        },{
            name : "7.aaaa",
            artist : "aaa",
            img : "music_image07",
            audio : "m_7"
        },{
            name : "8.aaaa",
            artist : "aaa",
            img : "music_image08",
            audio : "m_8"
        },{
            name : "9.aaaa",
            artist : "aaa",
            img : "music_image09",
            audio : "m_9"
        },{
            name : "10.aaaa",
            artist : "aaa",
            img : "music_image010",
            audio : "m_10"
        }
    ];
    
    const musicWrap = document.querySelector(".music__wrap");
    const musicName = musicWrap.querySelector(".music__control .title h3");
    const musicArtist = musicWrap.querySelector(".music__control .title p");
    const musicView = musicWrap.querySelector(".music__view .images img");
    const musicAudio = musicWrap.querySelector("#main-audio");
    const musicPlay = musicWrap.querySelector("#control-play");
    const musicPrevBtn = musicWrap.querySelector("#control-prev");
    const musicNextBtn = musicWrap.querySelector("#control-next");
    const musicProgress = musicWrap.querySelector(".progress");
    const musicProgressBar = musicWrap.querySelector(".progress .bar");
    const musicProgresscurrent = musicWrap.querySelector(".progress .timer .current");
    const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
    const musicRepeat = musicWrap.querySelector("#control-repeat");
    const musicListBtn = musicWrap.querySelector("#control-list");
    const musicList = musicWrap.querySelector(".music__list");
    const musicListUl = musicWrap.querySelector(".music__list ul");
    const musicListClose = musicWrap.querySelector(".music__list h3 .close");
    
    let musicIndex = 1;     //현재 음악 인덱스
    
    // 음악 재생
    const loadMusic = (num) => {
        musicName.innerText = allMusic[num-1].name;             //뮤직 이름
        musicArtist.innerText = allMusic[num-1].artist;         //뮤직 아티스트
        musicView.src = `../images/${allMusic[num-1].img}.png`;       //뮤직 이미지
        musicView.alt = allMusic[num-1].name;                   //뮤직 이미지 alt
        musicAudio.src = `audio/${allMusic[num-1].audio}.mp3`;      //뮤직 파일
    }
    // 재생 버튼
    const playMusic = () =>{
        musicWrap.classList.add("paused");
        musicPlay.setAttribute("title","정지");
        musicPlay.setAttribute("class","stop");
        musicAudio.play();
    }
    
    // 일시정지 버튼
    const pauseMusic = () =>{
        musicWrap.classList.remove("paused");
        musicPlay.setAttribute("title","재생");
        musicPlay.setAttribute("class","play");
        musicAudio.pause();
    }
    
    // 이전곡 듣기
    const prevMusic = () => {
        musicIndex == 0 ? musicIndex = allMusic.length : musicIndex--;
    
        loadMusic(musicIndex);
        playMusic();
        playListMusic();
    
    }
    
    // 다음곡 듣기
    const nextMusic = () => {
        musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    
        loadMusic(musicIndex);
        playMusic();
        playListMusic();
    
    }
    
    // 뮤직 진행바
    musicAudio.addEventListener("timeupdate",e => {
        // console.log(e);
        const currentTime = e.target.currentTime;   // 현재 재생되는 시간
        const duration = e.target.duration;         // 오디오의 총길이
        let progressWidth = (currentTime/duration)*100;                       // 전체 기이에서 현재 진행되는 시간을 백분이 단우리ㅗ 나누기
        
        musicProgressBar.style.width = `${progressWidth}%`;
    
        musicAudio.addEventListener("loadeddata",() => {
            let audioration = musicAudio.duration;
            let totalmin =  Math.floor(audioration / 60);
            let totalsec =  Math.floor(audioration % 60);
            if(totalsec < 10) totalsec = `0${totalsec}`;
            musicProgressDuration.innerHTML = `${totalmin}:${totalsec}`;
        });
    
        // 진행 시간
        let currentMin = Math.floor(currentTime / 60);
        let currentsec = Math.floor(currentTime % 60);
        if(currentsec < 10) currentsec = `0${currentsec}`;
        musicProgresscurrent.innerText = `${currentMin}:${currentsec}`;
    });
    
    // 진행 버튼 클릭
    musicProgress.addEventListener("click", (e) => {
        let progressWidth = musicProgress.clientWidth;  // 진행바의 전체길이
        let clickedOffsetX = e.offsetX;                 // 진행바를 기준으로 측정되는 X좌표값
        let songDuration = musicAudio.duration;         // 오디오 전체 길이
    
        // 백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
        musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
        // console.log(songDuration);
    });
    
    // 반복버튼
    musicRepeat.addEventListener("click", ()=>{
        let getAttr = musicRepeat.getAttribute("class");
    
        switch(getAttr){
            case "repeat" :
                musicRepeat.setAttribute("class","repeat_one");
                musicRepeat.setAttribute("title","한곡 재생");
            break;
            case "repeat_one" :
                musicRepeat.setAttribute("class","shuffle");
                musicRepeat.setAttribute("title","랜덤 재생");
            break;
            case "shuffle" :
                musicRepeat.setAttribute("class","repeat");
                musicRepeat.setAttribute("title","전체 반복");
            break;
        }
    })
    
    // 오디오가 끝나면
    musicAudio.addEventListener("ended", () => {
        let getAttr = musicRepeat.getAttribute("class");
    
        switch(getAttr){
            case "repeat" : 
                nextMusic();
            break;
            case "repeat_one" : 
                playMusic();
            break;
            case "shuffle" : 
                let randomIndex = Math.floor(Math.random() * allMusic.length +1); //랜덤 인덱스 생성
                
                // if(randomIndex == musicIndex){
                //     randomIndex = Math.floor(math.random() * allMusic.length +1);
                // }
    
                do {
                    randomIndex = Math.floor(Math.random() * allMusic.length +1);
                } while (randomIndex == musicIndex);
                
                musicIndex = randomIndex;
                loadMusic(musicIndex);
                playMusic();
            break;
        }
        playListMusic();
    })
    
    // 플레이 버튼 클릭
    musicPlay.addEventListener("click",() =>{
        const isMusicPaused = musicWrap.classList.contains("paused"); //음악 재생중
        isMusicPaused ? pauseMusic() : playMusic();
    });
    
    
    
    // 이전곡 버튼 클릭
    musicPrevBtn.addEventListener("click",() =>{
        prevMusic();
    });
    
    // 다음곡 버튼 클릭
    musicNextBtn.addEventListener("click",() =>{
        nextMusic();
    });
    
    // 뮤직 리스트 버튼
    musicListBtn.addEventListener("click", () => {
        musicList.classList.add("show");
    });
    
    musicListClose.addEventListener("click", () => {
        musicList.classList.remove("show");
    });
    
    // 뮤직 리스트 구현하기
    for (let i=0; i<allMusic.length; i++){
        let li =`
            <li data-index="${i+1}">
                <span class="img">
                    <img class="img" src="../images/${allMusic[i].img}.png" alt="${allMusic[i].name}">
                </span>
                <span class="title">
                    <strong>${allMusic[i].name}</strong>
                    <em>${allMusic[i].artist}</em>
                    <audio class="${allMusic[i].audio}" src="audio/${allMusic[i].audio}.mp3"></audio>
                </span>
                <span class="audio-duration" id="${allMusic[i].audio}">3:04</span>
            </li>
        `;
        // musicListUl.innerHTML += li;
        musicListUl.insertAdjacentHTML("beforeend",li);
    
        let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);   // 리스트에서 시간을 표시할 선택자를 가져옴
        let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);           // 리스트에서 오디오 파일 선택
        liAudio.addEventListener("loadeddata", () => {
            let audioDuration = liAudio.duration;
            // console.log(audioDuration)
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10) totalSec = `0${totalSec}`;
            liAudioDuration.innerText = `${totalMin}:${totalSec}`;
            liAudioDuration.setAttribute("data-duration",`${totalMin}:${totalSec}`);
        })
    }
    // 뮤직 리스트를 클릭하면 재생
    function playListMusic() {
        const musicListAll = musicListUl.querySelectorAll("li");    // 뮤직 리스트 목록
        musicListAll.forEach((musicListItem) => {
          let audioTag = musicListItem.querySelector(".audio-duration");
      
          musicListItem.addEventListener("click", function() {
            const getIndex = this.getAttribute("data-index");
            musicIndex = parseInt(getIndex, 10);
            loadMusic(musicIndex);
            playMusic();
            playListMusic();
          });
      
          if (musicListItem.classList.contains("playing")) {
            musicListItem.classList.remove("playing");
            let dataAudioDuration = audioTag.getAttribute("data-duration");
            audioTag.innerText = dataAudioDuration;
          }
      
          if (musicListItem.getAttribute("data-index") == musicIndex) {
            musicListItem.classList.add("playing");
            audioTag.innerText = "재생중";
          }
        });
      }
    playListMusic();
    
    // 뮤직리스트를 클릭하면
    function clicked(el) {
        let getIndex = el.getAttribute("data-index");
        musicIndex = parseInt(getIndex, 10);
        loadMusic(musicIndex);
        playMusic();
        playListMusic();
      }
    
    window.addEventListener("load", () => {
        loadMusic(musicIndex);
    
        // musicAudio.play();
    })
    document.querySelector(".right").addEventListener("click",()=>{
        document.querySelector(".music__wrap").style.display = "none";
    })
}

export default music;