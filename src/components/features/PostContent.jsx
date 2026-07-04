import ReactMarcdown from "react-markdown";
import ExternalLink from "../UI/ExternalLink";

export default function PostContent({ content }) {
  return (
    <article className="overflow-hidden">
      <ReactMarcdown
        components={{
          h1: ({ children }) => <h2 className="my-4">{children}</h2>,

          h2: ({ children }) => <h3 className="mt-8 mb-3">{children}</h3>,

          h3: ({ children }) => <h4 className="mt-6 mb-2">{children}</h4>,

          p: ({ children }) => <p>{children}</p>,

          strong: ({ children }) => <strong>{children}</strong>,

          em: ({ children }) => <em>{children}</em>,

          a: ({ href, children }) => (
            <ExternalLink href={href}>{children}</ExternalLink>
          ),

          ul: ({ children }) => <ul className="mb-2 ml-5">{children}</ul>,

          ol: ({ children }) => <ol className="mb-2 ml-5">{children}</ol>,

          li: ({ children }) => <li className="my-2">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="text-text-muted my-4 ml-4 p-4">
              {children}
            </blockquote>
          ),

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-4 aspect-square rounded-lg object-cover lg:aspect-5/2"
            />
          ),

          code: ({ children }) => (
            <code className="bg-red-500">{children}</code>
          ),
        }}
      >
        {content}
      </ReactMarcdown>
    </article>
  );
}
