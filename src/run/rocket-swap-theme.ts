#!/usr/bin/env node
import { swap } from "../swap/theme-swap";
import { ThemeSwapSpec } from "../types";

const fs = require("fs");

const argv = require("yargs")
  .usage("Usage: $0 -d [string] -t [string] -n [boolean] -b [boolean]")
  .demandOption(["d", "t"]).argv;

fs.access(argv.d, fs.constants.F_OK, (err) => {
  if (err) throw `TARGET DIR ${argv.d} DOES NOT EXIST!`;
});

const sourceDir = `../rckt-theme-${argv.t}`;
fs.access(sourceDir, fs.constants.F_OK, (err) => {
  if (err && !argv.n ){
    throw `SOURCE DIR ${argv.d} DOES NOT EXIST AND YOU DID NOT PROVIDE THE -n (new) FLAG - ABORTED`;
  }
});

const themeSwapSpec: ThemeSwapSpec = {
  targetDir: argv.d,
  theme: argv.t,
  new: argv.n,
  back: argv.b
};

swap(themeSwapSpec);