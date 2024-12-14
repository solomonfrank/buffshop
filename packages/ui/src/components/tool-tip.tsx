"use client";

import { Tooltip } from "react-tooltip";

export const ToolTip = ({ content, id }: { content: string; id: string }) => {
  return (
    <Tooltip
      anchorSelect={`#${id}`}
      border='1px solid #000000'
      place='top'
      positionStrategy='fixed'
      style={{
        backgroundColor: "#ffffff",
        zIndex: "1000",
        color: "#000000",
        fontSize: "12px",
      }}
    >
      {content}
    </Tooltip>
  );
};
