#!/usr/bin/env node

import { GenLoremSpec } from '../types';
import { gen } from '../gen/gen-teaser'
const fs = require("fs");

const argv = require('yargs')
    .usage('Usage: $0 -d [string] -titleWords [num] -thumbSize [num] -teaserCount [num] -featurePicWidth [num] -teaserWords [num] -photoWidth [num]')
    .demandOption(['d'])
    .default('titleWords', 5)
    .default('thumbSize', 100)
    .default('teaserCount', 17)
    .default('featurePicWidth', 500)
    .default('teaserWords', 35)
    .default('photoWidth', 700)
    .argv;

    fs.access(argv.d, fs.constants.F_OK, (err) => {
        if(err) throw `TARGET DIR ${argv.d} DOES NOT EXIST!`
      });

const reply = `
YOUR INPUTS AND/OR DEFAULTS:
-d = ${argv.d} - target directory
-titleWords = ${argv.titleWords} - word max = number of words max in a title
-thumbSize = ${argv.thumbSize} - top menu count
-teaserCount = ${argv.teaserCount} - number of teasers on front page
-featurePicWidth = ${argv.featurePicWidth} - width of the feature pic
-teaserWords = ${argv.teaserWords} - number of words teaser text
-photoWidth = ${argv.photoWidth} - width of photo in articles
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
    photoWidth: argv.photoWidth
}

gen(genLoremSpec)