'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Redirector = ({
  href,
  time = 3,
  additionalClasses = '',
}: {
  href: string;
  time?: number;
  additionalClasses?: string;
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      router.push(href);
    }
  }, [timer, href, router]);

  return <p className={additionalClasses}>Vous allez être redirigé dans {timer} {timer === 1 ? 'seconde' : 'secondes'}...</p>;
};

export default Redirector;
