import { PartialSessionInt } from "./SessionTypes";

export interface AccountInt {
  _id: string;
  name: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  session?: string;
}

export interface AccountPopulatedInt {
  _id: string;
  name: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  session?: PartialSessionInt;
}

export type PartialAccountInt = Partial<AccountInt>;
export type PartialAccountPopulatedInt = Partial<AccountPopulatedInt>;
