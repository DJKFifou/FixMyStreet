'use client';

import IconInput from './IconInput';
import { useState } from 'react';

const PasswordInput = (
  {
    id, placeholder, required = false, label, value, onChange
  }: {
    id?: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
) => {
  const [hidden, setHidden] = useState(true);

  return (
    <IconInput
      id={id}
      type={hidden ? "password" : "text"}
      placeholder={placeholder}
      label={label}
      required={required}
      value={value}
      onChange={onChange}
      icon={hidden ? "visibility_off" : "visibility"}
      onIconClick={() => setHidden(!hidden)}
    />
  );
};

export default PasswordInput;
