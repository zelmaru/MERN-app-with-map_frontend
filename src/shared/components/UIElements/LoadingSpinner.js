import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`spinner-wrap ${props.asOverlay && "spinner__overlay"}`}>
      <svg
        className="spinner"
        width="127"
        height="187"
        viewBox="0 0 680 1016"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="stroke"
          d="M629.132 337.328C629.132 375.127 617.964 422.516 596.783 477.591C575.81 532.122 546.222 591.156 512.159 651.406C458.124 746.981 394.689 842.469 339.547 925.193C290.285 851.298 228.86 758.356 174.697 663.058C139.292 600.763 107.707 538.674 85.0882 481.54C62.1571 423.619 50 374.597 50 337.328C50 178.952 179.331 50 339.566 50C499.801 50 629.132 178.952 629.132 337.328Z"
          stroke="#22B573"
          strokeWidth="25"
        />
      </svg>
      <h3 className="spinner__text">Loading...</h3>
    </div>
  );
};

export default LoadingSpinner;
