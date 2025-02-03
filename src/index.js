import "./styles.css";
import { fetchWeather } from "./weather";
import { populateDailyWeather } from "./populateDailyWeather";
import { populateHourlyWeather } from "./populateHourlyWeather";

const content = document.querySelector(".content");
const searchbarBtn = document.querySelector("#searchbar_button");
const searchbar = document.querySelector("#searchbar");

const asyncPopulatePage = async (location, unitGroup) => {
    try {
        const weatherData = await fetchWeather(location, unitGroup, "hours");
        // populateHourlyWeather(weatherData);
        // populateDailyWeather(weatherData);
        // searchbar.value = weatherData.resolvedAddress;
    } catch (error) {
        // console.error("Error fetching weather data:", error.message);
        console.log(error);
        if (error.code === 400) {
            renderMessage(`
                Location ${location} not found. Try something else!
            `);
        } else {
            renderMessage(`
                Error occured, try again later!
            `);
        }
    }
};

const purgePage = () => {
    content.replaceChildren();
};

const renderMessage = (message) => {
    let messageContainer = document.querySelector("#messageContainer");
    if (messageContainer) {
        messageContainer.replaceChildren();
    } else {
        messageContainer = document.createElement("div");
        messageContainer.classList.add("card");
        messageContainer.id = "messageContainer";
    }
    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;
    messageContainer.appendChild(messageSpan);

    content.prepend(messageContainer);
};

const search = () => {
    const trimmedLocation = searchbar.value.trim();
    if (trimmedLocation) {
        purgePage();
        asyncPopulatePage(trimmedLocation, "metric");
    } else {
        renderMessage("Please enter a location name.");
    }
};

searchbarBtn.addEventListener("click", search);
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchbarBtn.click();
    }
});
