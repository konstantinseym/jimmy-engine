import { supabase } from "../lib/supabaseClient";

export async function insertContactMessage(message, user) {
  const { error } = await supabase.from("messages").insert([
    {
      name: user.user_metadata.full_name || user.user_metadata.name,
      email: user.email,
      message: message,
      status: "unread",
      reply: null,
    },
  ]);

  if (error) console.log(error);
}
