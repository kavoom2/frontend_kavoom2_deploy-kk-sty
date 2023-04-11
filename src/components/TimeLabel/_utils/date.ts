import format from "date-fns/format";

/**
 * Date 객체를 datetime 속성에 사용할 문자열로 변환합니다.
 *
 * @param date
 * @returns
 */
export function getDateTimeAttribute(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}
