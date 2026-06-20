import { supabase } from "../lib/supabaseClient";

export async function getMeta() {
  const { data, error } = await supabase.rpc("get_meta");

  if (error) throw error;

  return data;
}
