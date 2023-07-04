function start(){
    function printAgent(){
        // 운영체제 정보 알아내기
        let os = navigator.userAgent.toLowerCase();
        let sw = screen.width;
        let sh = screen.height;
        let info = document.querySelector(".info");
        

        if (os.indexOf("windows") >= 0) {
        info.innerHTML = "현재 윈도우를 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        } else if (os.indexOf("macintosh") >= 0) {
        info.innerHTML = "현재 맥을 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        } else if (os.indexOf("iphone") >= 0) {
        info.innerHTML = "현재 아이폰을 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        } else if (os.indexOf("android") >= 0) {
        info.innerHTML = "현재 안드로이드 폰을 사용하고 있으며, 화면 크기는 " + sw + "x" + sh + " 입니다."
        }
    }

    // $( "#draggable3" ).draggable({ containment: ".icon_box", scroll: false });
    $(".icon1").draggable({
        containment: ".icon_box", scroll: false,
        start: function() {
            $(".cursor img").attr("src", "../images/game_mouse01.png");
            $("#header").css("background-color", "#ff3e3e63");
        },
    });
    $(".icon2").draggable({
        containment: ".icon_box", scroll: false,
        start: function() {
            $(".cursor img").attr("src", "../images/game_mouse02.png")
            $("#header").css("background-color", "#415dff63");
        },
    });
    $(".icon3").draggable({
        containment: ".icon_box", scroll: false,
        start: function() {
            $(".cursor img").attr("src", "../images/game_mouse03.png")
            $("#header").css("background-color", "#41ff4b63");
        },
    });
    $(".icon4").draggable({
        containment: ".icon_box", scroll: false,
        start: function() {
            $(".cursor img").attr("src", "../images/game_mouse04.png")
            $("#header").css("background-color", "#ffeb3b63");
        },
    });
    $(".music__wrap").draggable({
        scroll: false
    });


    function printTime(){
        let now = new Date();
        document.querySelector(".time").innerHTML 
            = now.getFullYear()+"년 " +
            (now.getMonth()+1)+"월 " +
            now.getDate()+"일 " +
            now.getHours()+"시 " +
            now.getMinutes()+"분" +
            now.getSeconds()+"초";
    }
    setInterval(printTime, 1000);




    // 페이지 로딩 후
    window.onload = function(){
        window.addEventListener("mousemove", e =>{
            gsap.to (".cursor", {
                duration: 0,
                left: e.pageX -7,
                top: e.pageY -10
            })
        })

        printTime();    //오른쪽 상단 시간
        printAgent();   //하단 중앙에

    }

    document.querySelector(".icon1").addEventListener("click", ()=>{
        document.querySelector(".music__wrap").style.display = "block";
    });
    document.querySelector(".icon2").addEventListener("click", ()=>{
        document.querySelector(".tetris__wrap").style.display = "block";
    });
    document.querySelector(".icon3").addEventListener("click", ()=>{

    });
    document.querySelector(".icon4").addEventListener("click", ()=>{

    });

}

export default start;