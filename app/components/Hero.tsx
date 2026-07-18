"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import { CHURCH_NAME, DEPT_NAME, TAGLINE } from "@/app/config";
import { HERO_BLUR, HERO_BLUR_MOBILE } from "@/app/hero-blur";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 히어로 — 이미지가 주인공. 책이 펼쳐지는 표지, 풀블리드.
 * 레이어(뒤→앞): 그라데이션 베이스(항상) → 골드 글로 → 일러스트 →
 * 워드마크 플라크(halo는 플라크 뒤에만) → 스크롤 큐 → 하단 종이 마스크.
 * 이미지가 404여도 그라데이션 베이스가 보여 절대 깨지지 않는다.
 */

const HERO_PETALS = [
  { id: 1, left: "12%", top: "18%", delay: "0s", duration: "17s", color: "var(--blossom)", size: 20 },
  { id: 2, left: "72%", top: "26%", delay: "4s", duration: "21s", color: "var(--rose)",    size: 15 },
  { id: 3, left: "84%", top: "12%", delay: "9s", duration: "19s", color: "var(--gold)",    size: 13 },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const petalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 하드 가드: reduced-motion이면 타임라인 자체를 만들지 않는다 (모든 요소 정적)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!heroRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st = {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      // 3레이어 미세 패럴럭스 (이동 ≤ ~40px). 글로/그라데이션 최저속, 이미지 중간, 꽃잎 최고속.
      if (glowRef.current)       gsap.to(glowRef.current,       { y: 14, ease: "none", scrollTrigger: st });
      if (imageLayerRef.current) gsap.to(imageLayerRef.current, { y: 28, ease: "none", scrollTrigger: st });
      if (petalRef.current)      gsap.to(petalRef.current,      { y: 40, ease: "none", scrollTrigger: st });
    }, heroRef);

    return () => ctx.revert(); // 언마운트 시 ScrollTrigger·트윈 정리
  }, []);

  return (
    <header className={styles.hero} id="top" aria-label={`${DEPT_NAME} 소개`} ref={heroRef}>
      {/* 1. 베이스 그라데이션 (--sky → --meadow) — 이미지 없어도 항상 렌더 */}
      <div className={styles.gradientBase} aria-hidden="true" ref={glowRef}>
        <span className={styles.goldGlow} />
      </div>

      {/* 2. 히어로 일러스트 — 느린 Ken-Burns, cover, 얼굴+잡은 손에 초점 */}
      <div className={styles.imageLayer} ref={imageLayerRef} aria-hidden="true">
        <div className={styles.imageWrapDesktop} aria-hidden="true">
          <Image
            className={styles.image}
            src="/images/hero.png"
            alt="예수님이 두 어린이와 손을 잡고 작은 교회 앞을 함께 걷는, 따뜻한 봄날의 그림."
            fill
            priority
            sizes="(max-width: 640px) 0px, 100vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
          />
        </div>
        <div className={styles.imageWrapMobile} aria-hidden="true">
          <Image
            className={styles.imageMobile}
            src="/images/hero-mobile.png"
            alt="예수님이 두 어린이와 손을 잡고 작은 교회 앞을 함께 걷는, 따뜻한 봄날의 그림."
            fill
            priority
            sizes="(max-width: 640px) 100vw, 0px"
            placeholder="blur"
            blurDataURL={HERO_BLUR_MOBILE}
          />
        </div>
      </div>

      {/* 3. 히어로 스코프 꽃잎 레이어 */}
      <div className={styles.petalLayer} ref={petalRef} aria-hidden="true">
        {HERO_PETALS.map((p) => (
          <span
            key={p.id}
            className={styles.heroPetal}
            style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="8" rx="4.5" ry="9" fill={p.color} opacity="0.9" transform="rotate(0 16 16)" />
              <ellipse cx="16" cy="8" rx="4.5" ry="9" fill={p.color} opacity="0.85" transform="rotate(72 16 16)" />
              <ellipse cx="16" cy="8" rx="4.5" ry="9" fill={p.color} opacity="0.85" transform="rotate(144 16 16)" />
              <ellipse cx="16" cy="8" rx="4.5" ry="9" fill={p.color} opacity="0.85" transform="rotate(216 16 16)" />
              <ellipse cx="16" cy="8" rx="4.5" ry="9" fill={p.color} opacity="0.88" transform="rotate(288 16 16)" />
              <circle cx="16" cy="16" r="3" fill={p.color} opacity="0.95" />
            </svg>
          </span>
        ))}
      </div>

      {/* 4. 워드마크 플라크 — 좌하단, 크림 backdrop-blur (대비 보장) */}
      <div className={styles.plaque}>
        <span className={styles.plaqueHalo} aria-hidden="true" />
        <h1 className={styles.wordmark}>
          <span className={styles.eyebrow}>{CHURCH_NAME}</span>
          {DEPT_NAME}
        </h1>
        <p className={styles.subline}>{TAGLINE}</p>
      </div>

      {/* 5. 스크롤 큐 — rose 셰브런 + 안내 (reduced-motion: 정지) */}
      <a href="#latest" className={styles.scrollCue} aria-label="이번 주 말씀으로 이동">
        <span className={styles.scrollLabel}>말씀 보러 가기</span>
        <span className={styles.chevron} aria-hidden="true">
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 2L11 11L20 2"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>

      {/* 6. 하단 소프트 종이 마스크 — 첫 종이 페이지로 녹아듦 */}
      <div className={styles.paperMask} aria-hidden="true">
        <svg
          className={styles.paperWave}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C160,104 320,28 480,52 C640,76 720,116 880,96 C1040,76 1200,20 1360,44 C1413,52 1440,60 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>
  );
}
