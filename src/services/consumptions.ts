import { supabase } from "./supabase";

export async function consumeEquipament(equipamentId: string, user: any) {
    const { error } = await supabase
    .from("cosumptions")
    .insert([
      {
        equipament_id: equipamentId,
        user_id: user.id,
        user_name: user.email,
      },
    ]);

    if (error) throw error;
}