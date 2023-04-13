import classNames from "classnames";
import { motion } from "framer-motion";
import styles from "./CollapsableSubBar.module.scss";

export interface CollapsableSubBarProps {
  children?: React.ReactNode;
  className?: string;
}

const CollapsableSubBar: React.FC<CollapsableSubBarProps> = ({
  children,
  className,
  ...props
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <motion.div
      {...props}
      initial="closed"
      animate="open"
      exit="closed"
      className={mainClassNames}
      variants={{
        open: {
          height: "auto",
          transition: {
            duration: 0.3,
            ease: "anticipate",
          },
        },
        closed: {
          height: 0,
          transition: {
            duration: 0.2,
            ease: "anticipate",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default CollapsableSubBar;
