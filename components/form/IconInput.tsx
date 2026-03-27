const IconInput = ({
  id,
  type = "text",
  placeholder,
  required = false,
  label,
  value,
  onChange,
  icon,
  onIconClick,
}: {
  id?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  onIconClick?: () => void;
}) => {
  return (
    <label
      className="relative flex flex-col gap-2 text-sm text-gray-600"
      htmlFor="password"
    >
      {label}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="border border-theme-lightBlack rounded-md p-2 outline-none focus:outline-none focus:border-theme-blue focus:ring-1 focus:ring-theme-blue"
      />
      {icon && (
        <span
          className="absolute bottom-1.5 right-2 material-symbols-outlined"
          onClick={onIconClick}
        >
          {icon}
        </span>
      )}
    </label>
  );
};

export default IconInput;
