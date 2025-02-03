const icons = require.context("./icons", false, /\.(jpg|jpeg|png|gif|svg)$/);
const content = document.querySelector(".content");

const populateDailyWeather = (data) => {
    const daysAfterToday = data.days.splice(1);

    daysAfterToday.forEach((day) => {
        const dailyContainer = document.createElement("div");
        dailyContainer.classList.add("card", "day_container");

        const date = document.createElement("span");
        const icon = document.createElement("img");

        date.textContent = new Date(day.datetime).toLocaleDateString("de-CH");
        date.classList.add("title");
        icon.src = icons(`./${day.icon}.svg`);

        const description = document.createElement("span");
        description.classList.add("weather_description");
        description.textContent = day.description;

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info_container");

        const tempLabel = document.createElement("span");
        const feltTempLabel = document.createElement("span");
        const precipLabel = document.createElement("span");
        const sunLabel = document.createElement("span");

        [tempLabel, feltTempLabel, precipLabel, sunLabel].forEach((label) =>
            label.classList.add("subtitle")
        );

        const temp = document.createElement("span");
        const feltTemp = document.createElement("span");
        const precipProb = document.createElement("span");
        const sun = document.createElement("span");

        tempLabel.textContent = "Temperature";
        feltTempLabel.textContent = "Felt temperature";
        precipLabel.textContent = "Precipitation";
        sunLabel.textContent = "Sun timing";

        temp.textContent = `Min: ${day.tempmin} °C, Avg: ${day.temp} °C, Max: ${day.tempmax} °C`;
        feltTemp.textContent = `Min: ${day.tempmin} °C, Avg: ${day.temp} °C, Max: ${day.tempmax} °C`;
        precipProb.textContent = `Probability: ${day.precipprob}%`;
        sun.textContent = `Sunrise ${day.sunrise.split(":").splice(0, 2).join(":")}, Sunset ${day.sunset.split(":").splice(0, 2).join(":")}`;

        [
            tempLabel,
            temp,
            feltTempLabel,
            feltTemp,
            precipLabel,
            precipProb,
            sunLabel,
            sun,
        ].forEach((element) => infoContainer.appendChild(element));

        dailyContainer.append(date, icon, infoContainer, description);
        content.appendChild(dailyContainer);
    });
};

module.exports = { populateDailyWeather };
