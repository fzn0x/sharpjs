import { compile, bind } from "./index.js";
import fs from "fs";

const sharp = fs.readFileSync("./index.sharp", {
  encoding: "utf8",
});
const { value } = compile(sharp);

console.log(value);
