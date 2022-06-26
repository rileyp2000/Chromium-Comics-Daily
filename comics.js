function updateClock() {
    var now = new Date() // current date

    // set the content of the element with the ID time to the formatted string
    document.getElementById("time").innerHTML = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById("date").innerHTML = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // call this function again in 1000ms
}


async function loadComic() {
    var url = 'https://xiqtmwxnhz4j3uede2ytyo3aza0thbux.lambda-url.us-east-2.on.aws/';
    //hit aws lambda to grab a comic and then return the image, since we cant get the image directly due to CORS issues
    //pick between foxtrot and calvin and hobbes comics 
    let imgBase64 = await fetch(url).then(response => response.text())
    document.getElementById("comic").src = "data:image/gif;base64," + imgBase64;
}

async function showWeather(pos) {
    const loc = pos.coords;
    const pointURL = `https://api.weather.gov/points/${loc.latitude},${loc.longitude}`;
    const forecastURL = await fetch(pointURL)
        .then(response => response.json())
        .then(data => data.properties.forecast);
    console.log(forecastURL);

    const currentWeather = await fetch(forecastURL)
        .then(response => response.json())
        .then(data =>
            data.properties.periods.filter(o => {
                return o.number === 1;
            })[0]
        );
    console.log("weather3");

    document.getElementById("weather").innerHTML = `${currentWeather.temperature}°F ${currentWeather.shortForecast}`;
}


loadComic();
//getLocation();
document.addEventListener('DOMContentLoaded', (event) => {
    updateClock();
    setInterval(updateClock, 1000);
    //setInterval(getWeather, 1000);
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 10000
        };
        navigator.geolocation.getCurrentPosition(showWeather, function () { console.log("error"); }, options);
    }
})