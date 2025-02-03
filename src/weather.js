async function fetchWeather(location, unitGroup, timemode) {
    validateLocation(location);
    validateUnitGroup(unitGroup);
    validateTimemode(timemode);

    const apiUrl = new URL(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`
    );
    apiUrl.searchParams.append("unitGroup", unitGroup);
    apiUrl.searchParams.append("include", timemode);
    apiUrl.searchParams.append("key", process.env.VISUALCROSSING);
    apiUrl.searchParams.append("contentType", "json");

    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
}

function validateLocation(location) {
    if (typeof location !== typeof "string" || location.trim().length === 0) {
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
