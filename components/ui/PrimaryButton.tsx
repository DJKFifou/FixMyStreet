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
    className={`w-full border border-foreground bg-foreground text-white rounded-md p-2 cursor-pointer ${classes}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default PrimaryButton;
