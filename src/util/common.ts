import { GenLoremSpec } from "../types";
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const random_words = require("random-words");
const fs = require("fs");
const jsConvert = require('js-convert-case');

export const randomTitle = (wordCount: number) => {
  const words = random_words(wordCount);
  const rtrn = words.join(" ")
  return rtrn
};


export const randomParagraphs = (max: number, hasSections: boolean):string => {
  const count = randomFromRangeSkewedUp(1, max);
  let rtrn:string = ''
  for (let i = 0; i < count; i++) {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 10,
        min: 2,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      }
    });
    const sectionTitle = hasSections?`## ${randomTitle(1)}\n\n`:''
    rtrn = `${rtrn}\n\n${sectionTitle}${lorem.generateParagraphs(1)}`
  }
  return rtrn;
};

export const randomFromRangeSkewedUp = (
  min: number,
  max: number
) => {
  const spread = max - min;
  const addedToMin = Math.floor(Math.random()*spread)
  return min + addedToMin + 1;
};

export const writeDirIndexMd = (title:string, dirPath:string, genLoremSpec:GenLoremSpec, hasSections:boolean)=>{
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      throw `FAILED ${dirPath}`;
    }
  });
  const fileContents = `# ${jsConvert.toSentenceCase(title) }${randomParagraphs(
    genLoremSpec.paragraphMax, hasSections
  )}`;
  fs.writeFile(`${dirPath}/index.md`, fileContents, (err) => {
    if (err) {
      throw `FAILED ${dirPath}/index.md`;
    }
  });
}

export const writeFileToPath = (title:string, path:string, genLoremSpec:GenLoremSpec, hasSections:boolean)=>{
  const fileContents = `# ${jsConvert.toSentenceCase(title) }${randomParagraphs(
    genLoremSpec.paragraphMax, hasSections
  )}`;
  fs.writeFile(`${path}`, fileContents, (err) => {
    if (err) {
      throw `FAILED ${path}`;
    }
  });
}

