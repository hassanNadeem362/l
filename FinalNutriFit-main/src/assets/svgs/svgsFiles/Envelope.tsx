const Envelope = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "18", height = "15", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5385 13.9849H3.46154C2.10769 13.9849 1 12.9225 1 11.624V3.36089C1 2.0624 2.10769 1 3.46154 1H14.5385C15.8923 1 17 2.0624 17 3.36089V11.624C17 12.9225 15.8923 13.9849 14.5385 13.9849Z"
        stroke={fill}
        strokeOpacity="0.28"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 3.95117L9 8.67295L17 3.95117"
        stroke={fill}
        strokeOpacity="0.28"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default Envelope;
