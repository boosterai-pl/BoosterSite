import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["team"]; members: SiteContent["team"] };

export function Team({ content, members }: Props) {
  return (
    <section className="block light home-section home-tint" id="team">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <p className="lead home-lead" data-reveal>
          {content.body}
        </p>
        <div className="people" data-reveal-stagger>
          {members.map((member) => (
            <div className="person" key={member.id}>
              <div className="person-photo">
                <Image src={member.photo} alt={member.name} width={480} height={480} sizes="(max-width: 700px) 50vw, 20vw" />
              </div>
              <h3>{member.name}</h3>
              <p className="person-role mono">{member.role}</p>
              <p className="person-bio">{member.bio}</p>
            </div>
          ))}
        </div>
        <p className="home-closing" data-reveal>
          {content.story}
        </p>
      </div>
    </section>
  );
}
