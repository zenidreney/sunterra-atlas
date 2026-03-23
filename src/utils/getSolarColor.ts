export default function getSolarColor(solarRadiation: number) {
  if (solarRadiation > 7) return "#ff0000";
  if (solarRadiation > 5) return "#ff8800";
  if (solarRadiation > 3) return "#ffee00";

  return "#66ccff";
}
