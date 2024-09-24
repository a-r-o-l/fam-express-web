export interface SessionInt {
  _id: string;
  opening: Date;
  closing: Date;
  change: number;
  profit: number;
  date: string;
}

export type PartialSessionInt = Partial<SessionInt>;
