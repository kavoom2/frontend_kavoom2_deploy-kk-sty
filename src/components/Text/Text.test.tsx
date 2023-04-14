import { render } from "@testing-library/react";
import Text from "./Text";

describe("Text", () => {
  it("tagAs는 렌더링할 태그를 나타내는 문자열이어야 합니다.", () => {
    const { getByText, getByRole, rerender } = render(
      <Text tagAs="h1">Hello</Text>,
    );

    expect(getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(getByText("Hello")).toBeInTheDocument();

    rerender(<Text tagAs="h2">Bye</Text>);
    expect(getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(getByText("Bye")).toBeInTheDocument();
  });

  it("maxLines는 최대 줄 수를 나타내는 숫자이어야 합니다.", () => {
    const { getByRole, rerender } = render(
      <Text tagAs="h1" maxLines={1}>
        Hello
      </Text>,
    );
    expect(getByRole("heading", { level: 1 })).toHaveClass("ellipsis-single");

    rerender(
      <Text tagAs="h1" maxLines={2}>
        Hello
      </Text>,
    );
    expect(getByRole("heading", { level: 1 })).toHaveClass("ellipsis-multiple");
    expect(getByRole("heading", { level: 1 })).toHaveStyle(
      "--text-max-lines: 2",
    );
  });
});
