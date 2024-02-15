const Facebook = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "8", height = "14", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.47581 7.83411L7.85314 5.43255H5.49388V3.87411C5.49388 3.21709 5.82345 2.57666 6.88009 2.57666H7.95265V0.531997C7.95265 0.531997 6.97933 0.369751 6.04873 0.369751C4.10581 0.369751 2.83583 1.51999 2.83583 3.60223V5.43255H0.676117V7.83411H2.83583V13.6397H5.49388V7.83411H7.47581Z"
        fill={fill}
      />
    </svg>
  );
};
export default Facebook;
