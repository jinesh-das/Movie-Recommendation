import React from "react";

const CircularProgressBar = ({ size, progress, strokeWidth }) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="circular-progress">
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#423D0F"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#D2D531"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.2em"
        fill="white"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
