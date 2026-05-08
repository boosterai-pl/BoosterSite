import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";
import { Placeholder } from "./Placeholder";

type Props = { content: SiteContent["insights"] };

export function Insights({ content }: Props) {
  return (
    <section className="block" id="insights">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} />

        <div className="insights" data-reveal-stagger>
          {content.posts.map((post) => (
            <a href="#" className="insight" key={post.id}>
              <Placeholder num={`Img ${post.id}`} description="Article cover" />
              <div className="meta">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
