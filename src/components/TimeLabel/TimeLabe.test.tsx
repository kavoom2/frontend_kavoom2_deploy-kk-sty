import { render } from "@testing-library/react";
import TimeLabel from "./TimeLabel";

describe("TimeLabel", () => {
  it("date는 Date 객체, 문자열, 숫자를 받을 수 있어야 합니다.", () => {
    const { rerender } = render(<TimeLabel date={new Date()} />);
    rerender(<TimeLabel date="2021-01-01" />);
    rerender(<TimeLabel date={1610899200000} />);
  });

  it("날짜에 따라 올바른 날짜 라벨이 표시되어야 합니다.", () => {
    let date = new Date();
    const { getByText, rerender } = render(<TimeLabel date={date} />);
    expect(getByText("1분 미만 전")).toBeInTheDocument();

    date.setMinutes(date.getMinutes() - 30);
    rerender(<TimeLabel date={date} />);
    expect(getByText("30분 전")).toBeInTheDocument();

    date = new Date();
    date.setHours(date.getHours() - 1);
    rerender(<TimeLabel date={date} />);
    expect(getByText("약 1시간 전")).toBeInTheDocument();

    date = new Date();
    date.setDate(date.getDate() - 1);
    rerender(<TimeLabel date={date} />);
    expect(getByText("1일 전")).toBeInTheDocument();

    date = new Date();
    date.setDate(date.getDate() - 6);
    rerender(<TimeLabel date={date} />);
    expect(getByText("6일 전")).toBeInTheDocument();

    date.setFullYear(1900, 0, 1);
    rerender(<TimeLabel date={date} />);
    expect(getByText("1900년 1월 1일")).toBeInTheDocument();
  });
});
