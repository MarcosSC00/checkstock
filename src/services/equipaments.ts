import type { EquipamentType } from "../types/equipamentType";
import { supabase } from "./supabase";

export async function createEquipament(data: EquipamentType) {
    const {error} = await supabase
    .from("equipaments")
    .insert({
        name: data.name,
        quantity: data.quantity
    });

    if (error) throw error;
}

export async function getEquipaments() {
    const {data} = await supabase
        .from("equipaments")
        .select();

    return data;
}

export async function updateEquipament(equipamentId: string, data: EquipamentType) {
    const {error} = await supabase
        .from("equipaments")
        .update({
            name: data.name,
            quantity: data.quantity
        })
        .eq("id", equipamentId);

    if (error) throw error;
}