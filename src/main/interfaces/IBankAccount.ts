export default interface IBankAccount {
  id: number;
  code: string;
  name: string;
  currencyId: number;
  balance: number;
  clientId: number;
  isActive: boolean;
}
