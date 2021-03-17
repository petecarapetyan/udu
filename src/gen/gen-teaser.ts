import { GenTeaserSpec } from "../types";
// import { randomTitle, writeDirIndexMd, writeFileToPath } from "../util/common";
import { randomLoremTitle, seedPhotoStock } from "../util/common"

export const gen = (genTeaserSpec: GenTeaserSpec) => {

  console.log("targetDir", genTeaserSpec.targetDir)
  console.log("thumbSize", genTeaserSpec.thumbSize)
  console.log("photoWidth", genTeaserSpec.photoWidth)
  console.log("teaserCount", genTeaserSpec.teaserCount)
  console.log("featurePicWidth", genTeaserSpec.featurePicWidth)
  console.log("teaserWords", genTeaserSpec.teaserWords)
  const titleWordCount = randomLoremTitle(genTeaserSpec.titleWords);
  console.log("titleWords",genTeaserSpec.titleWords, titleWordCount);
  console.log("FILE AT ",seedPhotoStock(genTeaserSpec ))
  const indexTitle = genTeaserSpec.targetDir.substr(
    genTeaserSpec.targetDir.lastIndexOf("/"),
    genTeaserSpec.targetDir.length
  );
  console.log("WTF",indexTitle)
  // writeFileToPath(
  //   indexTitle,
  //   `${genTeaserSpec.targetDir}/docs/index.md`,
  //   genTeaserSpec,
  //   false
  // );
  // for (let i = 0; i < genTeaserSpec.topMenuCount; i++) {
  //   const title = randomTitle(1);
  //   const dirPath = `${genTeaserSpec.targetDir}/docs/${title}`;
  //   writeDirIndexMd(title, dirPath, genTeaserSpec, false);
  //   for (let i = 0; i < genTeaserSpec.folderMax; i++) {
  //     const folder = randomTitle(1)
  //     const folderPath = `${dirPath}/${folder}`
  //     writeDirIndexMd(folder, folderPath, genTeaserSpec, true);
  //   }

  // }
};
