import styles from "./MainContainer.module.scss";

export interface MainContainerProps {
  children?: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <main id="layout-main" className={styles.main}>
      {children}
    </main>
  );
};

export default MainContainer;
