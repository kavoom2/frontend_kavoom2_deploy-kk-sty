import { render } from "@testing-library/react";
import TopAppBar from "./TopAppBar";

describe("TopAppBar", () => {
  it("header 요소를 렌더링해야 합니다.", () => {
    const { container } = render(<TopAppBar />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("header 요소의 id는 layout-primary-header이어야 합니다.", () => {
    const { container } = render(<TopAppBar />);

    expect(
      container.querySelector("header#layout-primary-header"),
    ).toBeInTheDocument();
  });

  it("headline은 h1 태그로 렌더링되어야 합니다.", () => {
    const { getByText } = render(<TopAppBar headline="HEADING" />);

    const headline = getByText("HEADING");
    expect(headline.tagName).toBe("H1");
  });
});
