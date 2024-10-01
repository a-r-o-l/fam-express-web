export interface PaymentInt {
  _id: string;
  description: string;
  amount: number;
  date: Date;
  type: string;
  receipt: string;
  payment_session: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PartialPaymentInt = Partial<PaymentInt>;
