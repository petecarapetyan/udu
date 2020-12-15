#!/usr/bin/env node

import { GenLoremSpec } from '../types';
import { gen } from '../gen/gen-lorem'
const fs = require("fs");

const argv = require('yargs')
    .usage('Usage: $0 -d [string] -w [num] -t [num] -f [num] -p [num] -s [num] -g [num]')
    .demandOption(['d'])
    .default('w', 1)
    .default('t', 3)
    .default('f', 3)
    .default('p', 3)
    .default('s', 7)
    .default('g', 3)
    .argv;

    fs.access(argv.d, fs.constants.F_OK, (err) => {
        if(err) throw `TARGET DIR ${argv.d} DOES NOT EXIST!`
      });

const reply = `
YOUR INPUTS AND/OR DEFAULTS:
-d = ${argv.d} - target directory
-w = ${argv.w} - word max = number of words max in a title
-t = ${argv.t} - top menu count
-f = ${argv.f} - folder max count under top menu
-p = ${argv.p} - page max count under folder
-s = ${argv.s} - section max count under folder
-g = ${argv.g} - paragraph max count under section
`
console.log(reply);

const genLoremSpec: GenLoremSpec = {
    targetDir: argv.d,
    wordCount: argv.w,
    topMenuCount: argv.t,
    folderMax: argv.f,
    pageMax: argv.p,
    sectionMax: argv.s,
    paragraphMax: argv.g,
}

gen(genLoremSpec)