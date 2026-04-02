import type { ConsumptionType } from "../types/consumptionType";
import { supabase } from "./supabase";

export async function consumeEquipament(data: ConsumptionType, user: any) {
  const { error } = await supabase.rpc("consume_equipament", {
    p_equipament_id: data.equipamentId,
    p_user_id: user.id,
    p_quantity: data.quantity,
    p_destination: data.destination,
  });

  if (error) throw error;
}

export async function getConsumptionByEquipament(equipamentName: string) {
  const { data } = await supabase.from("consumptions").select();
  return data;
}

export async function getConsumptions(month: number, year: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  const { data, error } = await supabase
    .from("consumptions_summary")
    .select("*")
    .gte("consumed_at", startDate.toISOString())
    .lt("consumed_at", endDate.toISOString());

  if (error) throw error;

  return data;
}
