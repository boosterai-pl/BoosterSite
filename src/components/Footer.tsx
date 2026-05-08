import type { SiteContent } from "@/content/types";

type Props = {
  brand: string;
  content: SiteContent["footer"];
};

export function Footer({ brand, content }: Props) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/assets/booster-rocket.png" alt="" />
            <h3>
              {brand}
              <span className="serif">.</span>
            </h3>
            <p>{content.intro}</p>
          </div>
          {content.columns.map((col) => (
            <div className="footer-col" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          {content.bottom.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
