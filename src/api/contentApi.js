import { supabase } from "../lib/supabaseClient";

export async function getContent() {
  const { data, error } = await supabase
    .from("settings")
    .select("title, subtitle, status")
    .single();

  if (error) console.log(error);

  return data;
}

export async function getStats() {
  const { data, error } = await supabase.rpc("get_site_stats");

  if (error) console.log(error);

  return data;
}
