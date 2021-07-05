import axios from 'axios'

export const weatherService= {
getWeather,
// getMyCoords,
getMyAddress
}

function getWeather(lat,lon){
    const APIkey='166d67fa390002ed4d1dfdbf41ec0428'
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,current,minutely,alerts&appid=${APIkey}`)
    .then(res=>{return res.data.daily})
}

// function getMyCoords(){
    //     const geoLocationAPIkey='AIzaSyAvRJbq8tUEMld3JKNdxG2KqBQYKfNFDvc'
    //     return httpService.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${geoLocationAPIkey}`)
    // }
    

    //require billing...
    function getMyAddress(lat,lng){
        const geoCodingAPIkey='AIzaSyAvRJbq8tUEMld3JKNdxG2KqBQYKfNFDvc'
        return axios.post(`https:maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geoCodingAPIkey}`)
        .then(res=>{
            console.log(res);
            return res.data})
}