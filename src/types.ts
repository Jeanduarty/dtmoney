export interface TransactionData {
  id: number;
  title: string;
  value: number;
  category: string;
  type: "deposit" | "withdraw";
}
