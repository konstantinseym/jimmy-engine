import Btn from "../../UI/Btn";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef, useEffect, useState } from "react";
import { fetchLatestPosts } from "../../../api/postsApi";

const SECTION_TITLE = "Latest posts";

const LatestPostsSection = forwardRef(function LatestPostsSection(props, ref) {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchLatestPosts();
      setLatestPosts(data);
    }

    loadPosts();
  }, []);

  return (
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      {latestPosts.map((post) => (
        <PostPreview key={post.id} postData={post} />
      ))}
      <Btn>Load more</Btn>
    </section>
  );
});

export default LatestPostsSection;
