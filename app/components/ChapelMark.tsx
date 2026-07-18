interface ChapelMarkProps {
  size?: number;
  className?: string;
  variant?: "ink" | "paper";
}

export default function ChapelMark({
  size = 28,
  className,
  variant = "ink",
}: ChapelMarkProps) {
  const wallFill =
    variant === "paper" ? "oklch(0.985 0.010 82)" : "oklch(0.966 0.015 80)";
  const roofFill = "var(--wood)";
  const crossStroke =
    variant === "paper" ? "oklch(0.985 0.010 82)" : "var(--wood-deep)";
  const heartFill = "var(--coral)";
  const wallStroke =
    variant === "paper" ? "oklch(0.985 0.010 82)" : "var(--paper-edge)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* 벽 — 둥근 사각 */}
      <rect
        x="5"
        y="14"
        width="22"
        height="14"
        rx="3"
        fill={wallFill}
        stroke={wallStroke}
        strokeWidth="0.75"
      />
      {/* 지붕 — 삼각형 */}
      <polygon
        points="16,3 28,15 4,15"
        fill={roofFill}
      />
      {/* 십자가 — 지붕 위 */}
      <line x1="16" y1="1" x2="16" y2="7" stroke={crossStroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="3.2" x2="18.5" y2="3.2" stroke={crossStroke} strokeWidth="1.5" strokeLinecap="round" />
      {/* 하트 — 벽 중앙 */}
      <path
        d="M16 24.5c0 0-4-2.8-4-5.1 0-1.4 1.1-2.4 2.4-2.4 0.8 0 1.4 0.4 1.6 0.8 0.2-0.4 0.8-0.8 1.6-0.8 1.3 0 2.4 1 2.4 2.4 0 2.3-4 5.1-4 5.1z"
        fill={heartFill}
      />
    </svg>
  );
}
