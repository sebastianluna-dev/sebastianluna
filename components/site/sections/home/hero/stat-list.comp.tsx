import { useTranslations } from "next-intl";
import { STATS } from "@/constants/profile.const";
import "./stat-list.comp.css";

// The three figures under the lead: "+30 clientes satisfechos…".
export function StatList() {
  const t = useTranslations("hero.stats");

  return (
    <dl className="stat-list">
      {STATS.map((stat) => (
        <div key={stat.key} className="stat-list__item">
          <dt className="stat-list__label">{t(stat.key)}</dt>
          <dd className="stat-list__value">
            {stat.approximate && (
              <span className="stat-list__plus" aria-hidden="true">
                +
              </span>
            )}
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
