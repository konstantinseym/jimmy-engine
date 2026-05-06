import Btn from "../UI/Btn";
import PostPreview from "../features/PostPreview";
import SectionHeader from "../UI/SectionHeader";
import { supabase } from "../../lib/supabaseClient";
import { useEffect } from "react";

const SECTION_TITLE = "Latest posts";

const latestPosts = [
  {
    imageSrc: "/posts/0001.png",
    imageAlt: "Minimalist workspace with laptop and coffee",
    tags: ["productivity", "mindset"],
    index: 1,
    title: "Building Focus in a Distracted World",
    excerpt:
      "A practical approach to staying consistent, eliminating noise, and actually getting things done without burnout...",
  },
  {
    imageSrc: "/posts/0002.png",
    imageAlt: "Evening city skyline with glowing lights",
    tags: ["lifestyle", "urban"],
    index: 2,
    title: "Why Cities Feel Different at Night",
    excerpt:
      "Exploring how the atmosphere of a city transforms after sunset and why nighttime can boost creativity and reflection...",
  },
  {
    imageSrc: "/posts/0003.png",
    imageAlt: "People working together in a modern coworking space",
    tags: ["work", "collaboration"],
    index: 3,
    title: "The Rise of Coworking Culture",
    excerpt:
      "How shared workspaces are reshaping productivity, networking, and the way we approach modern work environments...",
  },
];

export default function LatestPostsSection() {
  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select("*");

    console.log(data);
    console.log(error);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      {latestPosts.map((post) => (
        <PostPreview key={post.index} postData={post} />
      ))}
      <Btn>Load more</Btn>
    </section>
  );
}
