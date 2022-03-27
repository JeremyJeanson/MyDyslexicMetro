import document from "document";
import * as util from "./simple/utils";
import * as font from "./simple/font";
// Display & AOD
import * as simpleDisplay from "./simple/display";

// Simpl activities
import * as simpleActivities from "simple-fitbit-activities";

// import clock from "clock";
import * as simpleMinutes from "./simple/clock-strings";

// Device form screen detection
import { me as device } from "device";

// Elements for style
const _container = document.getElementById("container") as GraphicsElement;
const _background = document.getElementById("background") as RectElement;

// AOD controls to hide
const _aodHiddenControls = [
    "background",
    "date-container",
    "weather-container",
    "battery-container",
    "stats-container",
    "hrm-container"
];

// Date
const _dates1Container = document.getElementById("date1-container") as GraphicsElement;
const _dates1 = _dates1Container.getElementsByTagName("image") as ImageElement[];
const _dates2Container = document.getElementById("date2-container") as GraphicsElement;
const _dates2 = _dates2Container.getElementsByTagName("image") as ImageElement[];
const _dates3Container = document.getElementById("date3-container") as GraphicsElement;
const _dates3 = _dates3Container.getElementsByTagName("image") as ImageElement[];

// Hours
const _clocks = document.getElementById("clock-container").getElementsByTagName("image") as ImageElement[];
const _cloksHours = _clocks.slice(0, 2);
const _cloksMinutes = _clocks.slice(3, 5);

// AM or PM
const _ampm = document.getElementById("ampm-container").getElementsByTagName("image") as ImageElement[];

// Battery
const _batteryTextContainer = document.getElementById("battery-text") as GraphicsElement;
const _batteries = _batteryTextContainer.getElementsByTagName("image") as ImageElement[];

// Stats
import { ActivitySymbol } from "./simple/activity-symbol";
const _steps = new ActivitySymbol(document.getElementById("steps-symbol") as GraphicsElement, _background, _container);
const _calories = new ActivitySymbol(document.getElementById("calories-symbol") as GraphicsElement, _background, _container);
const _activesMinutes = new ActivitySymbol(document.getElementById("activesminutes-symbol") as GraphicsElement, _background, _container);
const _distance = new ActivitySymbol(document.getElementById("distance-symbol") as GraphicsElement, _background, _container);
const _elevation = new ActivitySymbol(document.getElementById("elevation-symbol") as GraphicsElement, _background, _container);

// Heart rate management
const _iconHRM = document.getElementById("iconHRM") as GraphicsElement;
const _imgHRM = document.getElementById("icon") as ImageElement;
const _hrmTextContainer = document.getElementById("hrm-text-container") as GraphicsElement;
const _hrmTexts = _hrmTextContainer.getElementsByTagName("image") as ImageElement[];

let lastBpm: number;

// Import the settigns module
import * as appSettings from "simple-fitbit-settings/app";
// Import settings class from common folder
import { Settings } from "../common/settings";
// Current settings
const _settings = new Settings();

// Weather
const _weatherTextContainer = document.getElementById("weather-temp") as GraphicsElement;

// --------------------------------------------------------------------------------
// Clock
// --------------------------------------------------------------------------------
// Update the clock every seconds
simpleMinutes.initialize("user", (clock) => {
    const folder: font.folder = simpleDisplay.isInAodMode()
        ? "chars-aod"
        : "chars";

    // Hours
    if (clock.Hours) {
        font.print(clock.Hours, _cloksHours, folder);
    }

    // Minutes
    if (clock.Minutes) {
        font.print(clock.Minutes, _cloksMinutes, folder);
    }

    // AM or PM
    if (clock.AmOrPm) {
        font.print(clock.AmOrPm, _ampm);
    }

    // Date 1
    if (clock.Date1 !== undefined) {
        // Position
        _dates1Container.x = device.screen.width * 66 / 100 - (clock.Date1.length * 12) - 80;
        // Values
        font.print(clock.Date1, _dates1);
    }

    // Date 2
    if (clock.Date2 !== undefined) {
        // Position
        _dates2Container.x = device.screen.width * 66 / 100 - (clock.Date2.length * 30) - 10;
        // Values
        font.print(clock.Date2, _dates2);
    }

    // Date 3
    if (clock.Date3 !== undefined) {
        // Position
        _dates3Container.x = device.screen.width * 66 / 100 - (clock.Date3.length * 12) - 80;
        // Values
        font.print(clock.Date3, _dates3);
    }

    // update od stats
    UpdateActivities();
});

function setHoursMinutes(folder: font.folder) {
    // Hours
    font.print(simpleMinutes.last.Hours + ":" + simpleMinutes.last.Minutes, _clocks, folder);
}

// --------------------------------------------------------------------------------
// Power
// --------------------------------------------------------------------------------
import * as simpleBattery from "./simple/battery";

// Method to update battery level informations
simpleBattery.initialize((battery) => {
    const batteryString = battery.toString() + "%";
    // Battery text
    font.print(batteryString, _batteries);
    // Position
    _batteryTextContainer.x = (device.screen.width * 33 / 100 - (batteryString.length * 15) - 30);
});
// --------------------------------------------------------------------------------
// Activity
// --------------------------------------------------------------------------------

// Init
simpleActivities.initialize(UpdateActivities);

// Update Activities informations
function UpdateActivities() {
    // Get activities
    const activities = simpleActivities.getNewValues();

    // activities.steps= new simpleActivities.Activity(6500,10000);
    // activities.calories=new simpleActivities.Activity(1400,2900);
    // //activities.activeZoneMinutes =new simpleActivities.Activity(50,100);
    // activities.distance=new simpleActivities.Activity(6,10);
    // activities.elevationGain=new simpleActivities.Activity(8,10);

    // Steps
    if (activities.steps !== undefined) {
        _steps.set(activities.steps);
    }

    // Calories
    if (activities.calories !== undefined) {
        _calories.set(activities.calories);
    }

    // Active minutes
    if (activities.activeZoneMinutes !== undefined) {
        _activesMinutes.set(activities.activeZoneMinutes);
    }

    // Disance
    if (activities.distance !== undefined) {
        _distance.set(activities.distance);
    }

    // Elevation
    if (activities.elevationGain !== undefined) {
        _elevation.set(activities.elevationGain);
    }
}

function refreshActivitiesColors() {
    _steps.refresh();
    _calories.refresh();
    _activesMinutes.refresh();
    _distance.refresh();
    _elevation.refresh();
}

// --------------------------------------------------------------------------------
// Heart rate manager
// --------------------------------------------------------------------------------
import * as simpleHRM from "./simple/hrm";

simpleHRM.initialize((newValue, bpm, zone, restingHeartRate) => {
    // Zones
    _imgHRM.href = zone === "out-of-range"
        ? "images/stat_hr_open_48px.png"
        : "images/stat_hr_solid_48px.png";

    // Animation
    if (newValue) {
        util.highlight(_iconHRM);
    }

    // BPM value display
    if (bpm !== lastBpm && bpm > 0) {
        const bpmString = bpm.toString();
        font.print(bpmString, _hrmTexts);
        _hrmTextContainer.x = (device.screen.width * 33 / 100 - (bpmString.length * 15) - 20);
    }
});
// --------------------------------------------------------------------------------
// Weather
// --------------------------------------------------------------------------------
import * as simpleWeather from "simple-fitbit-weather/app";
import { units } from "user-settings";

simpleWeather.initialize((weather) => {
    if (weather === undefined) return;

    // update image
    const image = document.getElementById("weather-image") as ImageElement;
    image.href = `weather/${weather.conditionCode}.png`;

    // update text
    const texts = _weatherTextContainer.getElementsByTagName("image") as ImageElement[];
    const temp = (units.temperature === "C"
        ? Math.round(weather.temperatureC)
        : Math.round(weather.temperatureF))
        + "°" + units.temperature;
    // Display
    font.print(temp, texts);
    // Center text
    _weatherTextContainer.x = (device.screen.width * 33 / 100 - (temp.length * 15) - 30);

    // Log
    //console.log(JSON.stringify(weather));  
});

// --------------------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------------------
appSettings.initialize(
    _settings,
    (newSettings: Settings) => {
        if (!newSettings) {
            return;
        }
        try {
            if (newSettings.colorBackground !== undefined) {
                const value: string = newSettings.colorBackground;
                util.fill(_imgHRM, value === "red" || value === "crimson" || value === "darkred" || value === "deeppink" || value === "orangered"
                    ? _container.style.fill
                    : "red");
                util.fill(_background, value);
                refreshActivitiesColors();
            }

            if (newSettings.colorForeground !== undefined) {
                util.fill(_container, newSettings.colorForeground);
            }

            // Display based on 12H or 24H format
            if (newSettings.clockFormat !== undefined) {
                simpleMinutes.updateHoursFormat(newSettings.clockFormat.values[0].value as simpleMinutes.HoursFormat);
            }
        }
        catch (error) {
            console.error(error);
        }
    });

// --------------------------------------------------------------------------------
// Allway On Display
// --------------------------------------------------------------------------------
simpleDisplay.initialize(onEnteredAOD, onLeavedAOD, onDisplayGoOn);

function onEnteredAOD() {
    // Stop sensors
    simpleHRM.stop();

    // Clock
    setHoursMinutes("chars-aod");

    // Hide elements
    util.hideManyById(_aodHiddenControls);
}

function onLeavedAOD() {
    // Show elements & start sensors
    _background.style.display = "inline";
    // Clock
    setHoursMinutes("chars");

    // Show
    util.showManyById(_aodHiddenControls);

    // Start sensors
    simpleHRM.start();
}

function onDisplayGoOn() {
    _steps.onDiplayGoOn();
    _calories.onDiplayGoOn();
    _activesMinutes.onDiplayGoOn();
    _distance.onDiplayGoOn();
    _elevation.onDiplayGoOn();
}

// _container.style.fill = "gold";
// console.log("gold : " + _container.style.fill);