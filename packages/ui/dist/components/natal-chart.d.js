// packages/ui/src/tokens/index.ts
var SIGNS_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];

// packages/ui/src/utils/degree.ts
function normalizeLongitude(lon) {
  const wrapped = lon % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}
function longitudeToSignPosition(longitude) {
  const lon = normalizeLongitude(longitude);
  const signIndex = Math.floor(lon / 30) % 12;
  const within = lon % 30;
  const degree = Math.floor(within);
  const minuteFloat = (within - degree) * 60;
  const minute = Math.floor(minuteFloat);
  const second = Math.round((minuteFloat - minute) * 60);
  return {
    sign: SIGNS_ORDER[signIndex] ?? "Aries",
    signIndex,
    degree,
    minute,
    second
  };
}
export {
  longitudeToSignPosition
};
//# sourceMappingURL=natal-chart.d.js.map
