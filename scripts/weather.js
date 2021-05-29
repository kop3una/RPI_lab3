const weatherLocation = document.querySelector('.weatherLocation');
const weatherIcon = document.querySelector('.weatherIcon');
const weatherIcons = {
    800: {
        c01d: "img/clear-day.svg",
        c01n: "img/clear-night.svg"
    },
    804: {
        c04d: "img/cloudy.svg",
        c04n: "img/cloudy.svg"
    },
    301: {
        d02d: "img/drizzle.svg",
        d02n: "img/drizzle.svg"
    },
    233: {
        t05d: "img/hail.svg",
        t05n: "img/hail.svg"
    },
    700: {
        a01d: "img/mist.svg",
        a01n: "img/mist.svg"
    },
    801: {
        c02d: "img/partly-cloudy-day.svg",
        c02n: "img/partly-cloudy-night.svg"
    },
    802: {
        c02d: "img/partly-cloudy-day.svg",
        c02n: "img/partly-cloudy-night.svg"
    },
    521: {
        r05d: "img/partly-cloudy-day-drizzle.svg",
        r05n: "img/partly-cloudy-night-drizzle.svg"
    },
    511: {
        f01d: "img/partly-cloudy-day-hail.svg",
        f01n: "img/partly-cloudy-night-hail.svg"
    },
    520: {
        r04d: "img/partly-cloudy-day-rain.svg",
        r04n: 'img/partly-cloudy-night-rain.svg'
    },
    600: {
        s01d: 'img/partly-cloudy-day-snow.svg',
        s01n: 'img/partly-cloudy-night-snow.svg'
    },
    522: {
        r06d: 'img/rain.svg',
        r06n: 'img/rain.svg'
    },
    502: {
        r03d: 'img/rain.svg',
        r03n: 'img/rain.svg'
    },
    500: {
        r01d: 'img/rain.svg',
        r01n: 'img/rain.svg'
    },
    501: {
        r02d: 'img/rain.svg',
        r02n: 'img/rain.svg'
    },
    601: {
        s02d: 'img/snow.svg',
        s02n: 'img/snow.svg'
    },
    602: {
        s03d: 'img/snow.svg',
        s03n: 'img/snow.svg'
    },
    611: {
        s05d: 'img/snow.svg',
        s05n: 'img/snow.svg'
    },
    621: {
        s01d: 'img/snow.svg',
        s01n: 'img/snow.svg'
    },
    622: {
        s02d: 'img/snow.svg',
        s02n: 'img/snow.svg'
    },
    200: {
        to1d: "img/thunderstorms.svg",
        to1n: "img/thunderstorms.svg"
    },
    201: {
        t02d: "img/thunderstorms.svg",
        t02n: "img/thunderstorms.svg"
    },
    202: {
        t03d: "img/thunderstorms.svg",
        t03n: "img/thunderstorms.svg"
    },
    230: {
        t04d: "img/thunderstorms.svg",
        t04n: "img/thunderstorms.svg"
    },
    231: {
        t04d: "img/thunderstorms.svg",
        t04n: "img/thunderstorms.svg"
    },
    232: {
        t04d: "img/thunderstorms.svg",
        t04n: "img/thunderstorms.svg"
    }
}; 
const curTemperature = document.querySelector('#curTemperature');
const tomorrow = document.querySelector('#tomorrow');
const afterTomorrow = document.querySelector('#afterTomorrow');
const inTwoDay = document.querySelector('#inTwoDay');
const degreesValueApparent = document.querySelector('#degreesValueApparent');
const apparentTemperature = document.querySelector('#apparentTemperature');
const windSpeed = document.querySelector('#windSpeed');
const airHumidity = document.querySelector('#airHumidity');
const valueSpeed = document.querySelector('#valueSpeed');
const valueHumidity = document.querySelector('#valueHumidity');

async function getUserLocation() {
    const url = 'https://ipinfo.io/json?token=ad7cb066164dc3';
    const res = await fetch(url);
    const data = await res.json();
    let coordinates = data.loc.split(',');
    return coordinates;
};

async function getCityName(loc, language) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=00556daf4ed049f09b80d49d943e57ca&language=${language}&pretty=1&no_annotations=1&abbrv=1`;
    const res = await fetch(url);
    const data = await res.json();
    let cityName;
    if (data.results[0].components.village !== undefined) {
        cityName = data.results[0].components.village;
    } else if (data.results[0].components.town !== undefined) {
        cityName = data.results[0].components.town;
    } else {
        cityName = data.results[0].components.city;
    }
    return (`${cityName}, ${data.results[0].components.country}`);
}

async function getWeatherData(units, loc) {
    let language = localStorage.getItem('lang');

    if (loc === undefined) {
        var lat = lon = await getUserLocation();
        let loc = {
            lat: lat[0],
            lng: lat[1]
        }
        localStorage.setItem("currLocation", JSON.stringify(loc));
    } else {
        var lat = lon = [loc.lat, loc.lng];
    }

    let city = await getCityName((lat.join(',')), language);
    weatherLocation.innerHTML = `${city}`;
    var unitSpeed;
    if (units === 'C') {
        unitSpeed = language === 'en' ? 'm/s' : 'м/с';
    } else {
        if (language === 'en') {
            unitSpeed = 'mph';
        } 
        else {
            unitSpeed = 'миль в час';
        } 
    }
    
    if (units === 'C'){
        var unitsAPI = 'metric';
    } else {
        var unitsAPI = 'imperial';
    }
    
    console.log(unitsAPI);
    
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat[0]}&lon=${lon[1]}&days=4&units=${unitsAPI}&lang=${language}&key=06b5472b2ac34d19a9c3edfd92edb301`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let dateTime = [data.data[0].datetime,data.data[1].datetime,data.data[2].datetime,data.data[3].datetime];

    localStorage.setItem('dateTime', dateTime);

    curTemperature.innerHTML =  Math.round(data.data[0].temp);
    tomorrow.querySelector('.forecastTemperature').innerHTML = `${Math.round(data.data[1].temp)}°`;
    afterTomorrow.querySelector('.forecastTemperature').innerHTML = `${Math.round(data.data[2].temp)}°`;
    inTwoDay.querySelector('.forecastTemperature').innerHTML = `${Math.round(data.data[3].temp)}°`;
    let codeWeather = data.data[0].weather.code;
    let iconWeather = data.data[0].weather.icon;
    let description = data.data[0].weather.description;
    let appTemperature = (data.data[0].app_min_temp + data.data[0].app_max_temp) / 2;
    degreesValueApparent.innerHTML = `${Math.round(appTemperature)}°`;
    valueSpeed.innerHTML = `${Math.round(data.data[0].wind_spd)} ${unitSpeed}`;
    valueHumidity.innerHTML = `${data.data[0].rh}%`;

    try {
        weatherIcon.src = weatherIcons[codeWeather][iconWeather];
    } catch {
        weatherIcon.src = weatherIcons[804]["c04d"];
    }

    try {
        tomorrow.querySelector('.forecastIcon').src = weatherIcons[data.data[1].weather.code][data.data[1].weather.icon];
    } catch {
        tomorrow.querySelector('.forecastIcon').src = weatherIcons[804]["c04d"];
    }

    try {
        afterTomorrow.querySelector('.forecastIcon').src = weatherIcons[data.data[2].weather.code][data.data[2].weather.icon];
    } catch {
        afterTomorrow.querySelector('.forecastIcon').src = weatherIcons[804]["c04d"];
    }

    try {
        inTwoDay.querySelector('.forecastIcon').src = weatherIcons[data.data[3].weather.code][data.data[3].weather.icon];
    } catch {
        inTwoDay.querySelector('.forecastIcon').src = weatherIcons[804]["c04d"];
    }
};

getWeatherData(localStorage.getItem('units'));