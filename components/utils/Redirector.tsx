'use client';

import { useEffect, useState } from "react";

const Redirector = ({
  action,
  time = 3,
  additionalClasses = '',
}: {
  action: () => void;
  time?: number;
  additionalClasses?: string;
}) => {
  const [timer, setTimer] = useState<number>(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      action();
    }
  }, [timer, action]);

  return <p className={additionalClasses}>Vous allez être redirigé dans {timer} {timer === 1 ? 'seconde' : 'secondes'}...</p>;
};

export default Redirector;
