import Link from "next/link";

const SecondaryLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="block text-center w-full border border-foreground rounded-md p-2"
    >
      {children}
    </Link>
  );
};

export default SecondaryLink;
