export interface ServiceInt {
    _id: string;
    name: string;
    amount: number;
    profit: number;
    createdAt: string;
    updatedAt: string;
}

export type PartialServiceInt = Partial<ServiceInt>;
