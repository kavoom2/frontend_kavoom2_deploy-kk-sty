import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";

import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopAppBar headline="채팅" />

      <MainContainer>{children}</MainContainer>
    </>
  );
};

export const Component = () => {
  const naviagte = useNavigate();

  return (
    <Layout>
      <button onClick={() => naviagte("/room/123")}>GO ROOM</button>
    </Layout>
  );
};
