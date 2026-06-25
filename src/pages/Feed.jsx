import { useInfiniteQuery } from "@tanstack/react-query";
import PageWrapper from "../components/UI/PageWrapper";
import { useSearchParams, useNavigate } from "react-router-dom";
import BtnAsText from "../components/UI/BtnAsText";
import { useEffect, useState } from "react";
import { getPosts } from "../api/postsApi";
import { AnimatePresence, motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../config/motion.config";
import { useLayoutEffect } from "react";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import InputField from "../components/UI/InputField";
import { useDebounced } from "../hooks/useDebounced";
import NavBar from "../components/layout/NavBar";

export default function Feed() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounced(search, 1000);

  const postsQuery = useInfiniteQuery({
    queryKey: ["posts", { debouncedSearch }],
    queryFn: ({ pageParam = 0 }) =>
      getPosts({
        page: pageParam,
        search: debouncedSearch,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 3 ? allPages.length : undefined;
    },
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debouncedSearch, setSearchParams]);

  return (
    <PageWrapper>
      <NavBar>
        <ul className="flex items-center gap-8">
          <li>
            <BtnAsText onClick={() => navigate(-1)}>← Back</BtnAsText>
          </li>
          <li>
            <BtnAsText onClick={() => navigate("/")}>Home</BtnAsText>
          </li>
          <li>
            <InputField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search..."
            />
          </li>
        </ul>
      </NavBar>
      <AnimatePresence mode="wait">
        {postsQuery.isPending ? (
          <motion.div
            key="loader"
            className="flex min-h-screen items-center"
            exit={{ opacity: 0 }}
            transition={FADE_TRANSITION_RULES}
          >
            <Loader />
          </motion.div>
        ) : postsQuery.isError ? (
          <motion.div
            key="error"
            className="flex min-h-screen items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={FADE_TRANSITION_RULES}
          >
            <Error />
          </motion.div>
        ) : (
          <motion.main
            key="posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={FADE_TRANSITION_RULES}
            className="mx-auto w-full max-w-7xl px-6 pt-40 lg:pt-30"
          >
            <div className="flex flex-col gap-12">
              {postsQuery.data.pages.flat().map((post) => (
                <div key={post.id}>
                  <img
                    src={post.image_url}
                    alt={post.image_alt}
                    className="w-32"
                  />
                  <p>Tags: {post.tags}</p>
                  <p>Title: {post.title}</p>
                  <p>Excerpt: {post.excerpt}</p>
                  <p>Date created: {post.created_at}</p>
                  <p>Likes: {post.likes_count}</p>
                  <p>Comments: {post.comments_count}</p>
                </div>
              ))}
            </div>

            <button onClick={() => postsQuery.fetchNextPage()}>
              load more
            </button>
          </motion.main>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
