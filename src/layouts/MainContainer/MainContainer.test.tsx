import { render } from "@testing-library/react";
import MainContainer from "./MainContainer";

describe("MainContainer", () => {
  it("main 요소를 렌더링해야 합니다.", () => {
    const { container } = render(<MainContainer />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("main 요소의 id는 layout-main이어야 합니다.", () => {
    const { container } = render(<MainContainer />);
    expect(container.querySelector("main#layout-main")).toBeInTheDocument();
  });
});
