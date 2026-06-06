import ReactMarcdown from "react-markdown";

export default function PostContent({ content }) {
  return (
    <article className="overflow-hidden">
      <ReactMarcdown
        components={{
          h1: ({ children }) => <h2 className="py-6 text-3xl">{children}</h2>,

          h2: ({ children }) => (
            <h3 className="pt-4 pb-2 text-2xl">{children}</h3>
          ),

          h3: ({ children }) => (
            <h4 className="pt-2 pb-1 text-xl">{children}</h4>
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

          ul: ({ children }) => <ul className="pb-2 pl-4">{children}</ul>,

          ol: ({ children }) => <ol className="pb-2 pl-4">{children}</ol>,

          li: ({ children }) => <li className="">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="border-palette-green border pb-2 pl-4">
              {children}
            </blockquote>
          ),

          img: ({ src, alt }) => <img src={src} alt={alt} className="" />,

          hr: () => <p className="text-red-500" />,

          code: ({ children }) => (
            <code className="text-red-500">{children}</code>
          ),

          pre: ({ children }) => <pre className="text-red-500">{children}</pre>,
        }}
      >
        {content}
      </ReactMarcdown>
    </article>
  );
}
