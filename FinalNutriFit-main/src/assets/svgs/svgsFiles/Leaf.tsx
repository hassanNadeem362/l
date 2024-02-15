const Leaf = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "30", height = "30", fill = "currentColor" } = props;
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 25 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Replace the path with the SVG code of the joining icon */}
    <path
       d="M9.33502 11.102C8.58403 10.507 7.76003 10.2 6.83503 10.2C4.42003 10.2 2.5 12.12 2.5 14.535C2.5 15.147 2.631 15.721 2.87403 16.216C3.74603 17.794 5.38903 18.9 7.33502 18.9H16.15C17.602 18.9 18.844 18.204 19.65 17.121C20.391 16.104 20.75 14.835 20.75 13.45V12.15C20.75 9.335 18.415 7 15.6 7H14.735C13.46 7 12.273 7.309 11.315 7.815C10.848 8.026 10.533 8.468 10.399 9.008C10.319 9.38 10.484 9.784 10.883 10.202C11.452 10.779 11.757 11.533 11.757 12.375C11.757 13.356 11.215 14.25 10.334 14.727C9.88403 14.979 9.41302 15.112 8.94503 15.112C8.20503 15.112 7.56003 14.875 7.05002 14.456C6.60002 14.086 6.25 13.6 6.25 13.1C6.25 12.561 6.62202 12.15 7.11303 12.15C7.35203 12.15 7.56703 12.23 7.73703 12.355C7.95803 12.513 8.17902 12.814 8.38002 13.284C8.46003 13.44 8.67202 13.75 8.94503 14.049C9.71503 14.812 10.819 15.85 12.2 16.25V13.45C12.2 13.048 12.549 12.7 13.05 12.7H15.6C17.065 12.7 18.25 13.885 18.25 15.35V15.67C18.25 16.605 18.085 17.586 17.759 18.511C17.592 18.991 17.358 19.403 17.041 19.708C16.317 20.39 15.29 20.8 14.17 20.8H7.33503C5.44502 20.8 3.86203 19.207 3.86203 17.317V14.535C3.86203 13.968 4.31903 13.5 4.89203 13.5C5.15603 13.5 5.40703 13.6 5.61503 13.742C5.95603 13.95 6.25 14.3 6.25 14.741V16.25C6.25 16.488 6.41203 16.7 6.64903 16.7H7.33503C8.96102 16.7 10.25 15.411 10.25 13.785C10.25 13.359 10.113 12.983 9.87703 12.692C9.26702 12.027 9.00903 11.381 9.33502 11.102Z"
            fill={fill}
    />
  </svg>
  );
};
export default Leaf;