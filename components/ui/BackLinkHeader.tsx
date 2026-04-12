import Link from "next/link";
import BackHeader, { Content, contentWrapperClasses } from "./BackHeader";

interface BackLinkHeaderProps {
  href?: string;
  title: string;
  onClick?: () => void;
}

const BackLinkHeader = ({ href, title, onClick }: BackLinkHeaderProps) => (
  <BackHeader>
    {href ? (
      <Link href={href} className={contentWrapperClasses}>
        <Content title={title} />
      </Link>
    ) : (
      <Content title={title} onClick={onClick} />
    )}
  </BackHeader>
);

export default BackLinkHeader;
