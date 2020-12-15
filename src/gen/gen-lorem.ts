import { GenLoremSpec } from "../types";
import { randomTitle, writeDirIndexMd, writeFileToPath } from "../util/common";

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
    const title = randomTitle(1);
    const dirPath = `${genLoremSpec.targetDir}/docs/${title}`;
    writeDirIndexMd(title, dirPath, genLoremSpec, false);
    for (let i = 0; i < genLoremSpec.folderMax; i++) {
      const folder = randomTitle(1)
      const folderPath = `${dirPath}/${folder}`
      writeDirIndexMd(folder, folderPath, genLoremSpec, true);
    }

  }
};
