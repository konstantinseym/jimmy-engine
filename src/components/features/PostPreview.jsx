import { useNavigate } from "react-router-dom";

import Btn from "../UI/Btn";
import TagLabel from "../UI/TagLabel";

export default function PostPreview({ postData }) {
  const navigate = useNavigate();

  function openPost() {
    navigate("/posts/" + postData.index);
  }

  return (
    <article className="bg-palette-darkgray my-8 flex gap-8 rounded-lg p-6">
      <div className="aspect-square w-md">
        <img
          className="h-full w-full rounded-lg object-cover"
          src={postData.imageSrc}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {postData.tags.map((tag) => (
              <TagLabel label={tag} />
            ))}
          </div>
          <span className="text-palette-green">Episode {postData.index}</span>
          <h3 className="text-3xl">{postData.title}</h3>
          <p>{postData.excerpt}</p>
        </div>
        <Btn onClick={openPost}>Read full</Btn>
      </div>
    </article>
  );
}
