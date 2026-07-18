import ChapelMark from "./ChapelMark";
import {
  DEPT_NAME,
  WORSHIP_TIME,
  WORSHIP_PLACE,
  DEPT_AGE_RANGE,
} from "@/app/config";
import styles from "./DeptInfo.module.css";

export default function DeptInfo() {
  return (
    <section id="dept-info" className={styles.section} aria-labelledby="dept-info-title">
      <div className={styles.card}>
        {/* 우드 플라크 제목 */}
        <h2 className={styles.plaque} id="dept-info-title">
          <span className={styles.plaqueInner}>{DEPT_NAME} 이야기</span>
        </h2>

        {/* 소개 본문 */}
        <p className={styles.intro}>
          {DEPT_NAME}는 {DEPT_AGE_RANGE} 친구들이 예수님을 처음 만나는 자리예요.
          매주 주일, 눈높이에 맞춘 말씀과 이야기로 하나님의 사랑을 함께 배웁니다.
          아이가 말씀을 몸으로 느끼고, 마음에 담아 갈 수 있도록 정성껏 준비합니다.
        </p>

        {/* 모임 정보 — 표 금지, 소프트 정의 목록 */}
        <dl className={styles.infoList}>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>예배 시간</dt>
            <dd className={styles.infoValue}>{WORSHIP_TIME}</dd>
          </div>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>예배 장소</dt>
            <dd className={styles.infoValue}>{WORSHIP_PLACE}</dd>
          </div>
        </dl>

        {/* 채플 마크 — 장식 */}
        <div className={styles.markWrap} aria-hidden="true">
          <ChapelMark size={32} variant="ink" />
        </div>
      </div>
    </section>
  );
}
