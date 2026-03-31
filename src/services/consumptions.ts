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

export async function getConsumptions() {
  const { data } = await supabase.from("consumptions_summary").select("*");
  return data;
}
