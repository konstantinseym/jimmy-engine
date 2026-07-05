import { useInfiniteQuery } from "@tanstack/react-query";
import PageWrapper from "../components/UI/PageWrapper";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { getPosts } from "../api/postsApi";
import { AnimatePresence, motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../config/motion.config";
import { useLayoutEffect } from "react";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import SearchField from "../components/UI/SearchField";
import { useDebounced } from "../hooks/useDebounced";
import NavBar from "../components/features/NavBar";
import PostPreview from "../components/features/PostPreview";
import { useInView } from "react-intersection-observer";

export default function Feed() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const debouncedSearch = useDebounced(searchFromUrl, 1000);

  const postsQuery = useInfiniteQuery({
    queryKey: ["posts", { debouncedSearch }],
    queryFn: ({ pageParam = 0 }) =>
      getPosts({
        page: pageParam,
        search: debouncedSearch,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 6 ? allPages.length : undefined;
    },
  });

  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && postsQuery.hasNextPage && !postsQuery.isFetchingNextPage) {
        postsQuery.fetchNextPage();
      }
    },
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleChangeSearch(e) {
    const value = e.target.value;

    if (value) {
      setSearchParams({ search: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }

  const navElements = [
    <Button onClick={() => navigate("/")}>Home</Button>,
    <SearchField
      value={searchFromUrl}
      onChange={handleChangeSearch}
      placeholder="search..."
    />,
  ];

  return (
    <PageWrapper>
      <NavBar elements={navElements} />
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
            className="bg-surface"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col pt-40 lg:grid lg:grid-cols-2 lg:pt-30">
              {postsQuery.data.pages.flat().map((post) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={FADE_TRANSITION_RULES}
                  key={post.id}
                >
                  <PostPreview postData={post} />
                </motion.div>
              ))}
            </div>
            <div ref={ref} className="flex h-24 flex-col justify-center">
              <AnimatePresence mode="wait">
                {postsQuery.isFetchingNextPage && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ ...FADE_TRANSITION_RULES, delay: 1 }}
                  >
                    <Loader />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
