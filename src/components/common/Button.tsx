import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  color: string;
  size?: string;
  className?: string;
  onClick?: (e: any) => void;
  link?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({
  children,
  color,
  size,
  className = "",
  onClick,
  link,
  disabled = false,
  type,
}: Props) {
  return (
    <>
      {!link ? (
        <button
          className={`btn btn-${color} btn-${size} ${className}`}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {children}
        </button>
      ) : (
        <Link to={link} className={`btn btn-${color} btn-${size} ${className}`}>
          {children}
        </Link>
      )}
    </>
  );
}

export default Button;
