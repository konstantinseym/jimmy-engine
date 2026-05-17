import { supabase } from "../lib/supabaseClient";

export async function getContent() {
  const { data, error } = await supabase
    .from("settings")
    .select("title, subtitle, status")
    .single();

  if (error) console.log(error);

  return data;
}
