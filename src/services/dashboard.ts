import { supabase } from "./supabase";

export async function getDashboardSumary() {
  const { data, error } = await supabase
    .from("dashboard_summary")
    .select("*")
    .limit(1);

  if (error) throw error;

  return data[0];
}
export async function getMonthlyConsumption() {
  const { data, error } = await supabase
    .from("dashboard_consumption_by_month")
    .select("*");

  if (error) throw error;

  return data;
}

export async function getRecentConsumptions() {
  const { data, error } = await supabase
    .from("dashboard_recent_consumptions")
    .select("*");

  if (error) throw error;

  return data;
}
