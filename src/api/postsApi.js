import { supabase } from "../lib/supabaseClient";

export async function getLatestPosts(page) {
  const from = page * 3;
  const to = from + 2;

  const { data, error } = await supabase
    .from("posts")
    .select("id, image_url, image_alt, tags, title, excerpt, created_at")
    .order("id", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data;
}

export async function getOnePost(id) {
  const { data, error } = await supabase.rpc("get_one_post", { p_post_id: id });

  if (error) throw error;

  return data;
}

export async function getComments(id, page) {
  const { data, error } = await supabase.rpc("get_comments", {
    p_post_id: id,
    p_page: page,
  });

  if (error) throw error;

  console.log(data);

  return data;
}

export async function addComment(postId, content) {
  const { data, error } = await supabase.rpc("add_comment", {
    p_post_id: postId,
    p_content: content,
  });

  if (error) throw error;

  return data;
}
