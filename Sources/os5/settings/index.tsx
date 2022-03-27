import { gettext } from "i18n";

const colorSet = [
  { color: "black" },
  { color: "darkslategrey" },
  { color: "dimgrey" },
  { color: "grey" },
  { color: "lightgrey" },
  { color: "beige" },
  { color: "white" },
  { color: "maroon" },
  { color: "saddlebrown" },
  { color: "darkgoldenrod" },
  { color: "goldenrod" },
  { color: "rosybrown" },
  { color: "wheat" },
  { color: "navy" },
  { color: "blue" },
  { color: "dodgerblue" },
  { color: "deepskyblue" },
  { color: "aquamarine" },
  { color: "cyan" },
  { color: "olive" },
  { color: "darkgreen" },
  { color: "green" },
  { color: "springgreen" },
  { color: "limegreen" },
  { color: "palegreen" },
  { color: "lime" },
  { color: "greenyellow" },
  { color: "darkslateblue" },
  { color: "slateblue" },
  { color: "purple" },
  { color: "fuchsia" },
  { color: "plum" },
  { color: "orchid" },
  { color: "lavender" },
  { color: "darkkhaki" },
  { color: "khaki" },
  { color: "lemonchiffon" },
  { color: "yellow" },
  { color: "gold" },
  { color: "orangered" },
  { color: "orange" },
  { color: "coral" },
  { color: "lightpink" },
  { color: "palevioletred" },
  { color: "deeppink" },
  { color: "darkred" },
  { color: "crimson" },
  { color: "red" }
];

registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title="Options">
      <Select
        settingsKey="clockFormat"
        label={gettext("clockFormat")}
        options={[
          { name: gettext("clockFormatUser"), value: "user" },
          { name: gettext("clockFormat12h"), value: "12h" },
          { name: gettext("clockFormat24h"), value: "24h" }
        ]} />
    </Section>
    <Section
      title={gettext("colorBackground")}>
      <ColorSelect
        settingsKey="colorBackground"
        colors={colorSet} />
    </Section>
    <Section
      title={gettext("colorForeground")}>
      <ColorSelect
        settingsKey="colorForeground"
        colors={colorSet} />
    </Section>
  </Page>
));
