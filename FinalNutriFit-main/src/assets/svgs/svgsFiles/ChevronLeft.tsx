const ChevronLeft = (props: React.SVGAttributes<SVGElement>) => {
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
        d="M7.67505 0.641687C7.83061 0.836131 7.91325 1.05002 7.92297 1.28335C7.93269 1.51669 7.85005 1.72085 7.67505 1.89585L2.54172 7.02919L7.70422 12.1917C7.85978 12.3472 7.93269 12.5563 7.92297 12.8188C7.91325 13.0813 7.83061 13.2903 7.67505 13.4459C7.48061 13.6403 7.27158 13.7327 7.04797 13.7229C6.82436 13.7132 6.62505 13.6209 6.45005 13.4459L0.645887 7.64169C0.548665 7.54447 0.480609 7.44724 0.44172 7.35002C0.402831 7.2528 0.383387 7.14585 0.383387 7.02919C0.383387 6.91252 0.402831 6.80558 0.44172 6.70835C0.480609 6.61113 0.548665 6.51391 0.645887 6.41669L6.42089 0.641687C6.59589 0.466687 6.80005 0.384048 7.03339 0.393771C7.26672 0.403493 7.48061 0.486132 7.67505 0.641687Z"
        fill={fill}
      />
    </svg>
  );
};
export default ChevronLeft;
