import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";
import { Placeholder } from "./Placeholder";

type Props = { content: SiteContent["team"] };

export function Team({ content }: Props) {
  return (
    <section className="block light" id="team">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />

        <div className="team-grid" data-reveal-stagger>
          {content.members.map((member) => (
            <div className="team-card" key={member.id}>
              <Placeholder
                num={`Img ${member.id}`}
                description={member.name}
                variant="light"
              />
              <h4>{member.name}</h4>
              <div className="role">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
