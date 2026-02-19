const PrimaryButton = ({
  type = 'button',
  disabled = false,
  children,
}: {
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type={type}
    className="w-full border border-foreground bg-foreground text-white rounded-md p-2"
    disabled={disabled}
  >
    {children}
  </button>
);

export default PrimaryButton;
