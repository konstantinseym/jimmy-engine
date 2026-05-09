import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../UI/SectionHeader";
import { supabase } from "../../lib/supabaseClient";

export default function Posts() {
  const { id } = useParams();
  const [postData, setPostData] = useState();

  async function fetchPost(postId) {
    const { data, error } = await supabase
      .from("posts")
      .select("id, image_url, image_alt, tags, title, content, created_at")
      .eq("id", postId)
      .single();

    if (error) console.log(error);

    return data;
  }

  useEffect(() => {
    async function loadPost(postId) {
      const data = await fetchPost(postId);
      setPostData(data);
    }

    loadPost(id);
  }, [id]);

  if (!postData) return <>LOADING</>;

  return (
    <main className="mx-auto w-full max-w-7xl py-32">
      <SectionHeader>{postData.title}</SectionHeader>
      <span>{postData.content}</span>
      <span>{postData.created_at}</span>
      <img
        className="h-full w-full rounded-lg object-cover"
        src={postData.image_url}
        alt={postData.imge_alt}
      />
    </main>
  );
}
