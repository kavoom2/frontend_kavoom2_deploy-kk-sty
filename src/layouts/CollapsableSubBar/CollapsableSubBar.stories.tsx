import MainContainer from "@/layouts/MainContainer";
import { withKnobs } from "@storybook/addon-knobs";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import CollapsableSubBar from "./CollapsableSubBar";

const Documentation = {
  title: "Component/Layout/CollapsableSubBar",
  component: CollapsableSubBar,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  const [isSubBarOpen, updateIsSubBarOpen] = useState(false);

  return (
    <AnimatePresence exitBeforeEnter>
      {isSubBarOpen && (
        <CollapsableSubBar key="sub-bar">
          <div style={{ height: "120px" }}>HI!</div>
        </CollapsableSubBar>
      )}

      <MainContainer>
        <button onClick={() => updateIsSubBarOpen((prev) => !prev)}>
          TOGGLE SUBBAR!
        </button>
      </MainContainer>
    </AnimatePresence>
  );
};
