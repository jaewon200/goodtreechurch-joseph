"use client";

import { useSyncExternalStore } from "react";
import styles from "./DecorLayer.module.css";

/** prefers-reduced-motion을 외부 store로 구독 (effect 내 setState 회피, SSR-safe). */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

/** 서버/첫 스냅샷: 모션 없음(안전) → 장식 미표시. */
function getReducedMotionServer() {
  return true;
}

// 꽃잎 5개 고정 배열 — 빌드 중 서버/클라이언트 불일치 없음
const PETALS = [
  { id: 1, left: "8vw",  delay: "0s",    duration: "22s", color: "var(--blossom)", scale: 1.0  },
  { id: 2, left: "78vw", delay: "5s",    duration: "18s", color: "var(--rose)",    scale: 0.8  },
  { id: 3, left: "55vw", delay: "10s",   duration: "26s", color: "var(--gold)",    scale: 0.7  },
  { id: 4, left: "20vw", delay: "15s",   duration: "20s", color: "var(--blossom)", scale: 0.9  },
  { id: 5, left: "88vw", delay: "3s",    duration: "28s", color: "var(--rose)",    scale: 1.0  },
];

// 인라인 SVG 꽃잎 — 5장 꽃 모양 타원 조합, 크기 16px 기준
function PetalSvg({ color, scale }: { color: string; scale: number }) {
  const size = Math.round(16 * scale);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 5장 꽃잎: 각도 0°/72°/144°/216°/288° */}
      <ellipse cx="16" cy="8"  rx="4.5" ry="9" fill={color} opacity="0.85" transform="rotate(0   16 16)" />
      <ellipse cx="16" cy="8"  rx="4.5" ry="9" fill={color} opacity="0.80" transform="rotate(72  16 16)" />
      <ellipse cx="16" cy="8"  rx="4.5" ry="9" fill={color} opacity="0.78" transform="rotate(144 16 16)" />
      <ellipse cx="16" cy="8"  rx="4.5" ry="9" fill={color} opacity="0.80" transform="rotate(216 16 16)" />
      <ellipse cx="16" cy="8"  rx="4.5" ry="9" fill={color} opacity="0.82" transform="rotate(288 16 16)" />
      {/* 중앙 허브 */}
      <circle cx="16" cy="16" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

// 인라인 SVG 나비 — 단순 날개 2쌍
function ButterflySvg() {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 44 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 윗날개 */}
      <ellipse cx="13" cy="14" rx="13" ry="11" fill="var(--rose)"    opacity="0.55" />
      <ellipse cx="31" cy="14" rx="13" ry="11" fill="var(--blossom)" opacity="0.55" />
      {/* 아랫날개 */}
      <ellipse cx="15" cy="24" rx="8"  ry="7"  fill="var(--gold)"    opacity="0.45" />
      <ellipse cx="29" cy="24" rx="8"  ry="7"  fill="var(--gold)"    opacity="0.45" />
      {/* 몸통 */}
      <ellipse cx="22" cy="18" rx="2"  ry="9"  fill="var(--wood)"    opacity="0.60" />
    </svg>
  );
}

export default function DecorLayer() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  // reduced-motion이면 아무것도 렌더하지 않는다 (OS 설정 변경 시 실시간 반영)
  if (reduceMotion) return null;

  return (
    <div
      className={styles.root}
      aria-hidden="true"
      role="presentation"
    >
      {/* 꽃잎 5개 */}
      {PETALS.map((p) => (
        <span
          key={p.id}
          className={styles.petal}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <PetalSvg color={p.color} scale={p.scale} />
        </span>
      ))}

      {/* 나비 1마리 — 비루프, 로드 시 한 번 등장 후 정지 */}
      <span className={styles.butterfly}>
        <ButterflySvg />
      </span>
    </div>
  );
}
