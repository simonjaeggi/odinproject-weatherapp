async function fetchWeather(location, unitGroup, timemode) {
    validateLocation(location);
    validateUnitGroup(unitGroup);
    validateTimemode(timemode);

    const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=${timemode}&key=${process.env.VISUALCROSSING}&contentType=json`;
    console.log(query);
    return fetch(query).then((response) => {
        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }
        return response.json();
    });
}

function validateLocation(location) {
    if (typeof location !== "string" || location.trim().length === 0) {
        throw new Error("Invalid location. Must be a non-empty string.");
    }
}

function validateUnitGroup(unitGroup) {
    const validUnits = new Set(["metric", "us"]);
    if (!validUnits.has(unitGroup)) {
        throw new Error("Invalid unit group. Use 'metric' or 'us'.");
    }
}

function validateTimemode(timemode) {
    const validUnits = new Set(["days", "hours"]);
    if (!validUnits.has(timemode)) {
        throw new Error("Invalid timemode. Use 'days' or 'hours'.");
    }
}

module.exports = { fetchWeather };
