import { GenLoremSpec, Teaser } from "../types";
import { writeFile, state, randomLoremTitle } from "../util/common";
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

const buildTeasers = () => {
  const teasers: Teaser[] = []
  for (const value of Object.values(state.teasers)) {
    console.log(`PAGEish ${value}`);
    const teaser:Teaser = {
      title: randomLoremTitle(5),
      text: "blah",
      href: value,
      img: "blah",
    }
    teasers.push(teaser)
  }
  return teasers
}

export const genTeaserSection = (genLoremSpec: GenLoremSpec) => {
  // console.log("PAGES==", state.pages)
  console.log("\nYAML\n",yaml.dump(buildTeasers()))
  console.log("\n\nJSON\n",JSON.stringify(genLoremSpec))
  
  return `teasertitle: Why Rocket?
feature:
  - title: Small
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: No overblown tools or frontend frameworks, add JavaScript and/or Web Components only on pages where needed.
teasers:
  - title: Small
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: No overblown tools or frontend frameworks, add JavaScript and/or Web Components only on pages where needed.
  - title: Pre-Rendered
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: Statically generated content means less javascript to ship and process.
  - title: Zero Configuration
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: Automatic code splitting, filesystem based routing, and javascript in markdown.
  - title: Meta Framework
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: 'Build on top of giants like <a href="https://www.11ty.dev/">eleventy</a>, <a href="https://rollupjs.org/">Rollup</a>, and <a href="https://www.modern-web.dev/">Modern Web</a>.'
  - title: Powerful Default Template
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: Provide content and you are ready to go.
  - title: Ready for Production
    href: /blah
    img: <img class="bordered" src="/_merged_assets/_static/images/bulksplash-bagasvg-7VS__QB2vo4.jpg" alt="bulksplash-bagasvg-7VS__QB2vo4.jpg" />
    text: Optimized for a smaller build size, faster dev compilation and dozens of other improvements.`
}