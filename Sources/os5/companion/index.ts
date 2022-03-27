import * as companionSettings from "simple-fitbit-settings/companion";
import { Settings } from "../common/settings";
import * as weather from "simple-fitbit-weather/companion";

// Init settings
companionSettings.initialize(new Settings());

// Init weather
weather.initialize({
    provider: weather.Providers.openweathermap,
    apiKey: "<set your api key here>",
    maximumAge: 5,
    refreshInterval: 60
});
