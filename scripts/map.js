const mapLatitude = document.querySelector('#latitude');
const mapLongitude = document.querySelector('#longitude');
const searchInput = document.querySelector('.searchInput');
//
searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        getCityDiscr();
        getMap();
    }
});
//
async function getCityDiscr() {
    let units = localStorage.getItem('units') === localStorage.getItem('units');
    let cityName = getValueInput();
    console.log(cityName);
    let loc = await getPlaceCoord(cityName);
   // let data = loc.json();
    if (loc === 'no result') {
        searchInput.placeholder = 'Incorrect data';
        searchInput.classList.add('search-field-error');
        searchInput.value = '';
    } else {
        if (searchInput.classList.contains('search-field-error')) {
            searchInput.placeholder = 'Search city or ZIP';
            searchInput.classList.remove('search-field-error');
            searchInput.value = '';
        }

        localStorage.setItem("currLocation", JSON.stringify(loc));
        localStorage.setItem("lat", data.lat);
        getWeatherData(units, loc);
    }
}
//
function getValueInput() {
    let cityName = searchInput.value;
    return cityName;
};
//
async function getPlaceCoord(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=86c7a4a3b62f4f7ca39ce900ec8e201e&pretty=1&no_annotations=1`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    localStorage.setItem("lat", data.results[0].geometry.lat);
    localStorage.setItem("lng", data.results[0].geometry.lng);
    if (data.results.length === 0) {
        return 'no result'
    } else {
        return data.results[0].geometry;
    }
}
//
function convertDDToDMS(dd) {
    var deg = dd | 0;
    var frac = Math.abs(dd - deg);
    var min = (frac * 60) | 0;
    var sec = frac * 3600 - min * 60;
    return deg + "° " + min + "' " + Math.round(sec) + "\"";
};


async function getMap() {
    let cityName = getValueInput();
    let language = localStorage.getItem('lang');
    var lat;
    var lon;
    console.log(cityName);
    if (cityName === '') {
        var coordinates = await getUserLocation();
        var loc = coordinates.join(',');
        var latitude = convertDDToDMS(coordinates[0]);
        lat = coordinates[0];
        var longitude = convertDDToDMS(coordinates[1]);
        lon = coordinates[1];
        var latitudeMap = coordinates[0];
        var longitudeMap = coordinates[1];
    } else {
//        var coordinates = await getPlaceCoord(cityName);
        if (coordinates !== 'no result') {
//            var loc = `${coordinates.lat},${coordinates.lng}`;
//            var latitude = convertDDToDMS(coordinates.lat);
//            lat = coordinates.lat;
//            var longitude = convertDDToDMS(coordinates.lng);
//            lon =  coordinates.lng;
        var latitudeMap = localStorage.getItem('lat');
        var longitudeMap = localStorage.getItem('lng');
        } else {
           return 'no result';
        }
    }
    if (language === 'en') {
        mapLatitude.innerHTML = `Latitude: ${latitude}`;
        mapLongitude.innerHTML = `Longitude: ${longitude}`;
    } else 
    {
        mapLatitude.innerHTML = `Широта: ${latitude}`;
        mapLongitude.innerHTML = `Долгота: ${longitude}`;
    } 
//    console.log(coordinates[0]);
//    console.log(coordinates[1]);
    
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmY2FsZW9uIiwiYSI6ImNrcDVrYmxieDAyamcyb29mbnN1eXd4ZmoifQ.GqTyuw1zzaXNq7Kl8MDX1Q';

console.log(longitudeMap);
console.log(latitudeMap);
let x = longitudeMap;
let y = latitudeMap;
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11',
center: [x, y],
zoom: 10
});

new mapboxgl.Marker().setLngLat([longitudeMap,latitudeMap]).addTo(map);
    
}

//getWeatherAndMap();
getMap();