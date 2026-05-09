import { supabase } from "../../lib/supabaseClient";

export async function fetchLatestPosts(limit = 3) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, image_url, image_alt, tags, title, excerpt, created_at")
    .order("id", { ascending: false })
    .limit(limit);

  if (error) console.log(error);

  return data;
}

export async function getOnePost(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, image_url, image_alt, tags, title, content, created_at")
    .eq("id", id)
    .single();

  if (error) console.log(error);

  return data;
}
