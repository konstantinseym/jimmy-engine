import { supabase } from "../lib/supabaseClient";

export async function getLatestPosts() {
  const { data, error } = await supabase.rpc("get_latest");

  if (error) throw error;

  return data;
}

export async function getOnePost(id) {
  const { data, error } = await supabase.rpc("get_post", { p_post_id: id });

  if (error) throw error;

  return data;
}

export async function getPosts({ page = 0, tag = null, search = null }) {
  const { data, error } = await supabase.rpc("get_posts", {
    p_page: page,
    p_tag: tag,
    p_search: search,
  });

  if (error) throw error;

  return data;
}

export async function getComments(id, page) {
  const { data, error } = await supabase.rpc("get_comments", {
    p_post_id: id,
    p_page: page,
  });

  if (error) throw error;

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

export async function getLikes(postId) {
  const { data, error } = await supabase.rpc("get_likes", {
    p_post_id: postId,
  });

  if (error) throw error;

  return data;
}

export async function toggleLike(postId) {
  const { data, error } = await supabase.rpc("toggle_like", {
    p_post_id: postId,
  });

  if (error) throw error;

  return data;
}
