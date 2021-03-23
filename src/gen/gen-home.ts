import { GenLoremSpec, Teaser } from "../types";
import { writeFile, state, randomLoremTitle, randomShorterParagaph, seedThumbStock } from "../util/common";
const yaml = require('js-yaml');

export const writeHomePage = (genLoremSpec: GenLoremSpec) => {
  writeFile(
    `${genLoremSpec.targetDir}/docs/index.md`,
    genHomeContent(genLoremSpec)
  );
}

/*
Iterate through all pages, and push each to a teaser,
except one of those is instead randomly assigned to a feature.
Additionally check for section head, and push those to state.sections.
Except, limit state.sections and state.teasers length
to max allowed by genLoremSpec.teaserCount or genLoremSpec.ctaCount.
*/
export const defineHomePageState = (genLoremSpec: GenLoremSpec) => {
  const maxTeaserCount = Math.min(genLoremSpec.teaserCount, state.pages.length)
  const featureIndex = Math.floor(Math.random() * maxTeaserCount)
  for (let i = 0; i < maxTeaserCount; i++) {
    const item = state.pages[i]
    const isSection:boolean =  (item.match(/\//g)||[]).length === 2
    if(isSection && state.sections.length<genLoremSpec.ctaMax){
      state.sections.push(item)
    }
    if(i===featureIndex){
      state.feature == item
    }else{
      state.teasers.push(item)
    }
  }
}

export const genHomeContent = (genLoremSpec: GenLoremSpec) => {
  defineHomePageState(genLoremSpec)
  return `---
${genTopLevel(genLoremSpec)}
${genCallToAction(genLoremSpec)}
${genTeaserTitle(genLoremSpec)}
${genFeature(genLoremSpec)}
${genTeaserSection(genLoremSpec)}
---`
}
export const genTopLevel = (genLoremSpec: GenLoremSpec) => {
  return `title: ${genLoremSpec.targetDir}
layout: layout-home
slogan: The modern web setup for static sites with a sprinkle of JavaScript.`
}
export const genCallToAction = (genLoremSpec: GenLoremSpec) => {
  console.log(genLoremSpec.topMenuCount)
  return `callToActionItems:
  - text: Follow Guides
    href: /guides/
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
  - text: Browse Docs
    href: /docs/
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />`
}

const buildTeasers = (genLoremSpec: GenLoremSpec) => {
  const teasers: Teaser[] = []
  for (const value of Object.values(state.teasers)) {
    const teaser:Teaser = {
      title: randomLoremTitle(5),
      text: randomShorterParagaph(),
      href: value,
      img: seedThumbStock(genLoremSpec)
    }
    teasers.push(teaser)
  }
  const teasersObject = {
    teasers
  }
  return teasersObject
}


export const genTeaserTitle = (genLoremSpec: GenLoremSpec) => {  
  console.log(genLoremSpec.photoWidth)
  return `teasertitle: Why Rocket?`
}

export const genFeature = (genLoremSpec: GenLoremSpec) => {  
  console.log(genLoremSpec.photoWidth)
  return `feature:
  - title: Small
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: No overblown tools or frontend frameworks, add JavaScript and/or Web Components only on pages where needed.`
}

export const genTeaserSection = (genLoremSpec: GenLoremSpec) => {  
  return `${yaml.dump(buildTeasers(genLoremSpec))}`
}