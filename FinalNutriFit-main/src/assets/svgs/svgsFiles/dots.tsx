const Dots = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "20", height = "4", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" fill={fill}/>
      <circle cx="10" cy="2" r="2" fill={fill}/>
      <circle cx="18" cy="2" r="2" fill={fill}/>
    </svg>
  );
};
export default Dots;
