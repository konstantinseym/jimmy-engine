import Btn from "../../UI/Btn";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";
import { getLatestPosts } from "../../../api/postsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";

const SECTION_TITLE = "Latest posts";

const LatestPostsSection = forwardRef(function LatestPostsSection(props, ref) {
  const postsQuery = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getLatestPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });

  function loadMore() {
    postsQuery.fetchNextPage();
  }

  if (postsQuery.isLoading) {
    return (
      <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
        <SectionHeader>{SECTION_TITLE}</SectionHeader>
        <Loader />
      </section>
    );
  }

  if (postsQuery.isError) {
    return (
      <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
        <SectionHeader>{SECTION_TITLE}</SectionHeader>
        <Error />
      </section>
    );
  }

  return (
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>

      {postsQuery.data.pages.flat().map((post) => (
        <PostPreview key={post.id} postData={post} />
      ))}

      <div className="text-center 2xl:text-left">
        <Btn
          onClick={loadMore}
          disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
        >
          Load more
        </Btn>
      </div>
    </section>
  );
});

export default LatestPostsSection;
