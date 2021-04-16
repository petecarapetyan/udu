#!/usr/bin/env node

// tsc && ./.tsc/run/upload-pics.js -d /Users/petecarapetyan/work/df/unsplashed/doneImageMagick/portrait/100
// tsc && ./.tsc/run/upload-pics.js -s ../unsplashed/doneImageMagick/square/500 -d images/square/500 -t jpeg

import { load } from '../load/load-pics'

const fs = require("fs");

const argv = require('yargs')
    .usage('Usage: $0 -s [string] source directory -d [string] write target directory ')
    .demandOption([ 's','d', 't'])
    .argv;

    
    fs.access(argv.s, fs.constants.F_OK, (err) => {
        if(err) throw `TARGET DIR ${argv.d} DOES NOT EXIST!`
      });

const reply = `
YOUR INPUTS AND/OR DEFAULTS:
-s = ${argv.s} - source directory
-d = ${argv.d} - write target directory
-d = ${argv.t} - jpeg or gif
`
console.log(reply)
console.log(load(argv.s, argv.d, argv.t));
