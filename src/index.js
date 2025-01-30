import "./styles.css";
import { fetchWeather } from "./weather";
import { populateDailyWeather } from "./populateDailyWeather";
import { populateHourlyWeather } from "./populateHourlyWeather";

const content = document.querySelector(".content");
const searchbarBtn = document.querySelector("#searchbar_button");
const searchbar = document.querySelector("#searchbar");

const populatePage = (location, unitGroup) => {
    fetchWeather(location, unitGroup, "hours")
        .catch((error) => {
            console.error("Error fetching weather data:", error.message);
        })
        .then((data) => {
            if (data) {
                populateHourlyWeather(data);
                populateDailyWeather(data);
                searchbar.value = data.resolvedAddress;
            } else {
                alert(
                    `Location "${location}" not found. Please check the spelling.`
                );
            }
        });
};

const purgePage = () => {
    content.replaceChildren();
};


const search = () => {
    const trimmedLocation = searchbar.value.trim()
    if(trimmedLocation){
        purgePage();
        populatePage(trimmedLocation, "metric"); 
    }else{
        alert("Please enter a location name.");
    }
};

searchbarBtn.addEventListener("click", search);
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchbarBtn.click();
  }
});
