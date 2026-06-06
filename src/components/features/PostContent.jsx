import ReactMarcdown from "react-markdown";

export default function PostContent({ content }) {
  return (
    <article className="overflow-hidden">
      <ReactMarcdown
        components={{
          h1: ({ children }) => <h2 className="my-8 text-3xl">{children}</h2>,

          h2: ({ children }) => (
            <h3 className="mt-6 mb-4 text-2xl">{children}</h3>
          ),

          h3: ({ children }) => (
            <h4 className="mt-4 mb-2 text-xl">{children}</h4>
          ),

          p: ({ children }) => <p className="">{children}</p>,

          strong: ({ children }) => <strong className="">{children}</strong>,

          em: ({ children }) => <em className="">{children}</em>,

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-palette-green underline transition"
            >
              {children}
            </a>
          ),

          ul: ({ children }) => <ul className="mb-2 ml-4">{children}</ul>,

          ol: ({ children }) => <ol className="mb-2 ml-4">{children}</ol>,

          li: ({ children }) => <li className="">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="border-palette-green my-4 ml-4 rounded-lg border p-4">
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
            <code className="bg-palette-lightgray">{children}</code>
          ),
        }}
      >
        {content}
      </ReactMarcdown>
    </article>
  );
}
