async function getLocationWeather(location){
    const unitGroup = 'metric'//US

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${process.env.VISUALCROSSING}&contentType=json`);
    const weatherData = await response.json();
    console.log(weatherData);
}
module.exports = {getLocationWeather};