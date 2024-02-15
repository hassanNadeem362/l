const Info = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "22", height = "22", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke={fill}
        stroke-opacity="0.57"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 15V11"
        stroke={fill}
        stroke-opacity="0.57"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="8" r="1" fill={fill} fillOpacity="0.57" />
    </svg>
  );
};
export default Info;
