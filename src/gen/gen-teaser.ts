import { GenLoremSpec } from "../types";
import { seedPhotoStock } from "../util/common"

export const gen = (genLoremSpec: GenLoremSpec) => {

  console.log("targetDir", genLoremSpec.targetDir)
  console.log("photoWidth", genLoremSpec.photoWidth)
  console.log(seedPhotoStock(genLoremSpec ))
};
