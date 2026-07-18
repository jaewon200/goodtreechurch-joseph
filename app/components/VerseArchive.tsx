"use client";

import type { Verse } from "@/data/verses";
import styles from "./VerseArchive.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** 데이지 — 길 끝 종결 마크. 토큰 색만. */
function Daisy() {
  const petals = Array.from({ length: 8 });
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="18"
          cy="7.5"
          rx="3.1"
          ry="6.2"
          fill="var(--paper)"
          stroke="var(--paper-edge)"
          strokeWidth="0.8"
          transform={`rotate(${i * 45} 18 18)`}
        />
      ))}
      <circle cx="18" cy="18" r="4.6" fill="var(--gold)" />
    </svg>
  );
}

interface VerseArchiveProps {
  verses: Verse[];
}

/**
 * "함께 걷는 길" — 균일 그리드가 아닌 내려가는 단일 칼럼 타임라인.
 * 얇은 meadow 연결선이 위→아래로 그려지고, 각 컴팩트 카드는 #YYYY-MM-DD 앵커.
 */
export default function VerseArchive({ verses }: VerseArchiveProps) {
  const lineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const line = lineRef.current?.querySelector("line");
    if (!line) return;

    // reduced-motion: 완전히 그려진 정적 선 (타임라인 미생성)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 }); // 처음엔 안 그려진 상태
      gsap.to(line, {
        strokeDashoffset: 0,       // 위→아래로 한 번 그려짐
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }, lineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="archive" aria-labelledby="archive-title">
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle} id="archive-title">
          함께 걷는 길
        </h2>

        <ol className={styles.timeline} aria-label="지난 말씀">
          <svg
            className={styles.pathLine}
            ref={lineRef}
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1" y1="0" x2="1" y2="100"
              stroke="var(--meadow)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
            />
          </svg>
          {verses.map((verse, i) => (
            <li
              key={verse.date}
              className={styles.item}
              data-animate
              style={{ animationDelay: `${Math.min(i, 6) * 80}ms` }}
            >
              <span className={styles.dot} aria-hidden="true" />
              <article className={styles.compactCard} id={verse.date}>
                <p className={styles.compactWeek}>
                  <time dateTime={verse.date}>{verse.week}</time>
                </p>
                <p className={styles.compactText}>{verse.text}</p>
                <p className={styles.compactRef}>
                  <cite>{verse.ref}</cite>
                </p>
              </article>
            </li>
          ))}
        </ol>

        {/* 종결 — 데이지 + 초대 */}
        <div className={styles.closing}>
          <span className={styles.daisy} aria-hidden="true">
            <Daisy />
          </span>
          <p className={styles.closingText}>요셉부의 첫 말씀부터 함께해요.</p>
        </div>
      </div>
    </section>
  );
}
