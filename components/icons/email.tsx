import React from "react";

interface EmailProps {
  className: string;
}

const Email: React.FC<EmailProps> = ({ className = "" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className={className}
      >
        <g>
          <path
            fill="#A67C52"
            d="M24,37c-0.187,0-0.373-0.052-0.537-0.156l-22-14c-0.304-0.193-0.48-0.536-0.462-0.896 c0.019-0.359,0.229-0.682,0.552-0.843L24,7l22.447,14.105c0.322,0.161,0.533,0.483,0.552,0.843c0.019,0.36-0.158,0.702-0.462,0.896 l-22,14C24.373,36.948,24.187,37,24,37z"
          ></path>{" "}
          <path
            fill="#E6E6E6"
            d="M39,38H9V2c0-0.552,0.448-1,1-1h28c0.552,0,1,0.448,1,1V38z"
          ></path>{" "}
          <path
            fill="#B28F77"
            d="M46,47c-0.084,0-0.169-0.011-0.252-0.032l-23-6L23,34l24-12v24c0,0.31-0.144,0.602-0.389,0.792 C46.435,46.928,46.219,47,46,47z"
          ></path>{" "}
          <path
            fill="#C19F85"
            d="M46,47H2c-0.553,0-1-0.448-1-1V22l45.479,23.122c0.401,0.219,0.604,0.682,0.49,1.125 C46.856,46.69,46.457,47,46,47z"
          ></path>{" "}
          <path
            fill="#B3B3B3"
            d="M32,10H16c-0.552,0-1-0.447-1-1s0.448-1,1-1h16c0.552,0,1,0.447,1,1S32.552,10,32,10z"
          ></path>{" "}
          <path
            fill="#B3B3B3"
            d="M32,17H16c-0.552,0-1-0.447-1-1s0.448-1,1-1h16c0.552,0,1,0.447,1,1S32.552,17,32,17z"
          ></path>{" "}
          <path
            fill="#B3B3B3"
            d="M25,24h-9c-0.552,0-1-0.447-1-1s0.448-1,1-1h9c0.552,0,1,0.447,1,1S25.552,24,25,24z"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Email;