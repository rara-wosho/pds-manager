import React from "react";

function GradientText({ children, textStyle }) {
  return <p className={`${textStyle} mb-0 gradient-text`}>{children}</p>;
}

export default GradientText;
