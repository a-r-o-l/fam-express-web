import { PartialAccountInt } from "./AccountTypes";
import { PartialServiceInt } from "./ServiceTypes";

export interface SaleInt {
    _id: string;
    amount: number;
    date: Date;
    service: string
    account: string 
    createdAt: Date;
    updatedAt: Date;
}

export interface SaleIntPopulated {
    _id: string;
    amount: number;
    date: Date;
    service: PartialServiceInt;
    account: PartialAccountInt;
    createdAt: Date;
    updatedAt: Date;
}

export type PartialSaleInt = Partial<SaleInt>;
export type PartialSaleIntPopulated = Partial<SaleIntPopulated>;
