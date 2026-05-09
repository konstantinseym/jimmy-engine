import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../components/UI/SectionHeader";
import { getOnePost } from "../api/postsApi";

export default function Posts() {
  const { id } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    async function loadPost(postId) {
      const data = await getOnePost(postId);
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
