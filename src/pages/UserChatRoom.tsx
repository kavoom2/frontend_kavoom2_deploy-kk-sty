import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";

import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopAppBar headline="__채팅 사용자 이름__" />

      <MainContainer>{children}</MainContainer>
    </>
  );
};

export const Component = () => {
  const naviagte = useNavigate();

  return (
    <Layout>
      <button onClick={() => naviagte("/list")}>GO LIST</button>
    </Layout>
  );
};
