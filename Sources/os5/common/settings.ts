import * as simpleSettings from "simple-fitbit-settings/common";
// Settings 
export class Settings {
    public clockFormat: simpleSettings.Selection = { selected: [0], values: [{ name: "user", value: "user" }] };
    public colorBackground = "navy";
    public colorForeground = "white";
}