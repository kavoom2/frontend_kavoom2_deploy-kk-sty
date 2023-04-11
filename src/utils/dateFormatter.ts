import utcToZonedTime from "date-fns-tz/utcToZonedTime";
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

type DateOrTimeInMs = number | Date;

/**
 * 채팅 API에서 사용하는 공통 날짜 포맷에 따라 날짜를 반환합니다.
 */
export function getTimestamp(dateOrTimeInMs: DateOrTimeInMs) {
  return new Date(dateOrTimeInMs).toISOString();
}

/**
 * date 객체, 문자열 또는 숫자를 Date 객체로 변환합니다.
 * - UTC 시간은 한국 시간으로 변환됩니다.
 */
export function getSafeDate(date: Date | string | number) {
  if (typeof date === "string") {
    if (date.endsWith("Z")) {
      const utcDate = new Date(date);
      const timeZone = "Asia/Seoul";
      const timeZoneDate = utcToZonedTime(utcDate, timeZone);

      return timeZoneDate;
    }

    return new Date(date);
  }

  if (typeof date === "number") {
    return new Date(date);
  }

  return date;
}

/**
 * 공통 날짜 포맷에서 날짜와 시간을 분리합니다.
 */
export function getDateAndTimeFromTimestamp(timestamp: string) {
  const [date, time] = getSafeDate(timestamp).toISOString().split("T");

  return {
    date,
    time: time.slice(0, 5),
  };
}

/**
 * 1주일이 지났는지 확인합니다.
 */
function isWeekPassed(dateOrTimeInMs: DateOrTimeInMs) {
  const weekAgo = subWeeks(new Date(), 1);

  return isAfter(dateOrTimeInMs, weekAgo);
}

/**
 * 현재 날짜에 따라 지정 날짜 또는 상대 날짜를 반환합니다.
 */
export function getRelativeDateLabel(date: Date | string | number) {
  const safeDate = getSafeDate(date);

  if (isWeekPassed(safeDate)) {
    return formatDistanceToNow(safeDate, {
      addSuffix: true,
      locale: localeKo,
    });
  }

  return format(safeDate, "yyyy년 M월 d일");
}

/**
 * hh:mm 형태의 시간 문자열을 반환합니다.
 */
export function getHourAndMinutesLabel(date: Date | string | number) {
  return format(getSafeDate(date), "hh:mm");
}

/**
 * yyyy년 M월 d일 형태의 날짜 문자열을 반환합니다.
 */
export function getFullDateLabel(date: Date | string | number) {
  return format(getSafeDate(date), "yyyy년 M월 d일");
}
