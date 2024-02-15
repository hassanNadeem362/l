const User = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "28", height = "28", fill = "currentColor", ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M23.3334 24.5V22.1667C23.3334 20.929 22.8417 19.742 21.9666 18.8668C21.0914 17.9917 19.9044 17.5 18.6667 17.5H9.33342C8.09574 17.5 6.90875 17.9917 6.03358 18.8668C5.15841 19.742 4.66675 20.929 4.66675 22.1667V24.5"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default User;
