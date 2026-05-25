import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["team"] };

function MemberCard({ member }: { member: SiteContent["team"]["members"][number] }) {
  return (
    <div className="team-card">
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
      <div className="team-card-info">
        <h4>{member.name}</h4>
        <div className="role">{member.role}</div>
      </div>
    </div>
  );
}

export function Team({ content }: Props) {
  return (
    <section className="block light" id="team">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />

        <div className="team-grid" data-reveal-stagger>
          {content.members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
