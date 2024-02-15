const EyeHide = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "21", height = "20", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_231_2358)">
        <path
          d="M11.7829 11.7673C11.554 12.013 11.278 12.21 10.9714 12.3466C10.6647 12.4832 10.3336 12.5567 9.99797 12.5626C9.6623 12.5686 9.32887 12.5068 9.01757 12.3811C8.70628 12.2553 8.4235 12.0682 8.1861 11.8308C7.94871 11.5934 7.76156 11.3106 7.63582 10.9993C7.51008 10.688 7.44834 10.3546 7.45426 10.0189C7.46018 9.68325 7.53365 9.35221 7.67029 9.04554C7.80693 8.73888 8.00394 8.46288 8.24956 8.23401M14.9662 14.9507C13.5417 16.0365 11.8072 16.6381 10.0162 16.6673C4.1829 16.6673 0.849564 10.0007 0.849564 10.0007C1.88614 8.06892 3.32384 6.38118 5.06623 5.05067L14.9662 14.9507ZM8.26623 3.53401C8.83984 3.39974 9.42712 3.33262 10.0162 3.33401C15.8496 3.33401 19.1829 10.0007 19.1829 10.0007C18.677 10.947 18.0738 11.838 17.3829 12.659L8.26623 3.53401Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.849564 0.833984L19.1829 19.1673"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_231_2358">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.0162354)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default EyeHide;
