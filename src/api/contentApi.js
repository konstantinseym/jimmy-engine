import { supabase } from "../lib/supabaseClient";

export async function getMeta() {
  const { data, error } = await supabase.rpc("get_site_meta");

  if (error) console.log(error);

  return data;
}
