import type { ConsumptionType } from "../types/consumptionType";
import { supabase } from "./supabase";

export async function consumeEquipament(data: ConsumptionType, user: any) {
  const { error } = await supabase.from("cosumptions").insert([
    {
      equipament_id: data.equipamentId,
      destination: data.destination,
      user_id: user.id,
      user_email: user.email,
    },
  ]);

  if (error) throw error;
}

export async function getConsumptionByEquipament(equipamentName: string) {
  const { data } = await supabase.from("consumptions").select();
  return data;
}
