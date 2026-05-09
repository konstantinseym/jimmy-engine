import Btn from "../UI/Btn";
import PostPreview from "../features/PostPreview";
import SectionHeader from "../UI/SectionHeader";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";

const SECTION_TITLE = "Latest posts";

export default function LatestPostsSection() {
  const [latestPosts, setLatestPosts] = useState([]);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("id, image_url, image_alt, tags, title, excerpt, created_at")
      .order("id", { ascending: false });

    if (error) console.log(error);

    return data;
  }

  useEffect(() => {
    async function loadPosts() {
      const posts = await fetchPosts();
      setLatestPosts(posts);
    }

    loadPosts();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      {latestPosts.map((post) => (
        <PostPreview key={post.id} postData={post} />
      ))}
      <Btn>Load more</Btn>
    </section>
  );
}
