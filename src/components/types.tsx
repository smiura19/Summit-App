export type Session = {
  id: string;
  title: string;
  time: string;
  speaker: string;
  description: string;
};

export type Poster = {
  ID: string;
  PARTICIPANT: string;
  TITLE: string;
  DESCRIPTION: string;
  LINK: string;
  IMG: string;

};

export type Ratings = {
  scientific_merit?: number;
  appearance?: number;
  presentation?: number;
  comments?: string;
};