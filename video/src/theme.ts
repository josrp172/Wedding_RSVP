import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadJost } from "@remotion/google-fonts/Jost";
import { loadFont as loadPinyon } from "@remotion/google-fonts/PinyonScript";

export const display = loadCormorant("normal", { weights: ["300", "400"], subsets: ["latin"] }).fontFamily;
loadCormorant("italic", { weights: ["300", "400"], subsets: ["latin"] });
export const script = loadPinyon("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const sans = loadJost("normal", { weights: ["300", "400"], subsets: ["latin"] }).fontFamily;

/** Same palette as the website. */
export const c = {
  paper: "#fcf2f2",
  blush: "#f6d3da",
  roseSoft: "#e3a3b4",
  rose: "#cf6f8c",
  berry: "#9b3a5c",
  ink: "#3e1f2c",
  wine: "#2f1520",
  gold: "#b98a58",
  goldSoft: "#ecd0a7",
};
