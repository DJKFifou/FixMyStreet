const PrimaryButton = ({
  type = "button",
  disabled = false,
  children,
  onClick,
}: {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    type={type}
    className="w-full border border-foreground bg-foreground text-white rounded-md p-2 cursor-pointer"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default PrimaryButton;
