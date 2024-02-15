const ArrowUp = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "7", height = "13", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.67171 4.25888V12.0027C2.67171 12.1726 2.81279 12.3104 2.9868 12.3104H4.45724C4.63125 12.3104 4.77233 12.1726 4.77233 12.0027V4.25888H5.98174C6.54318 4.25888 6.82435 3.59588 6.42736 3.2081L4.16764 1.00097C3.92153 0.760582 3.52252 0.760582 3.27643 1.00097L1.01671 3.2081C0.619718 3.59586 0.900886 4.25888 1.46233 4.25888H2.67171Z"
        fill={fill}
      />
    </svg>
  );
};
export default ArrowUp;
