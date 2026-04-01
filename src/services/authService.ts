import { supabase } from "./supabase";

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  const user = data.user;

  if (user) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
    });
  }
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function logout() {
  await supabase.auth.signOut();
}
