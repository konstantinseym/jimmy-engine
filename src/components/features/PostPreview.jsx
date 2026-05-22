import { useNavigate } from "react-router-dom";

import Btn from "../UI/Btn";
import TagLabel from "../UI/TagLabel";
import { formatDate } from "../../utils/formatDate";

export default function PostPreview({ postData }) {
  const navigate = useNavigate();

  function openPost() {
    navigate("/posts/" + postData.id);
  }

  return (
    <article className="bg-palette-gray my-8 flex flex-col items-center gap-8 p-6 lg:flex-row lg:items-start">
      <div className="aspect-square max-w-xl lg:max-w-md">
        <img
          className="h-full w-full rounded-lg object-cover grayscale-50"
          src={postData.image_url}
          alt={postData.image_alt}
        />
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {postData.tags.map((tag, index) => (
              <TagLabel key={index} label={tag} />
            ))}
          </div>
          <span className="text-palette-green">
            {formatDate(postData.created_at)}
          </span>
          <h3 className="text-3xl">{postData.title}</h3>
          <p className="overflow-scroll">{postData.excerpt}</p>
        </div>
        <Btn onClick={openPost}>Read full</Btn>
      </div>
    </article>
  );
}
