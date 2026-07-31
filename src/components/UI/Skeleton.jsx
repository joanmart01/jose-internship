import React from "react";
import "../../css/skeletons.css";

const Skeleton = ({ width, height, borderRadius, additionalClasses }) => {
  
  additionalClasses += " skeleton-box";

  return (
    <div
    className={additionalClasses}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
    </div>
  );
};

export default Skeleton;
