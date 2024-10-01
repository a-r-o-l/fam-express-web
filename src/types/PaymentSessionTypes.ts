export interface PaymentSessionInt {
  _id: string;
  date: string;
  transfer: number;
  cash: number;
  total: number;
  closed: boolean;
  totalPayments: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PartialPaymentSessionInt = Partial<PaymentSessionInt>;
