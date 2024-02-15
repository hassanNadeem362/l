const Notification = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "22", height = "21", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0787 14.1094L16.4225 13.125C15.3725 11.55 14.8475 9.64688 14.8475 7.74375C14.8475 5.70938 13.535 4.00313 11.7631 3.47813C11.5662 2.95313 11.0412 2.625 10.5162 2.625C9.99125 2.625 9.46625 2.95313 9.26937 3.47813C7.4975 4.00313 6.185 5.70938 6.185 7.74375C6.185 9.64688 5.66 11.55 4.61 13.125L3.95375 14.1094C3.69125 14.5687 3.95375 15.0938 4.47875 15.0938H16.4881C17.0131 15.0938 17.3412 14.5031 17.0787 14.1094Z"
        stroke={fill}
        strokeWidth="1.3"
        stroke-miterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M12.485 17.0625C12.485 18.1781 11.6319 19.0312 10.5162 19.0312C9.40061 19.0312 8.54749 18.1781 8.54749 17.0625"
        stroke={fill}
        strokeWidth="1.3"
        stroke-miterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default Notification;
