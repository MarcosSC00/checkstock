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

  const newQuantity = equip?.quantity + increment;

  const { error } = await supabase
    .from("equipaments")
    .update({
      quantity: newQuantity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteEquipamentById(id: string) {
  const { error } = await supabase.from("equipaments").delete().eq("id", id);

  if (error) throw error;
}

export async function getEquipamentIdByName(name: string) {
  const { data, error } = await supabase
    .from("equipaments")
    .select("id")
    .eq("name", name)
    .limit(1);
  if (error) throw error;

  return data[0].id;
}
