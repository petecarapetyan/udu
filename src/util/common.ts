import { GenLoremSpec, State } from "../types";
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const random_words = require("random-words");
const fs = require("fs");
const path = require("path");
const jsConvert = require("js-convert-case");
export let state:State = {
  pages: [],
  feature: undefined,
  teasers: [],
  sections: []
}

export const randomTitle = (wordCount: number) => {
  const words = random_words(wordCount);
  const rtrn = words.join(" ");
  return rtrn;
};


export const dash4space = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = / /g;
  const replaceWith = "-";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

export const randomPhotoPath = (dir: string) => {
  const filePath = path.join(__dirname, `../../../unsplashed/${dir}`);
  if (!fs.existsSync(filePath)) {
    throw `FILE PATH ${filePath} DOES NOT EXIST, you furnished ${dir} and the 'unplashed' location was assumed as a pre-req`;
  }
  const files = fs.readdirSync(filePath);
  const randomNumber = Math.floor(Math.random() * files.length);
  const fileName = files[randomNumber];
  const resultPath = path.join(filePath, fileName);
  return resultPath;
};

export const copyRandomFile = (dir: string) => {
  const sourcePath = randomPhotoPath(dir);
  const fileName = path.basename(sourcePath);
  const result = { fileName, sourcePath };
  return result;
};

export const seedImage = (photoObject, targetDir: string) => {
  if (!fs.existsSync(path.normalize(targetDir))) {
    throw `FILE PATH ${path.normalize(
      targetDir
    )} DOES NOT EXIST, you furnished ${targetDir}`;
  }
  const writePath = `${path.normalize(
    targetDir
  )}/docs/_assets/_static/images`;
  fs.mkdir(writePath, { recursive: true }, (err) => {
    if (err) {
      throw `FAILED ${writePath}${err}`;
    }
  });
  const fileWritePath = path.join(writePath, photoObject.fileName);
  fs.readFile(photoObject.sourcePath, function (err, data) {
    if (err) throw err;
    fs.writeFile(fileWritePath, data, function (err) {
        if (err) throw err;
    });
  });
}

export const imgTag = (dir: string, genTeaserSpec) => {
  const photoObject = copyRandomFile(dir);
  seedImage(photoObject, genTeaserSpec.targetDir)
  const img = `<img class="bordered" src="/_merged_assets/_static/images/${photoObject.fileName}" alt="${photoObject.fileName}" />`
  return img;
}

export const seedThumbStock = (genTeaserSpec) => {
  const dir = `thumb/${genTeaserSpec.thumbSize}`;
  return imgTag(dir, genTeaserSpec)
}

export const seedPhotoStock = (genTeaserSpec) => {
  const dir = `landscape/${genTeaserSpec.photoWidth}`;
  return imgTag(dir, genTeaserSpec)
}

export const randomLoremTitle = (maxWordCount: number) => {
  const count = randomNumberFromMaxSkewedUp(maxWordCount);
  const lorem = new LoremIpsum();
  let title = lorem.generateWords(count);
  while (title.length < 5) {
    title = lorem.generateWords(count);
  }
  return title;
};

export const randomNumberFromMaxSkewedUp = (max: number) => {
  const min = max / 2 - 1;
  let result = randomFromRangeSkewedUp(max, min);
  if (result === 0) {
    result = 2;
  }
  return result;
};

export const randomParagraphs = (genLoremSpec, hasSections: boolean): string => {
  const count = randomFromRangeSkewedUp(1, genLoremSpec.paragraphMax);
  const photoInsertionPoint = Math.floor(Math.random() * count);
  let rtrn: string = "";
  for (let i = 0; i < count; i++) {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 10,
        min: 2,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });
    const sectionTitle = hasSections ? `## ${randomLoremTitle(2)}\n\n` : "";
    let content = lorem.generateParagraphs(1)
    if(i===photoInsertionPoint){
      content = `${seedPhotoStock(genLoremSpec)}\n\n${content}`
    }
    rtrn = `${rtrn}\n\n${sectionTitle}${content}`;
  }
  return rtrn;
};

export const randomFromRangeSkewedUp = (min: number, max: number) => {
  const spread = max - min;
  const addedToMin = Math.floor(Math.random() * spread);
  return min + addedToMin + 1;
};

export const markupContent = (title: string, genLoremSpec, hasSections: boolean) => {
  const fileContents = `# ${jsConvert.toSentenceCase(title)}${randomParagraphs(
    genLoremSpec,
    hasSections
  )}`;
  return fileContents;
}

export const mkdir = (dirPath: string) => {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      throw `FAILED ${dirPath}`;
    }
  });
}



export const persistPath = (filePath: string) => {
  state.pages.push(filePath.substr(filePath.indexOf("docs/")+4))
}

export const writeFile = (filePath: string, fileContents: string) => {
  persistPath(filePath)
  fs.writeFile(filePath, fileContents, (err) => {
    if (err) {
      throw `FAILED FILE WRITE: ${filePath}`;
    }
  });
}

export const writeDirIndexMd = (
  title: string,
  dirPath: string,
  genLoremSpec: GenLoremSpec,
  hasSections: boolean
) => {
  mkdir(dirPath);
  const fileContents = markupContent(title, genLoremSpec, hasSections)
  writeFile(`${dirPath}/index.md`, fileContents)
};

