import { supabase } from "../lib/supabaseClient";

export async function getRequestStatus() {
  const { data, error } = await supabase.rpc("get_request_status");

  if (error) throw error;

  return data;
}

export async function postRequest(request) {
  const { data, error } = await supabase.rpc("post_user_request", { request });

  if (error) throw error;

  return data;
}
