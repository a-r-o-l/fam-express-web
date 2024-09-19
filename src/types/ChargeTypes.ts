import { PartialServiceInt } from "./ServiceTypes";

export interface ChargeInt {
    _id: string;
    amount: number;
    date: Date;
    service: string | PartialServiceInt;
    createdAt: Date;
    updatedAt: Date;
}
export interface ChargeIntWithPopulation {
    _id: string;
    amount: number;
    date: Date;
    service: PartialServiceInt;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChargeIntPopulated {
    _id: string;
    amount: number;
    date: Date;
    service: PartialServiceInt;
    createdAt: Date;
    updatedAt: Date;
}

export type PartialChargeInt = Partial<ChargeInt>;
export type PartialChargeIntWithPopulation= Partial<ChargeIntWithPopulation>;
