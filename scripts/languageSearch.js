const languageButton = document.querySelector('.languageButton');
const arrowButton = document.querySelector('.arrowButton');
const languageMenu = document.querySelector('.languageMenu');
const languageMenuItem = document.querySelectorAll('.langItem');

const searchButton = document.querySelector('.searchButton');

const translations = {
    "en": 
    { 
        "searchInput": "Search city or ZIP",
        "searchButton": "search",
        "apparentTemperature": "feels like:",
        "windSpeed": "wind speed::",
        "airHumidity": "Humidity:"
    },

"ru":
    {
        "searchInput": "Найти город или индекс",
        "searchButton": "поиск",
        "apparentTemperature": "ощущается как:",
        "windSpeed": "скорость ветра:",
        "airHumidity": "влажность:"
    }
    
}

if (localStorage.getItem('lang') === null){
    localStorage.setItem('lang', 'en');
    var language = 'en';
} else {
    var language = localStorage.getItem('lang');
}


if(language === 'en') {
    languageMenuItem.forEach(el => el.classList.add('inactive'));
    languageMenuItem[0].classList.remove('inactive');
    document.querySelector('#curLanguage').innerHTML = 'en';
} else if(language === 'ru') {
    languageMenuItem.forEach(el => el.classList.add('inactive'));
    languageMenuItem[1].classList.remove('inactive');
    document.querySelector('#curLanguage').innerHTML = 'ru'; 
} 

function getTranslation(language) {
//    searchInput.placeholder = translations[language].searchInput;
//    searchButton.innerHTML = translations[language].searchButton;
//    apparentTemperature.innerHTML = translations[language].apparentTemperature;
//    windSpeed.innerHTML = translations[language].windSpeed;
//    airHumidity.innerHTML = translations[language].airHumidity;
}

languageButton.addEventListener('click', () => {
    languageMenu.classList.toggle('openMenu');
});

languageMenu.addEventListener('click', (event) => {
    let loc = JSON.parse(localStorage.getItem("currLocation"));
    let units = localStorage.getItem('units');
    languageMenuItem.forEach(el => el.classList.add('inactive'));
    event.target.classList.remove('inactive');
    localStorage.setItem('lang', event.target.innerHTML);
    document.querySelector('#curLanguage').innerHTML = event.target.innerHTML;
    searchInput.placeholder = translations[event.target.textContent].searchInput;
    searchButton.innerHTML = translations[event.target.textContent].searchButton;
    apparentTemperature.innerHTML = translations[event.target.textContent].apparentTemperature;
    windSpeed.innerHTML = translations[event.target.textContent].windSpeed;
    airHumidity.innerHTML = translations[event.target.textContent].airHumidity;
    
      getDate(); 
      getMap();
      getWeatherData(units, loc);
});

async function getUserLocation() {
    const url = 'https://ipinfo.io/json?token=ee7a5ff4c8f4d7';
    const res = await fetch(url);
    const data = await res.json();
    let coordinates = data.loc.split(',');
    return coordinates;
};


searchButton.addEventListener('click', () => {
    getCityDiscr();
    getMap();
});


getTranslation(language);