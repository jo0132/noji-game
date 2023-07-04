function tetris() {

    // 시작 화면

    const tetrisStart = document.querySelector(".tetris__start")
    const tetrisPlay = document.querySelector(".tetris__play");
    const tetrisEnd = document.querySelector(".tetris__end")
    const startBtn = document.querySelector(".start_btn");
    const retryBtn = document.querySelector(".retry_btn");
    const tetrisHeaderRight = document.querySelector(".tetris__header .right");

    tetrisHeaderRight.addEventListener("click",()=>{
        document.querySelector(".tetris__wrap").style.display = "none";
    })

    startBtn.addEventListener("click",()=>{
        tetrisStart.style.display = "none";
        tetrisPlay.style.display = "block"
        init();
        bgmPlayAudio.play();
        bgmOverAudio.pause();
    })


    const tetrisView = document.querySelector(".tetris__play .view ul");
    const line_rows = 20; //가로
    const line_cols = 12; //세로
    const blocks = {
        Tmino: [
            [
                [2, 1],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 2],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 2],
                [0, 1],
                [2, 1],
                [1, 1],
            ],
            [
                [2, 1],
                [1, 2],
                [1, 0],
                [1, 1],
            ],
        ],
        Imino: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        ],
        Omino: [
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
        ],
        Zmino: [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
            ],
        ],
        Smino: [
            [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
            [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
        ],
        Jmino: [
            [
                [0, 2],
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [2, 1],
            ],
        ],
        Lmino: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [0, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 0],
                [2, 1],
            ],
        ],
    };
    let score = 0;
    let duration = 500;
    let downInterval;
    let tempMovingItem;
    const movingItem = {
        //블록의 정보 변수
        type: "",
        direction: 0,
        top: 0,
        left: 4,
    };
    

    const bgmPlayAudio = document.querySelector(".bgmPlay_music");
    const bgmOverAudio = document.querySelector(".bgmover_music");
    

    // 시작하기
    function init() {
        clearInterval(downInterval); // 기존의 setInterval 제거
        tetrisView.innerHTML = ""; // 기존의 게임 화면 비우기
        score = 0; // 점수 초기화
        document.querySelector(".tetris__score").innerHTML = "score : "+score+"점";
        duration = 500; // 블록 이동 간격 초기화
        tempMovingItem = { ...movingItem }; // 현재 블록 초기화
    
        newLine(); // 라인 만들기
        generateNewBlock(); // 새로운 블록 생성
        renderBlocks(); // 블록 렌더링

        bgmPlayAudio.pause();
        bgmOverAudio.pause();

    }
    
    // 라인 만들기
    function newLine() {
        for (let i = 0; i < line_rows; i++) {
            const li = document.createElement("li");
            const ul = document.createElement("ul");
            for (let j = 0; j < line_cols; j++) {
                const subLi = document.createElement("li");
                ul.prepend(subLi);
            }
            li.prepend(ul);
            tetrisView.prepend(li);
        }
    }
    // 블록 만들기
    function renderBlocks(moveType = "") {
        // console.log(movingItem.type);
        // console.log(movingItem.direction);
        // console.log(movingItem.top);
        // console.log(movingItem.left);
        // const type = movingItem.type;
        // const direction = movingItem.direction;
        // const top = movingItem.top;
        // const left = movingItem.left;
        const { type, direction, top, left } = tempMovingItem;
        // console.log(type, direction, top, left);
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove(type, "moving");
        });
        blocks[type][direction].some((block) => {
            const x = block[0] + left;
            const y = block[1] + top;
            // console.log({ tetrisView });
            const target = tetrisView.childNodes[y]
                ? tetrisView.childNodes[y].childNodes[0].childNodes[x]
                : null;
            const isAvailable = checkEmpty(target);
            if (isAvailable) {
                target.classList.add(type, "moving");
            } else {
                tempMovingItem = { ...movingItem };
                setTimeout(() => {
                    renderBlocks();
                    if (moveType === "top") {
                        seizeBlock();
                    }else {
                        checkGameOver();
                    }
                    
                });
                return true;
            }
        });
        movingItem.left = left;
        movingItem.top = top;
        movingItem.direction = direction;
    }
    function checkGameOver() {
        const { type, direction, top, left } = tempMovingItem;
        const currentBlocks = blocks[type][direction];
        for (let i = 0; i < currentBlocks.length; i++) {
          const x = currentBlocks[i][0] + left;
          const y = currentBlocks[i][1] + top;
          if (y < 0 || tetrisView.childNodes[y].childNodes[0].childNodes[x].classList.contains("seized")) {
            clearInterval(downInterval);
            // alert("Game Over");
            gameOver();

          }
        }
      }

    
    function gameOver(){
        tetrisPlay.style.display = "none";
        tetrisEnd.style.display = "block"
        bgmPlayAudio.pause();
        bgmPlayAudio.currentTime = 0;
        bgmOverAudio.play();
        retryBtn.addEventListener("click",()=>{
            tetrisEnd.style.display = "none";
            tetrisStart.style.display = "block";
            init();
        })
    }
    
    function seizeBlock() {
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove("moving");
            moving.classList.add("seized");
        });
        checkMatch();
    }
    function checkMatch() {
        const childNodes = tetrisView.childNodes;
        const fullLines = [];
        childNodes.forEach((child, index) => {
            let isFull = true;
            child.children[0].childNodes.forEach((li) => {
                if (!li.classList.contains("seized")) {
                    isFull = false;
                }
            });
            if (isFull) {
                fullLines.unshift(index);
                child.children[0].childNodes.forEach((li) => {
                    li.classList.remove("seized");
                });
            }
        });
    
        
        if (fullLines.length > 0) {
            fullLines.forEach((lineIndex) => {
                const line = childNodes[lineIndex];
                tetrisView.removeChild(line);
                score++

            });
    
            for (let i = 0; i < fullLines.length; i++) {
                tetrisView.prepend(createEmptyLine());
            }
            document.querySelector(".tetris__score").innerHTML = "score : "+score+"점";

        }
    
        generateNewBlock();
    }
    
    

    function createEmptyLine() {
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        for (let j = 0; j < line_cols; j++) {
            const subLi = document.createElement("li");
            ul.prepend(subLi);
        }
        li.prepend(ul);
        return li;
    }

    function generateNewBlock() {
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock("top", 1);
        }, duration);
        const blockArray = Object.entries(blocks);
        const randomIndex = Math.floor(Math.random() * blockArray.length);
        movingItem.type = blockArray[randomIndex][0];
        movingItem.top = 0;
        movingItem.left = 4;
        movingItem.direction = 0;
        tempMovingItem = { ...movingItem };
        renderBlocks();
        
        // const levelThresholds = [0, 5, 10, 15, 20]; // 레벨별 점수 기준
        // // const levelThresholds = [0, 10, 20, 30, 40]; // 레벨별 점수 기준
        // const levelNum = [1, 2, 3, 4, 5]; // 레벨별 점수 기준
        // const levelMaxDuration = [600, 400, 300, 200, 100]; // 레벨별 최대 블록 이동 간격
        // for (let i = levelThresholds.length - 1; i >= 0; i--) {
        //     if (score >= levelThresholds[i]) {
        //         duration = levelMaxDuration[i];
        //         levelNumResult = levelNum[i];
        //         break;
        //     }
        // }
        // const tetrisLevel = document.querySelector(".tetris__level");

        // // tetrisLevel.innerHTML = "Lv. "+levelNumResult;
        // tetrisLevel.innerHTML = "ddd";


    }
    function checkEmpty(target) {
        if (!target || target.classList.contains("seized")) {
            return false;
        }
        return true;
    }
    // 블록 움직이기
    function moveBlock(moveType, amount) {
        tempMovingItem[moveType] += amount;
        renderBlocks(moveType);
    }
    // 모양 변경하기
    function changeDirection() {
        const direction = tempMovingItem.direction;
        direction === 3
            ? (tempMovingItem.direction = 0)
            : (tempMovingItem.direction += 1);
        renderBlocks();
    }
    // 스페이스바 누르기
    function dropBlock() {
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock("top", 1);
        }, 10);
    }
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 39:
                moveBlock("left", 1);
                break;
            case 37:
                moveBlock("left", -1);
                break;
            case 40:
                moveBlock("top", 1);
                break;
            case 32:
                dropBlock();
                break;
            case 38:
                changeDirection();
                break;
            default:
                break;
        }
    });
}
export default tetris;


