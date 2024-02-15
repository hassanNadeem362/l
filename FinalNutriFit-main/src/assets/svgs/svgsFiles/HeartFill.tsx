const HeartFill = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "18", height = "16", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9504 2.14195C14.2718 -1.33564 9.00034 0.716351 9.00034 4.24794C9.00034 0.716351 3.72852 -1.33581 1.04958 2.14195C-1.71918 5.73724 1.0098 12.0353 9.00017 15.6531C16.9902 12.0353 19.7191 5.73724 16.9504 2.14195Z"
        fill={fill}
      />
    </svg>
  );
};
export default HeartFill;
