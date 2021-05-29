const fButton = document.querySelector('.fButton');
const cButton = document.querySelector('.cButton');

//const curTemperature = document.querySelector('#curTemperature');
//const tomorrow = document.querySelector('#tomorrow');
//const afterTomorrow = document.querySelector('#afterTomorrow');
//const inTwoDay = document.querySelector('#inTwoDay');
//
//const weatherIcon = document.querySelector('.weatherIcon');
//const degreesValueApparent = document.querySelector('#degreesValueApparent');
//const apparentTemperature = document.querySelector('#apparentTemperature');
//const windSpeed = document.querySelector('#windSpeed');
//const airHumidity = document.querySelector('#airHumidity');
//const valueSpeed = document.querySelector('#valueSpeed');
//const valueHumidity = document.querySelector('#valueHumidity');
//const weatherLocation = document.querySelector('.weatherLocation');
//
//const searchInput = document.querySelector('.searchInput');
//const searchButton = document.querySelector('.searchButton');

if (localStorage.getItem('units') === null){
    localStorage.setItem('units', 'C');
    var units = 'C';
} else {
    var units = localStorage.getItem('units');
}
//let language = localStorage.getItem('lang') === null ? 'en' : localStorage.getItem('lang');


if (units === 'F') {
    fButton.classList.remove('inactive');
    cButton.classList.add('inactive');
} else {
    cButton.classList.remove('inactive');
    fButton.classList.add('inactive');
}

//function getTranslation(language) {
//    searchInput.placeholder = translations[language].searchInput;
//    searchButton.innerHTML = translations[language].searchButton;
//    apparentTemperature.innerHTML = translations[language].apparentTemperature;
//    windSpeed.innerHTML = translations[language].windSpeed;
//    airHumidity.innerHTML = translations[language].airHumidity;
//}

//if(language === 'en') {
//    languageMenuItem.forEach(el => el.classList.add('inactive'));
//    languageMenuItem[0].classList.remove('inactive');
//    document.querySelector('#curLanguage').innerHTML = 'en';
//} else if(language === 'ru') {
//    languageMenuItem.forEach(el => el.classList.add('inactive'));
//    languageMenuItem[1].classList.remove('inactive');
//    document.querySelector('#curLanguage').innerHTML = 'ru'; 
//} 


//languageButton.addEventListener('click', () => {
//    arrowButton.classList.toggle('arrowOpen');
//    languageMenu.classList.toggle('openMenu');
//});
//
//languageMenu.addEventListener('click', (event) => {
//    let loc = JSON.parse(localStorage.getItem("currLocation"));
//    let units = localStorage.getItem('units') === null ? 'M' : localStorage.getItem('units');
//    languageMenuItem.forEach(el => el.classList.add('inactive'));
//    event.target.classList.remove('inactive');
//    localStorage.setItem('lang', event.target.innerHTML);
//    document.querySelector('#curLanguage').innerHTML = event.target.innerHTML;
//    searchInput.placeholder = translations[event.target.textContent].searchInput;
//    searchButton.innerHTML = translations[event.target.textContent].searchButton;
//    apparentTemperature.innerHTML = translations[event.target.textContent].apparentTemperature;
//    windSpeed.innerHTML = translations[event.target.textContent].windSpeed;
//    airHumidity.innerHTML = translations[event.target.textContent].airHumidity;
//    
//    getDate(); 
//    getMap();
//    getWeatherData(units, loc);
//});

fButton.addEventListener('click', () => {
    if (fButton.classList.contains('inactive')) {
        fButton.classList.remove('inactive');
        cButton.classList.add('inactive');
        localStorage.setItem('units', 'F');
        let loc = JSON.parse(localStorage.getItem("currLocation"));
        getWeatherData('F', loc);
    }
});

cButton.addEventListener('click', () => {
    if (cButton.classList.contains('inactive')) {
        cButton.classList.remove('inactive');
        fButton.classList.add('inactive');
        localStorage.setItem('units', 'C');
       let loc = JSON.parse(localStorage.getItem("currLocation"));
        getWeatherData('C', loc);
    }
});

//async function getUserLocation() {
//    const url = 'https://ipinfo.io/json?token=ee7a5ff4c8f4d7';
//    const res = await fetch(url);
//    const data = await res.json();
//    let coordinates = data.loc.split(',');
//    return coordinates;
//};
//
//async function getPlaceCoord(city) {
//    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=86c7a4a3b62f4f7ca39ce900ec8e201e&pretty=1&no_annotations=1`;
//    const res = await fetch(url);
//    const data = await res.json();
//    if (data.results.length === 0) {
//        return 'no result'
//    } else {
//        return data.results[0].geometry;
//    }
//}
//
//async function getCityName(loc, language) {
//    const url = `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=86c7a4a3b62f4f7ca39ce900ec8e201e&language=${language}&pretty=1&no_annotations=1&abbrv=1`;
//    const res = await fetch(url);
//    const data = await res.json();
//    let cityName;
//    if (data.results[0].components.village !== undefined) {
//        cityName = data.results[0].components.village;
//    } else if (data.results[0].components.town !== undefined) {
//        cityName = data.results[0].components.town;
//    } else {
//        cityName = data.results[0].components.city;
//    }
//    return (`${cityName}, ${data.results[0].components.country}`);
//}
//
//
//async function getCityDiscr() {
//    let units = localStorage.getItem('units') === null ? 'M' : localStorage.getItem('units');
//    let cityName = getValueInput();
//    let loc = await getPlaceCoord(cityName);
//    if (loc === 'no result') {
//        searchInput.placeholder = 'Incorrect data';
//        searchInput.classList.add('search-field-error');
//        searchInput.value = '';
//    } else {
//        if (searchInput.classList.contains('search-field-error')) {
//            searchInput.placeholder = 'Search city or ZIP';
//            searchInput.classList.remove('search-field-error');
//            searchInput.value = '';
//        }
//
//        localStorage.setItem("currLocation", JSON.stringify(loc));
//        getWeatherData(units, loc);
//    }
//}
//
//getTranslation(language);