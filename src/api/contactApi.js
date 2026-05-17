import { supabase } from "../lib/supabaseClient";

export async function insertContactMessage(message) {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        name: message.name,
        email: message.email,
        message: message.message,
        status: "unread",
        reply: null,
      },
    ])
    .select()
    .single();

  if (error) console.log(error);

  return data;
}
