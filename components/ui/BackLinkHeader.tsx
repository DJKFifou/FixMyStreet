import Link from "next/link";

const BackLinkHeader = ({ href, title }: { href: string; title: string }) => (
  <div className="fixed top-0 left-0 w-full bg-theme-blue text-theme-offWhite flex items-center pt-7 pb-8 px-5 z-50">
    <Link href={href} className="text-xl leading-4.5 flex items-center gap-2">
      <span className="material-symbols-outlined">arrow_back</span>
      {title}
    </Link>
  </div>
);

export default BackLinkHeader;
