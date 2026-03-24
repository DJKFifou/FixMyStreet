import Link from "next/link";

const SecondaryLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="block text-center text-theme-blue w-full border border-theme-blue rounded-lg p-2 active:scale-105 active:bg-theme-blue active:text-white

      transition-all duration-150 ease-out"
    >
      {children}
    </Link>
  );
};

export default SecondaryLink;
