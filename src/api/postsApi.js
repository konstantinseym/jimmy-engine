import { supabase } from "../lib/supabaseClient";

export async function getLatestPosts(page) {
  const from = page;
  const to = page;

  const { data, error } = await supabase
    .from("posts")
    .select("id, image_url, image_alt, tags, title, excerpt, created_at")
    .order("id", { ascending: false })
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

export async function getComments(id, page) {
  const from = page * 3;
  const to = from + 2;

  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at")
    .eq("post_id", id)
    .order("id", { ascending: true })
    .range(from, to);

  if (error) console.log(error);

  return data;
}

export async function addComment(postId, content) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ content: content, post_id: postId }])
    .select()
    .single();

  if (error) console.log(error);

  return data;
}
