interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

function Button({
  text,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
