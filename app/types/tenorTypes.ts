export interface Nanomp4 {
  url: string;
  dims: number[];
  duration: number;
  preview: string;
  size: number;
}

export interface Nanowebm {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Tinygif {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Tinymp4 {
  url: string;
  dims: number[];
  duration: number;
  preview: string;
  size: number;
}

export interface Tinywebm {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Webm {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Gif {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Mp4 {
  url: string;
  dims: number[];
  duration: number;
  preview: string;
  size: number;
}

export interface Nanogif {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Mediumgif {
  url: string;
  dims: number[];
  preview: string;
  size: number;
}

export interface Loopedmp4 {
  url: string;
  dims: number[];
  duration: number;
  preview: string;
  size?: number;
}

export interface Medium {
  nanomp4: Nanomp4;
  nanowebm: Nanowebm;
  tinygif: Tinygif;
  tinymp4: Tinymp4;
  tinywebm: Tinywebm;
  webm: Webm;
  gif: Gif;
  mp4: Mp4;
  nanogif: Nanogif;
  mediumgif: Mediumgif;
  loopedmp4: Loopedmp4;
}

export interface Result {
  created: number;
  url: string;
  media: Medium[];
  tags: any[];
  shares: number;
  itemurl: string;
  composite?: any;
  hasaudio: boolean;
  title: string;
  id: string;
  hascaption?: boolean;
}

export interface TenorSearchResult {
  weburl: string;
  results: Result[];
  next: string;
}
