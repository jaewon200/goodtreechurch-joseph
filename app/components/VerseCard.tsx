import type { Verse } from "@/data/verses";
import styles from "./VerseCard.module.css";

/** 코랄 하트 — 묵상 줄 앞 / featured 닫는 마크. 색은 토큰만. */
function Heart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 20.5C12 20.5 3.5 15.2 3.5 9.2C3.5 6.4 5.7 4.5 8.1 4.5C9.8 4.5 11.2 5.5 12 6.9C12.8 5.5 14.2 4.5 15.9 4.5C18.3 4.5 20.5 6.4 20.5 9.2C20.5 15.2 12 20.5 12 20.5Z"
        fill="var(--coral)"
      />
    </svg>
  );
}

/** 나비 — featured 카드에 로드 시 한 번 살포시 앉음(비루프). */
function Butterfly({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="34"
      height="30"
      viewBox="0 0 34 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17 15C13 6 6 4 3.5 7.5C1 11 3 17 8 18.5C12 19.7 15.5 17.5 17 15Z" fill="var(--rose)" opacity="0.92" />
      <path d="M17 15C21 6 28 4 30.5 7.5C33 11 31 17 26 18.5C22 19.7 18.5 17.5 17 15Z" fill="var(--blossom)" />
      <path d="M17 15C14 18 9 20 7 24C5.5 27 8 29 11 27.5C14 26 16 20.5 17 15Z" fill="var(--gold)" opacity="0.9" />
      <path d="M17 15C20 18 25 20 27 24C28.5 27 26 29 23 27.5C20 26 18 20.5 17 15Z" fill="var(--rose)" opacity="0.85" />
      <path d="M17 5.5V15" stroke="var(--wood-deep)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

interface VerseCardProps {
  verse: Verse;
  /** 이번 주 변형 — 크게, 골드 후광, 나비, 닫는 하트 */
  featured?: boolean;
}

export default function VerseCard({ verse, featured = false }: VerseCardProps) {
  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      id={verse.date}
      data-animate
    >
      {featured && <span className={styles.halo} aria-hidden="true" />}

      {featured && (
        <>
          <span className={styles.butterfly} aria-hidden="true">
            <Butterfly />
          </span>
          <p className={styles.featuredTag}>이번 주 말씀</p>
        </>
      )}

      {/* 1. 주차 (우드 톤 점 + 메타) */}
      <p className={styles.week}>
        <span className={styles.weekDot} aria-hidden="true" />
        <time dateTime={verse.date}>{verse.week}</time>
      </p>

      {/* 2. 말씀 — 주인공 */}
      <blockquote className={styles.verseText}>{verse.text}</blockquote>

      {/* 3. 출처 (meadow 룰 위, 우측 정렬, rose-deep) */}
      <div className={styles.refRow}>
        <span className={styles.meadowRule} aria-hidden="true" />
        <cite className={styles.ref}>{verse.ref}</cite>
      </div>

      {/* 4. 주제 (우드 플라크 미니 팻말) */}
      <div className={styles.themeRow}>
        <span className={styles.themeTag}>{verse.theme}</span>
      </div>

      {/* 5. 묵상 (코랄 하트 + 종이 웰) */}
      <div className={styles.reflectionWell}>
        <Heart className={styles.reflectionHeart} />
        <p className={styles.reflection}>{verse.reflection}</p>
      </div>

      {/* featured 닫는 코랄 하트 */}
      {featured && (
        <div className={styles.closingHeart} aria-hidden="true">
          <Heart />
        </div>
      )}
    </article>
  );
}
