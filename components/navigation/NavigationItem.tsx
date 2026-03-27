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
    <span className="material-symbols-outlined text-white active:scale-110 transition-transform">{item.icon}</span>
    <span className="text-sm text-white leading-4.5 active:scale-110 transition-transform">{item.title}</span>
  </Link>
);

export default NavigationItem;
