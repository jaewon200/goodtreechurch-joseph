import ChapelMark from "./ChapelMark";
import { CHURCH_NAME, DEPT_NAME } from "@/app/config";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const year = 2026;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* 채플 마크 — paper 변형 (어두운 배경 위) */}
        <div className={styles.markWrap} aria-hidden="true">
          <ChapelMark variant="paper" size={40} />
        </div>

        {/* 워드마크 */}
        <p className={styles.wordmark}>
          {CHURCH_NAME} {DEPT_NAME}
        </p>

        {/* 닫는 한 줄 */}
        <p className={styles.tagline}>
          매주 주일, 말씀이 한 편씩 쌓입니다.
        </p>

        {/* 작은 하트 SVG */}
        <div className={styles.heartWrap} aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 12.5C7 12.5 1 8.6 1 4.8 1 2.7 2.7 1 4.8 1c1 0 1.9 0.5 2.2 1.1C7.3 1.5 8.2 1 9.2 1 11.3 1 13 2.7 13 4.8 13 8.6 7 12.5 7 12.5z"
              fill="var(--coral)"
            />
          </svg>
        </div>

        {/* 저작권 메타 */}
        <p className={styles.copyright}>
          &copy; {year} {CHURCH_NAME} {DEPT_NAME}
        </p>
      </div>
    </footer>
  );
}
