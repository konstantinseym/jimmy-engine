import { supabase } from "../lib/supabaseClient";

export async function fetchLatestPosts(page) {
  const from = page;
  const to = page;

  const { data, error } = await supabase
    .from("posts")
    .select("id, image_url, image_alt, tags, title, excerpt, created_at")
    .order("id", { ascending: false })
    .limit(1)
    .range(from, to);

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

export async function getComments(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at")
    .eq("post_id", id);

  if (error) console.log(error);

  console.log(data);

  return data;
}
