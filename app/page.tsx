import styles from "./page.module.css";
import { latestVerse, pastVerses } from "@/data/verses";
import { DEPT_NAME } from "./config";
import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import VerseCard from "./components/VerseCard";
import VerseArchive from "./components/VerseArchive";
import DeptInfo from "./components/DeptInfo";
import SiteFooter from "./components/SiteFooter";
import DecorLayer from "./components/DecorLayer";

export default function Home() {
  return (
    <>
      {/* 앰비언트 장식 — 콘텐츠 뒤(z:0), reduced-motion에서 미표시 */}
      <DecorLayer />

      <SiteNav />

      {/* 콘텐츠는 장식 위로 (relative + z:field) */}
      <div className={styles.page}>
        <Hero />

        <main id="main">
          {/* 환영 — 마당 안으로 들어섬 */}
          <section className={styles.welcome} aria-labelledby="welcome-title">
            <div className={styles.welcomeInner}>
              <h2 className={styles.plaqueTitle} id="welcome-title">
                <span className={styles.plaqueTitleInner}>
                  {DEPT_NAME}에 오신 걸 환영해요
                </span>
              </h2>
              <p className={styles.welcomeText}>
                작은 교회 마당에서, 예수님과 손을 잡고 함께 걷는 이야기예요.
                여기 우리 아이들이 매주 만난 말씀이 한 편씩 쌓입니다.
                천천히 머물며, 이번 주 말씀을 함께 읽어 주세요.
              </p>
            </div>
          </section>

          {/* 이번 주 말씀 — 성소의 고요 (페이지의 경건한 정점) */}
          <section
            className={styles.latest}
            id="latest"
            aria-labelledby="latest-title"
          >
            <div className={styles.latestInner}>
              <h2 className={styles.sectionTitle} id="latest-title">
                이번 주 말씀
              </h2>
              <VerseCard verse={latestVerse} featured />
            </div>
          </section>

          {/* 지난 말씀 — 함께 걷는 길 */}
          <VerseArchive verses={pastVerses} />

          {/* 요셉부 이야기 — 다시 소속으로 */}
          <DeptInfo />
        </main>
      </div>

      {/* 우드-딥 홈 그라운드 */}
      <SiteFooter />
    </>
  );
}
