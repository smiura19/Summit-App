export type Session = {
  TITLE: string;
  START: string;
  END: string;
  SPEAKER: string;
  TRACK: string;
  LOCATION: string;
  DESCRIPTION: string;
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