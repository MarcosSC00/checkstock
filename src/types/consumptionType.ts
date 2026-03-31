export interface ConsumptionType {
  id?: number;
  userId: string;
  equipamentId: string;
  quantity: number;
  destination: string;
  consumed_at?: string;
}
