const Upload = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "13", height = "12", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_231_2336)">
        <path
          d="M10.5162 7.5V9.5C10.5162 9.76522 10.4109 10.0196 10.2233 10.2071C10.0358 10.3946 9.78145 10.5 9.51624 10.5H2.51624C2.25102 10.5 1.99666 10.3946 1.80913 10.2071C1.62159 10.0196 1.51624 9.76522 1.51624 9.5V7.5"
          stroke={fill}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.51624 4L6.01624 1.5L3.51624 4"
          stroke={fill}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.01624 1.5V7.5"
          stroke={fill}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_231_2336">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="translate(0.0162354)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Upload;
