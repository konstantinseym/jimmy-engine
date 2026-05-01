import Btn from "../UI/Btn";
import PostPreview from "../features/PostPreview";
import SectionHeader from "../UI/SectionHeader";

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
    imageSrc: "/posts/0001.png",
    imageAlt: "Minimalist workspace with laptop and coffee",
    tags: ["productivity", "mindset"],
    index: 1,
    title: "Building Focus in a Distracted World",
    excerpt:
      "A practical approach to staying consistent, eliminating noise, and actually getting things done without burnout...",
  },
  {
    imageSrc: "/posts/0001.png",
    imageAlt: "Minimalist workspace with laptop and coffee",
    tags: ["productivity", "mindset"],
    index: 1,
    title: "Building Focus in a Distracted World",
    excerpt:
      "A practical approach to staying consistent, eliminating noise, and actually getting things done without burnout...",
  },
];

export default function LatestPostsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader title="Latest posts" />
      {latestPosts.map((post) => (
        <PostPreview key={post.index} postData={post} />
      ))}
      <Btn>Load more</Btn>
    </section>
  );
}
