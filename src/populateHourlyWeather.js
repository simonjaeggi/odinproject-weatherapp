const icons = require.context("./icons", false, /\.(jpg|jpeg|png|gif|svg)$/);
const content = document.querySelector(".content");

const populateHourlyWeather = (data) => {
    const hourlyContainer = document.createElement("div");
    hourlyContainer.classList.add("card");

    const weatherHoursContainer = document.createElement("div");
    weatherHoursContainer.classList.add("weather_hours");

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = "Hours";

    hourlyContainer.appendChild(title);
    hourlyContainer.appendChild(weatherHoursContainer);
    content.appendChild(hourlyContainer);

    const currentHour = new Date().getHours();
    const today = data.days[0];
    const tomorrow = data.days[1];
    const next48Hours = [
        ...Object.values(today.hours),
        ...Object.values(tomorrow.hours),
      ];
    const next12Hours = next48Hours.splice(currentHour, 12);

    next12Hours.forEach((hour) => {
        const hourContainer = document.createElement("div");
        hourContainer.classList.add("hour_container");

        const icon = document.createElement("img");
        const temp = document.createElement("span");
        const time = document.createElement("span");

        temp.textContent = `${hour.temp} °C`;
        icon.src = icons(`./${hour.icon}.svg`);
        time.textContent = `${hour.datetime.split(":").splice(0, 2).join(":")}`;

        hourContainer.append(temp, icon, time);
        weatherHoursContainer.appendChild(hourContainer);
    });
};
module.exports = { populateHourlyWeather };
