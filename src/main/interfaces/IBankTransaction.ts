import IBankAccount from "./IBankAccount";

export default interface IBankTransaction {
  id: number;
  amount: number;
  action: number;
  bankAccountId: number;
  description: string;
  isActive: boolean;
  bank?: IBankAccount;
}
