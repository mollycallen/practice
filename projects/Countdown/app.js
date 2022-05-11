const countdown = () => {
    const countDate = new Date("Augest 16, 2021 00:00:00").getTime();
    //console.log(countDate);
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const gapDay = Math.floor(gap / day);
    const gapHour = Math.floor((gap % day) / hour);
    const gapMin = Math.floor((gap % hour) / minute);
    const gapSec = Math.floor((gap % minute) / second);

    document.querySelector(".day").innerText = gapDay;
    document.querySelector(".hour").innerText = gapHour;
    document.querySelector(".minute").innerText = gapMin;
    document.querySelector(".second").innerText = gapSec;

    //console.log(gapDay, gapHour, gapMin, gapSec);

}

setInterval(countdown, 1000);
