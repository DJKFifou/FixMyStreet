const PrimaryButton = ({
  type = "button",
  disabled = false,
  classes = "",
  children,
  onClick,
}: {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  classes?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    type={type}
    className={`w-full border border-theme-blue bg-theme-blue text-white rounded-lg p-2 cursor-pointer active:scale-105 active:bg-theme-darkBlue
      transition-all duration-150 ease-out ${classes}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default PrimaryButton;
