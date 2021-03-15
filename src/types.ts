export interface GenLoremSpec {
  targetDir: string;
  wordCount: number;
  topMenuCount: number;
  folderMax: number;
  pageMax: number;
  sectionMax: number;
  paragraphMax: number;
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


