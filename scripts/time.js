const date = document.querySelector('.date');
const time = document.querySelector('.time');

function getDate() {
    let language = localStorage.getItem('lang');
    let dateTime = localStorage.getItem('dateTime');
    
    let dateDay = new Date(localStorage.getItem('today')).toLocaleString(language, { weekday: 'short' });
    let day = new Date(localStorage.getItem('today')).toLocaleString(language, { day: 'numeric' });
    let dateMonth = new Date(localStorage.getItem('today')).toLocaleString(language, { month: 'long' });
    
    let dateDayT = new Date(localStorage.getItem('today')).toLocaleString(language, { weekday: 'long' });
    let dateDayTM = new Date(localStorage.getItem('tomorrow')).toLocaleString(language, { weekday: 'long' });
    let dateDayTW = new Date(localStorage.getItem('twoday')).toLocaleString(language, { weekday: 'long' });
   
    date.childNodes[0].data = ' ';
    date.insertAdjacentHTML('afterbegin', `${dateDay} ${day}, ${dateMonth}`);

    tomorrow.querySelector('.forecastDay').innerHTML = dateDayT;
    afterTomorrow.querySelector('.forecastDay').innerHTML = dateDayTM;
    inTwoDay.querySelector('.forecastDay').innerHTML = dateDayTW; 
}


function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    time.innerHTML = (hours + ":" + minutes + ":" + seconds);
    setTimeout(getTime, 1000);
}

function getThreeDay() {
    let date = new Date();
    console.log(date);
    localStorage.setItem('today', date);
    let addDays = 1;
    date.setDate(date.getDate() + addDays);
    localStorage.setItem('tomorrow', date);
    console.log(date);
    date.setDate(date.getDate() + addDays);
    localStorage.setItem('twoDay', date);
    console.log(date);
    setTimeout(getTime, 1000);
}

getDate()
getTime();
getThreeDay();