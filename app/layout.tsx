import type { Metadata, Viewport } from "next";
import { Gowun_Batang } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CHURCH_NAME, DEPT_NAME, SITE_NAME } from "./config";

/* 디스플레이 — 워드마크·히어로·섹션 제목 전용 (강원교육새음체, 팻말 손글씨 톤) */
const gangwon = localFont({
  src: "./fonts/GangwonEduSaeeum.woff2",
  variable: "--font-gangwon",
  display: "swap",
});

/* 말씀 본문 — 부드럽고 둥근 명조, 경건함 + 어르신 가독성 */
const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gowun",
  display: "swap",
});

const description =
  `${CHURCH_NAME} ${DEPT_NAME}(유치부)가 매주 함께 나눈 성경 말씀을 담는 곳이에요. ` +
  `봄볕 같은 그림 한 장으로 문을 열고, 한 주 한 주 말씀이 조용히 쌓입니다.`;

export const metadata: Metadata = {
  title: {
    default: DEPT_NAME,
    template: `%s · ${DEPT_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  openGraph: {
    title: `${DEPT_NAME} · 매주 말씀 아카이브`,
    description: `예수님과 함께 걷는 우리. ${CHURCH_NAME} ${DEPT_NAME}가 매주 나눈 말씀을 담습니다.`,
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf7ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${gangwon.variable} ${gowunBatang.variable}`}>
      <body>{children}</body>
    </html>
  );
}
