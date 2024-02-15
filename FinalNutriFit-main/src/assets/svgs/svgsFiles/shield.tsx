const Shield = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "7", height = "7", fill = "currentColor" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.140015 1.15629V1.26003C0.140015 3.46741 1.31125 5.55173 3.19691 6.69945L3.50001 6.88383L3.80311 6.69931C5.68877 5.55173 6.86001 3.46741 6.86001 1.26003V1.15629L3.50001 0.133728L0.140015 1.15629ZM3.65765 6.46033L3.50001 6.55623L3.34237 6.46033C1.56927 5.38093 0.456835 3.43535 0.420995 1.36349L3.50001 0.426328L6.57903 1.36335C6.54319 3.43535 5.43075 5.38093 3.65765 6.46033Z" fill={fill}/>
      <path d="M2.199 3.54102L2.00104 3.73898L3.08002 4.81796L5.839 2.05898L5.64104 1.86102L3.08002 4.42204L2.199 3.54102Z" fill={fill}/>
    </svg>
  );
};
export default Shield;
