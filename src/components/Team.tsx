import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["team"] };

export function Team({ content }: Props) {
  return (
    <section className="block light" id="team">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />

        <div className="team-grid" data-reveal-stagger>
          {content.members.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-photo">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={400}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                ) : null}
              </div>
              <h4>{member.name}</h4>
              <div className="role">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
