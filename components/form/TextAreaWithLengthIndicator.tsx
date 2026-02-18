const TextAreaWithLengthIndicator = (
  {
    label, value, maxLength, onChange
  }: {
    label: string;
    value?: string;
    maxLength: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }
) => {
  return (
    <label className="relative flex flex-col gap-2 text-lg text-gray-600">
      {label}
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Décrivez le problème ou la situation que vous avez rencontré. Indiquez le lieu."
        className="w-full border border-foreground rounded-md p-2"
        rows={3}
        maxLength={maxLength}
      />
      <span className="w-full text-sm text-gray-500 text-end">
        {value?.length ?? 0}/{maxLength}
      </span>
    </label>
  );
};

export default TextAreaWithLengthIndicator;
