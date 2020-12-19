import { ThemeSwapSpec } from "../types";

const ncp = require("ncp").ncp;
const fs = require("fs");
const rimraf = require("rimraf")

const copy = (copyDir: string, targetDir: string) => {
  rimraf.sync(targetDir)
  ncp(copyDir, targetDir, function(err) {
    if (err) {
      throw `UNABLE TO COPY ${copyDir} TO ${targetDir} ARE YOU SURE IT EXISTS?`
    }
  });
};

const cleanAndMove = (copyDir: string, targetDir: string) => {
  rimraf.sync(targetDir)
  ncp(copyDir, targetDir, function(err) {
    if (err) {
      console.log(err)
      throw `UNABLE TO COPY ${copyDir} TO ${targetDir} ARE YOU SURE IT EXISTS?`
    }else{
      rimraf.sync(copyDir)
    }
  });
};

/* TODO REFACTORING:

- utility file functions move up out to utility folder

- lots of problems in this code not using promises properly and mixing sync and async

- lots of opportunity such as abstracting out cleanAndMove type intentions

*/
export const swap = async (themeSwapSpec: ThemeSwapSpec) => {
  console.log("SWAPPING VIA", themeSwapSpec);

  const sourceDir = themeSwapSpec.new
    ? `${themeSwapSpec.targetDir}/docs`
    : `../rckt-theme-${themeSwapSpec.theme}/docs`;
  fs.access(sourceDir, fs.constants.F_OK, (err) => {
    if (err && !themeSwapSpec.back)
      throw `SOURCE DIR ${sourceDir} DOES NOT EXIST!`;
  });

  const assetSourceDir = themeSwapSpec.new ? "_merged_assets" : "_assets";
  const includeSourceDir = themeSwapSpec.new ? "_merged_includes" : "_includes";
  const dataSourceDir = themeSwapSpec.new ? "_merged_data" : "_data";

  const assetCopyDir = `${sourceDir}/${assetSourceDir}`;
  const includeCopyDir = `${sourceDir}/${includeSourceDir}`;
  const dataCopyDir = `${sourceDir}/${dataSourceDir}`;

  fs.access(assetCopyDir, fs.constants.F_OK, (err) => {
    if (err) throw `ASSET DIR ${assetCopyDir} DOES NOT EXIST!`;
  });

  fs.access(includeCopyDir, fs.constants.F_OK, (err) => {
    if (err) throw `INCLUDES DIR ${includeCopyDir} DOES NOT EXIST!`;
  });

  fs.access(dataCopyDir, fs.constants.F_OK, (err) => {
    if (err) throw `DATA DIR ${dataCopyDir} DOES NOT EXIST!`;
  });

  const targetAssetDir = `${themeSwapSpec.targetDir}/docs/_assets`;
  const targetIncludesDir = `${themeSwapSpec.targetDir}/docs/_includes`;
  const targetDataDir = `${themeSwapSpec.targetDir}/docs/_data`;

  if (!themeSwapSpec.back) {
    if (themeSwapSpec.new) {
      fs.access(targetAssetDir, fs.constants.F_OK, (err) => {
        if (!err) throw `${targetAssetDir} ALREADY EXISTS!`;
      });

      fs.access(targetDataDir, fs.constants.F_OK, (err) => {
        if (!err) throw `${targetDataDir} ALREADY EXISTS!`;
      });

      fs.access(targetIncludesDir, fs.constants.F_OK, (err) => {
        if (!err) throw `${targetIncludesDir} ALREADY EXISTS!`;
      });
    }else{
      console.log("DELETING", targetAssetDir, targetDataDir, targetIncludesDir)
      rimraf.sync(targetAssetDir)
      rimraf.sync(targetDataDir)
      rimraf.sync(targetIncludesDir)
    }
    console.log("COPYING", dataCopyDir, assetCopyDir, includeCopyDir)
    copy(dataCopyDir, targetDataDir);
    copy(includeCopyDir, targetIncludesDir);
    copy(assetCopyDir, targetAssetDir);
    if (themeSwapSpec.new) {
      fs.mkdirSync(
        `../rckt-theme-${themeSwapSpec.theme}/docs`,
        { recursive: true },
        (err) => {
          if (err) {
            throw `FAILED WRITING ../rckt-theme-${themeSwapSpec.theme}/docs`;
          }
        }
      );
      const newTargetAssetDir = `../rckt-theme-${themeSwapSpec.theme}/docs/_assets`;
      const newTargetIncludesDir = `../rckt-theme-${themeSwapSpec.theme}/docs/_includes`;
      const newTargetDataDir = `../rckt-theme-${themeSwapSpec.theme}/docs/_data`;
      copy(dataCopyDir, newTargetDataDir);
      copy(includeCopyDir, newTargetIncludesDir);
      copy(assetCopyDir, newTargetAssetDir);
    }
  } else {
    console.log("BACK FROM ",`${themeSwapSpec.targetDir}/docs`, "INTO", `../rckt-theme-${themeSwapSpec.theme}/docs` )
    cleanAndMove(targetAssetDir, assetCopyDir);
    cleanAndMove(targetDataDir, dataCopyDir);
    cleanAndMove(targetIncludesDir, includeCopyDir);
  }

  
};
