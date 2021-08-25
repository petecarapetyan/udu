#!/usr/bin/env node

// tsc && ./.tsc/run/writeMdFromJson.js -s /Users/petecarapetyan/work/bella/bellastrati/files/productsAug19.json -d /Users/petecarapetyan/work/bella/bellastrati/docs

import { generate } from '../gen/gen-bella-products'

const fs = require("fs");

const argv = require('yargs')
    .usage('Usage: $0 -s [string] source directory -d [string] write target directory ')
    .demandOption([ 's', 'd'])
    .argv;

    
    fs.access(argv.d, fs.constants.F_OK, (err) => {
      if(err) throw `TARGET DIR ${argv.d} DOES NOT EXIST!`
    });
    fs.access(argv.s, fs.constants.F_OK, (err) => {
        if(err) throw `TARGET DIR ${argv.s} DOES NOT EXIST!`
      });

const reply = `
YOUR INPUTS AND/OR DEFAULTS:
-s = ${argv.s} - source directory
-d = ${argv.d} - write target directory
`
console.log(reply)
generate(argv.s, argv.d);
