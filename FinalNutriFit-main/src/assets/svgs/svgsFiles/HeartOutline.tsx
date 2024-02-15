const HeartOutline = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "17", height = "15", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.14124 7.50051C0.547485 5.37551 1.07874 2.18801 3.73499 1.12551C6.39124 0.0630139 7.98499 2.18801 8.51624 3.25051C9.04749 2.18801 11.1725 0.0630139 13.8287 1.12551C16.485 2.18801 16.485 5.37551 14.8912 7.50051C13.2975 9.62551 8.51624 13.8755 8.51624 13.8755C8.51624 13.8755 3.73499 9.62551 2.14124 7.50051Z"
        stroke={fill}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default HeartOutline;
