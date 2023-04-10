import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import isAfter from "date-fns/isAfter";
import localeKo from "date-fns/locale/ko";
import subWeeks from "date-fns/subWeeks";

//  ========================================================================
//  Date 관련 유틸 함수
//
// - token string에 따른 format result는 다음 공식 문서를 참조하세요.
//   https://github.com/date-fns/date-fns/blob/main/src/locale/ko/snapshot.md
//  ========================================================================

/**
 * 1주일이 지났는지 확인합니다.
 *
 * @param date
 * @returns
 */
function isWeekPassed(date: Date) {
  const weekAgo = subWeeks(new Date(), 1);

  return isAfter(date, weekAgo);
}

/**
 * Date 객체를 사용자에게 표시할 형태로 변환합니다.
 *
 * @param date
 * @returns
 */
export function getDateLabel(date: Date) {
  if (isWeekPassed(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: localeKo });
  }

  return format(date, "yyyy년 M월 d일", { locale: localeKo });
}

/**
 * Date 객체를 datetime 속성에 사용할 문자열로 변환합니다.
 *
 * @param date
 * @returns
 */
export function getDateTimeAttribute(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}
