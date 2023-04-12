import { Oval } from "react-loader-spinner";
import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  return (
    <div className={styles.main}>
      <Oval
        height={60}
        width={60}
        strokeWidth={4}
        strokeWidthSecondary={4}
        color="#5b36ac"
        secondaryColor="white"
        wrapperClass={styles.spinner}
      />
    </div>
  );
};

export default PageLoader;
