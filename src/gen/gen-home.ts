import { GenLoremSpec, HomePageLink } from "../types";
import { writeFile, state, randomLoremTitle, randomShorterParagaph, seedThumbStock, randomParagaph, seedFeaturePhoto } from "../util/common";
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
${genTeaserTitle()}
${genFeature(genLoremSpec)}
${genTeaserSection(genLoremSpec)}
---`
}
export const genTopLevel = (genLoremSpec: GenLoremSpec) => {
  return `title: ${genLoremSpec.targetDir}
layout: layout-home
slogan: ${randomLoremTitle(12)}`
}
export const genCallToAction = (genLoremSpec: GenLoremSpec) => {
  return `${yaml.dump(buildCallToActionItems(genLoremSpec))}`
}

const buildCallToActionItems = (genLoremSpec: GenLoremSpec) => {
  const ctas: HomePageLink[] = []
  let i = 0
  for (const value of Object.values(state.sections)) {
    i++
    const cta:HomePageLink = {
      title: randomLoremTitle(5),
      text: randomShorterParagaph(),
      href: value,
      img: seedThumbStock(genLoremSpec)
    }
    if(i <= genLoremSpec.ctaMax){
      ctas.push(cta)
    }
  }
  const callToActionItemsObject = {
    callToActionItems: ctas
  }
  return callToActionItemsObject
}

const buildTeasers = (genLoremSpec: GenLoremSpec) => {
  const teasers: HomePageLink[] = []
  for (const value of Object.values(state.teasers)) {
    const teaser:HomePageLink = {
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


export const genTeaserTitle = () => {  
  return `teasertitle: ${randomLoremTitle(6)}`
}

export const genFeature = (genLoremSpec: GenLoremSpec) => {  
  const featureChoice = Math.min(state.teasers.length - 1 , genLoremSpec.teaserCount)
  const href = state.teasers[featureChoice]
  const feature: HomePageLink = {
    title: randomLoremTitle(5),
    text: randomParagaph(),
    href,
    img: seedFeaturePhoto(genLoremSpec)
  }
  const featureObject = {
    feature
  }
  return `${yaml.dump(featureObject)}`
}

export const genTeaserSection = (genLoremSpec: GenLoremSpec) => {  
  return `${yaml.dump(buildTeasers(genLoremSpec))}`
}