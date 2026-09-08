import type { ReactNode } from "react";
import { DisplayMath } from "../Math";
import styles from "../Lecture.module.css";

export { InlineMath, MathText } from "../Math";

export function SceneFrame({
  kicker,
  title,
  tone = "cream",
  children,
}: {
  kicker: string;
  title: string;
  tone?: "cream" | "gold" | "white" | "dark";
  children: ReactNode;
}) {
  const toneClass =
    tone === "gold" ? styles.gold : tone === "white" ? styles.whiteScene : tone === "dark" ? styles.dark : "";
  return (
    <section className={`${styles.scene} ${toneClass}`}>
      <p className={styles.kicker}>{kicker}</p>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export function MotivatingQuestion({ children }: { children: ReactNode }) {
  return (
    <div className={styles.promptItem} style={{ marginTop: 14, marginBottom: 4 }}>
      <strong>Question</strong>
      <p>{children}</p>
    </div>
  );
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.card}>
      <p className={styles.kicker}>{title}</p>
      {children}
    </div>
  );
}

export function Formula({ tex, children }: { tex?: string; children?: ReactNode }) {
  const content = tex ?? (typeof children === "string" ? children : undefined);
  if (content) {
    return (
      <div className={styles.formula}>
        <DisplayMath tex={content} />
      </div>
    );
  }
  return <div className={styles.formula}>{children}</div>;
}

export function Figure({ src, alt, width }: { src: string; alt: string; width?: string }) {
  const resolved =
    src.startsWith("http") || src.startsWith(import.meta.env.BASE_URL)
      ? src
      : `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`;
  return (
    <div className={styles.figureWrap}>
      <img src={resolved} alt={alt} style={{ width: width ?? "100%", maxWidth: "100%" }} />
    </div>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.bulletList}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function OrderedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className={styles.orderedList}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}
