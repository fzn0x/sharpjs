import { render } from "./index.js";
import fs from "fs";

const sharp = fs.readFileSync("./index.sharp", {
  encoding: "utf8",
});
const value = render(sharp);

fs.writeFileSync("./render_result.txt", value, {
  encoding: "utf8",
});
