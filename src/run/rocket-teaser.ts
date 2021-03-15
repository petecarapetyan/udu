#!/usr/bin/env node

import { GenLoremSpec } from '../types';
import { gen } from '../gen/gen-teaser'
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
-word = ${argv.word} - word max = number of words max in a title
-tub = ${argv.tub} - top menu count
-fub = ${argv.fub} - folder max count under top menu
-pub = ${argv.pub} - page max count under folder
-sub = ${argv.sub} - section max count front page
-gub = ${argv.gub} - paragraph word count per teaser
`
console.log(reply);

const genLoremSpec: GenLoremSpec = {
    targetDir: argv.d,
    wordCount: argv.word,
    topMenuCount: argv.tub,
    folderMax: argv.fub,
    pageMax: argv.pub,
    sectionMax: argv.sub,
    paragraphMax: argv.gub,
}

gen(genLoremSpec)