import { useState } from "react";
import "./faq.less";

const cls = "faq";

type FAQItem = { q: string; a: string };

type FAQProps = {
  items: FAQItem[];
  defaultOpenIndex?: number | null;
};

const FAQ = ({ items, defaultOpenIndex = 0 }: FAQProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpenIndex);
  return (
    <div className={`${cls}`}>
      {items.map((it, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className={`${cls}__item`}>
            <button
              className={`${cls}__q`}
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
            >
              {it.q}
            </button>
            {open && <div className={`${cls}__a`}>{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
};

export { FAQ };
