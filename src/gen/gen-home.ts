import { GenLoremSpec } from "../types";
import { writeFile } from "../util/common";

export const writeHomePage = (genLoremSpec: GenLoremSpec) => {
  writeFile(
    `${genLoremSpec.targetDir}/docs/index.md`,
    genHomeContent(genLoremSpec)
  );
}

export const genHomeContent = (genLoremSpec: GenLoremSpec) => {
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
export const genTeaserSection = (genLoremSpec: GenLoremSpec) => {
  console.log(genLoremSpec.topMenuCount)
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