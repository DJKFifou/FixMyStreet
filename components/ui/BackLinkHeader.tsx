import Link from "next/link";
import BackHeader, { Content, contentWrapperClasses } from "./BackHeader";

interface BackLinkHeaderProps {
  href: string;
  title: string;
}

const BackLinkHeader = ({ href, title }: BackLinkHeaderProps) => (
  <BackHeader>
    <Link href={href} className={contentWrapperClasses}>
      <Content title={title} />
    </Link>
  </BackHeader>
);

export default BackLinkHeader;
