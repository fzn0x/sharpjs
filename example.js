import { compile, bind } from "./index.js";
import fs from "fs";

const sharp = fs.readFileSync("./index.sharp", {
  encoding: "utf8",
});
const value = compile(sharp);

fs.writeFileSync("./compile_result.txt", value, {
  encoding: "utf8",
});
