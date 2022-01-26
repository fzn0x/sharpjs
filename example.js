import { render } from "./index.js";
import fs from "fs";

console.time("Example");
const sharp = fs.readFileSync("./index.sharp", {
  encoding: "utf8",
});
const value = render(sharp);

fs.writeFileSync("./render_result.html", value, {
  encoding: "utf8",
});
console.timeEnd("Example");
