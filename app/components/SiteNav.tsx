"use client";

import { useSyncExternalStore } from "react";
import ChapelMark from "./ChapelMark";
import { DEPT_NAME } from "@/app/config";
import styles from "./SiteNav.module.css";

/** 스크롤 위치를 외부 store로 구독 — effect 내 setState 회피 + 초기값 정확. */
function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
function getScrolled() {
  return window.scrollY > 40;
}
function getScrolledServer() {
  return false;
}

export default function SiteNav() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolled,
    getScrolledServer,
  );

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      aria-label="주 내비게이션"
    >
      <div className={styles.inner}>
        {/* 좌: 로고 + 워드마크 */}
        <button
          type="button"
          className={styles.logoBtn}
          onClick={handleLogoClick}
          aria-label="페이지 맨 위로"
        >
          <ChapelMark size={28} />
          <span className={styles.wordmark}>{DEPT_NAME}</span>
        </button>

        {/* 우: 말씀 보기 링크 */}
        <a href="#archive" className={styles.archiveLink}>
          말씀 보기
        </a>
      </div>
    </nav>
  );
}
