import type { DisplayPerson } from "../lib/attendance";

interface NameCardProps {
  person: DisplayPerson;
  compact?: boolean;
  enlarged?: boolean;
}

export function NameCard({ person, compact = false, enlarged = false }: NameCardProps) {
  const roleLabel =
    person.role === "aa"
      ? "Instructor"
      : person.role === "pa"
        ? "PA"
        : person.role === "guest"
          ? "Guest"
          : "Student";

  if (compact && !enlarged) {
    return (
      <article className={["name-card", "name-card--compact", `name-card--${person.role}`].join(" ")}>
        <h3 className="name-card__name">{person.displayName}</h3>
      </article>
    );
  }

  return (
    <article
      className={[
        "name-card",
        `name-card--${person.role}`,
        enlarged ? "name-card--enlarged" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="name-card__body">
        <span className="name-card__role">{roleLabel}</span>
        <h3 className="name-card__name">{person.displayName}</h3>
        {person.englishName ? <p className="name-card__english">{person.englishName}</p> : null}
      </div>
    </article>
  );
}
