import type { EquipamentType } from "../types/equipamentType";
import { supabase } from "./supabase";

export async function createEquipament(user: any, data: EquipamentType) {
  const { error } = await supabase.from("equipaments").insert({
    name: data.name,
    quantity: data.quantity,
    user_id: user.id,
  });

  if (error) throw error;
}

export async function getEquipaments() {
  const { data } = await supabase.from("equipaments").select(`*,
    users (email)`);
  return data;
}

export async function updateEquipament(
  equipamentId: string,
  data: EquipamentType,
) {
  const { error } = await supabase
    .from("equipaments")
    .update({
      name: data.name,
      quantity: data.quantity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", equipamentId);

  if (error) throw error;
}

export async function getEquipamentsNames() {
  const { data } = await supabase.from("equipaments").select("id, name");
  return data;
}

export async function incrementEquipament(id: string, increment: number) {
  const { data: equip } = await supabase
    .from("equipaments")
    .select("quantity")
    .eq("id", id)
    .single();

  const { data: consumptions } = await supabase
    .from("consumptions")
    .select("quantity")
    .eq("equipament_id", id);

  const totalConsumed =
    consumptions?.reduce((acc, c) => acc + c.quantity, 0) ?? 0;

  const newQuantity = equip?.quantity + increment;

  if (newQuantity < totalConsumed) {
    throw new Error("Estoque não pode ser menor que o já consumido");
  }

  const { error } = await supabase
    .from("equipaments")
    .update({
      quantity: newQuantity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}
