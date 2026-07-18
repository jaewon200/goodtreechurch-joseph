// 매주 말씀 데이터. 새 말씀은 이 배열 맨 위에 한 항목씩 추가하면 됩니다.
// (최신 주가 배열의 첫 번째)

export type Verse = {
  /** 정렬·링크용 ISO 날짜 (주일) */
  date: string;
  /** 사람이 읽는 주차 표기 */
  week: string;
  /** 말씀 출처 */
  ref: string;
  /** 말씀 본문 */
  text: string;
  /** 한 주의 주제 */
  theme: string;
  /** 아이 눈높이 묵상 한 줄 */
  reflection: string;
};

export const verses: Verse[] = [
  {
    date: "2026-06-21",
    week: "2026년 6월 셋째 주",
    ref: "마태복음 19:14",
    text: "어린아이들을 용납하고 내게 오는 것을 금하지 말라 천국이 이런 사람의 것이니라",
    theme: "예수님께 오는 아이들",
    reflection: "예수님은 우리 같은 어린아이를 가장 반겨 주세요.",
  },
  {
    date: "2026-06-14",
    week: "2026년 6월 둘째 주",
    ref: "시편 23:1",
    text: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
    theme: "나의 목자 되신 하나님",
    reflection: "하나님이 양을 돌보는 목자처럼 늘 우리를 지켜 주세요.",
  },
  {
    date: "2026-06-07",
    week: "2026년 6월 첫째 주",
    ref: "요한복음 3:16",
    text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라",
    theme: "하나님의 사랑",
    reflection: "하나님은 우리를 너무너무 사랑하세요.",
  },
  {
    date: "2026-05-31",
    week: "2026년 5월 넷째 주",
    ref: "창세기 1:1",
    text: "태초에 하나님이 천지를 창조하시니라",
    theme: "세상을 지으신 하나님",
    reflection: "하늘도 꽃도 친구도, 모두 하나님이 만드셨어요.",
  },
];

export const latestVerse = verses[0];
export const pastVerses = verses.slice(1);
