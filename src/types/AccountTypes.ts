
export interface AccountInt {
    _id: string;
    name: string;
    role: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    session?: {
        opening?: Date | null,
        closing?: Date | null,
        change?: number,
        profit?: number,
      },
}

export type PartialAccountInt = Partial<AccountInt>;