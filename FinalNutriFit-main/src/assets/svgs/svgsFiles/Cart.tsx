const Cart = (props: React.SVGAttributes<SVGElement>) => {
  const { width = "30", height = "30", fill = "currentColor" , ...rest} = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M9.37492 22.9166C9.95022 22.9166 10.4166 22.4502 10.4166 21.8749C10.4166 21.2996 9.95022 20.8333 9.37492 20.8333C8.79962 20.8333 8.33325 21.2996 8.33325 21.8749C8.33325 22.4502 8.79962 22.9166 9.37492 22.9166Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8334 22.9166C21.4087 22.9166 21.8751 22.4502 21.8751 21.8749C21.8751 21.2996 21.4087 20.8333 20.8334 20.8333C20.2581 20.8333 19.7917 21.2996 19.7917 21.8749C19.7917 22.4502 20.2581 22.9166 20.8334 22.9166Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.04175 1.04175H5.20841L8.00008 14.9897C8.09534 15.4692 8.35624 15.9 8.73711 16.2066C9.11798 16.5132 9.59456 16.6761 10.0834 16.6667H20.2084C20.6973 16.6761 21.1738 16.5132 21.5547 16.2066C21.9356 15.9 22.1965 15.4692 22.2917 14.9897L23.9584 6.25008H6.25008"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default Cart;
