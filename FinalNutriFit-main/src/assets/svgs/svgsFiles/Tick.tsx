const Tick = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "12", height = "9", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0.166003L4.99649 8.84405C4.84786 9.01853 4.62458 9.05318 4.4383 8.91396C4.40082 8.8793 4.40082 8.8793 4.36318 8.84405L0.016462 3.47855C-0.0206976 3.4439 0.016462 3.40924 0.016462 3.40924C0.0534615 3.37459 0.0906211 3.40924 0.0906211 3.40924L4.62906 6.50636L11.814 0.0263294C11.851 -0.00877646 11.9256 -0.00877646 11.9626 0.0263294C12 0.0608351 12 0.130747 12 0.166003Z"
        fill={fill}
      />
    </svg>
  );
};
export default Tick;
