import { AccountInt } from "./AccountTypes";

export interface CashClosingInt {
    _id: string;
    account: string;
    balance: number;
    chachos: number;
    coin: number;
    date: Date;
    fifty: number;
    fiveHoundred: number;
    Profit: number;
    ten: number;
    tenThousand: number;
    thousand: number;
    total: number;
    twenty: number;
    twoHoundred: number;
    houndred: number;
    twoThousand: number;
    sale_amount: number;
    change: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CashClosingIntWithPopulate {
    _id: string;
    account: AccountInt;
    balance: number;
    chachos: number;
    coin: number;
    date: Date;
    fifty: number;
    fiveHoundred: number;
    Profit: number;
    ten: number;
    tenThousand: number;
    thousand: number;
    total: number;
    twenty: number;
    twoHoundred: number;
    houndred: number;
    twoThousand: number;
    sale_amount: number;
    change: number;
    createdAt: Date;
    updatedAt: Date;
}


export type PartialCashClosingInt = Partial<CashClosingInt>;
export type PartialCashClosingIntWithPopulate = Partial<CashClosingIntWithPopulate>;
