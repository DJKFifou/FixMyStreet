import Link from "next/link";

const NavigationItem = (
  {
    item
  }: {
    item: {
      title: string;
      icon: string;
      href: string;
    }
  }
) => (
  <Link href={item.href} className="flex flex-col items-center gap-2">
    <span className="material-symbols-outlined">{item.icon}</span>
    <span className="text-sm leading-4.5">{item.title}</span>
  </Link>
);

export default NavigationItem;
