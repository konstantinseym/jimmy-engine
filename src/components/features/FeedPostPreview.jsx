import AppLink from "../UI/AppLink";
import TimeStamp from "../UI/TimeStamp";

export default function FeedPostPreview({ post }) {
  return (
    <article className="border-palette-white/5 relative flex w-full flex-col overflow-hidden rounded-4xl border bg-linear-to-br from-black/5 to-black/1 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]">
      <div className="w-full">
        <img
          className="aspect-video object-cover grayscale-30"
          src={post.image_url}
          alt={post.image_alt}
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <AppLink to={"/posts/" + post.id}>
          <p className="line-clamp-2 min-h-12">{post.title}</p>
        </AppLink>
        <div className="self-end">
          <TimeStamp time={post.created_at} />
        </div>
      </div>
    </article>
  );
}
