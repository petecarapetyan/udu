export interface GenLoremSpec {
  targetDir: string;
  wordCount: number;
  topMenuCount: number;
  folderMax: number;
  pageMax: number;
  sectionMax: number;
  paragraphMax: number;
  photoWidth: number;
  teaserCount: number;
  ctaMax: number;
  thumbSize: number;
}

export interface GenTeaserSpec {
  targetDir: string;
  titleWords: number;
  thumbSize: number;
  teaserCount: number;
  featurePicWidth: number;
  teaserWords: number;
  photoWidth: number;
}

export interface ThemeSwapSpec {
  targetDir: string;
  theme: string;
  new: boolean;
  back: boolean;
}

export interface State {
  pages: string[];
  feature: undefined|string;
  teasers: string[];
  sections: string[];
}

export interface Teaser {
  title: string;
  href: string;
  img: string;
  text: string;
}
