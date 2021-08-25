import { writeFile, randomTitle, mkdir } from "../util/common";
const rimraf = require("rimraf");

const writeIndexPage = async (dirPath: string, name: string) => {
  const file = `# ${name}
something here by Sarah`
  writeFile(
    `${dirPath}/index.md`,
    file
  );
}

const writePage = async (filepath: string, data: Object) => {
  const randomword = randomTitle(1);
  const name = data["name"]?data["name"]:randomword;
  const dirPath = `${filepath}/${name.toLowerCase()}`
  await mkdir(dirPath)
  writeFile(
    `${dirPath}/index.md`,
    writeContent(data, randomword)
  );
}

const writeContent = ( data: Object, randomword: string) => {
  const name = data["name"]?data["name"].toUpperCase():randomword.toUpperCase();
  const steps = data["steps"]?data["steps"]:"[STEPS SHOWN HERE] laboris incididunt eiusmod. Anim aliquip cupidatat in aliqua adipisicing aliquip. Duis proident incididunt";
  const related = data[""]?data["steps"]:"P22SQCC P24SQCC P816LKE";
  const short = data["steps"]?data["steps"]:"Occaecat magna enim ea laboris incididunt eiusmod. Anim aliquip cupidatat in aliqua adipisicing aliquip. Duis proident incididunt";
  const long = data["steps"]?data["steps"]:"Aliquip consequat ad ut amet fugiat occaecat eiusmod minim magna non quis tempor quis laborum. Exercitation nisi esse do magna aute. Laborum est anim anim culpa dolore nisi fugiat amet. Nisi incididunt minim dolore laborum occaecat id do duis. Sit id sunt id esse nostrud. Laboris ullamco veniam sit veniam. Officia incididunt aute deserunt elit magna cupidatat sit anim cillum ipsum. Laborum incididunt velit nisi cillum irure cillum.";
  const markdown = `---
layout: layout-product
product: >
  ${name}
topDesc: >
  ${short}
sideDesc: >
  ${short}
floweryDesc: >
  ${long}
details: >
  ${data["shape"]}
  ${data["trim"]}
  ${data["size"]}
cost: ${data["cost"]}
related: >
  ${related}
steps: >
  ${steps}
photoBase: https://storage.googleapis.com/betterology-com.appspot.com/images/square/
photo: bulksplash-aesopwines-4ksZO-Rz_1M
---

# ${name}
  
## ${short.substring(0, 25)}
  
${long}`
  return markdown
}

export const generate = async (_sourcePath: string, _writePath: string ) => {
  const data = require(_sourcePath);
  const ROOT_PATH = '/Users/petecarapetyan/work/bella/bellastrati/docs/'
  let PILLOWS_PATH = `${ROOT_PATH}pillows`
  rimraf.sync(PILLOWS_PATH);
  await mkdir(PILLOWS_PATH)
  let SHADES_PATH = `${ROOT_PATH}lampshades`
  rimraf.sync(SHADES_PATH);
  await mkdir(SHADES_PATH)
  let OTTOMANS_PATH = `${ROOT_PATH}ottomans`
  rimraf.sync(OTTOMANS_PATH);
  await mkdir(OTTOMANS_PATH)
  for (let content of data) {
    if (content["product"]=="Product"){
      // first row - do nothing
    }else if (content["product"]=="Pillow"){
       writePage(PILLOWS_PATH, content)
      writeIndexPage(PILLOWS_PATH, "Pillows")
    }else if (content["product"]=="Lampshade"){
       writePage(SHADES_PATH, content)
       writeIndexPage(SHADES_PATH, "Pillows")
    }else if (content["product"]=="Ottoman"){
       writePage(OTTOMANS_PATH, content)
       writeIndexPage(OTTOMANS_PATH, "Pillows")
    }else{
      console.error(`\nUNEXPECTED ENTRY:${content["product"]}`)
    }
  }
}
//Fannullone lazy bones