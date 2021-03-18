import { GenLoremSpec } from "../types";
import { randomLoremTitle, writeDirIndexMd, writeFileToPath, dash4space } from "../util/common";

export const gen = (genLoremSpec: GenLoremSpec) => {
  const indexTitle = genLoremSpec.targetDir.substr(
    genLoremSpec.targetDir.lastIndexOf("/"),
    genLoremSpec.targetDir.length
  );
  writeFileToPath(
    indexTitle,
    `${genLoremSpec.targetDir}/docs/index.md`,
    genLoremSpec,
    false
  );
  for (let i = 0; i < genLoremSpec.topMenuCount; i++) {
    const title = randomLoremTitle(2);
    const dirPath = `${genLoremSpec.targetDir}/docs/${dash4space(title)}`;
    writeDirIndexMd(title, dirPath, genLoremSpec, false);
    for (let i = 0; i < genLoremSpec.folderMax; i++) {
      const folder = randomLoremTitle(2)
      const folderPath = `${dirPath}/${dash4space(folder)}`
      writeDirIndexMd(folder, folderPath, genLoremSpec, true);
    }

  }
};
