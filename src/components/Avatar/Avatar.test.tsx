import { render } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  const userName = "John Doe";
  const userSrc = "https://avatars.githubusercontent.com/u/22580992?v=4";

  it("name은 아바타의 사용자 이름을 나타내는 Alt 문자열이어야 합니다.", () => {
    const { getByAltText } = render(<Avatar name={userName} src={userSrc} />);

    expect(getByAltText(userName)).toBeInTheDocument();
  });

  it("src는 아바타의 이미지를 나타내는 문자열이어야 합니다.", () => {
    const { getByAltText } = render(<Avatar name={userName} src={userSrc} />);

    const image = getByAltText(userName);
    expect(image).toHaveAttribute("src", userSrc);
  });
});
