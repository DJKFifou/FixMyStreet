import NavigationItem from "./navigation/NavigationItem";

const Navigation = () => {
  const items = [
    {
      title: "Accueil",
      icon: "home",
      href: "/",
    },
    // {
    //   title: "Carte",
    //   icon: "location_on",
    //   href: "/map",
    // },
    {
      title: "Signalements",
      icon: "shield",
      href: "/user/reports",
    },
    // {
    //   title: "Profil",
    //   icon: "account_circle",
    //   href: "/user/profile",
    // }
  ];

  return (
    <div className="w-full grow flex flex-col justify-end">
      <nav className="bg-background flex justify-around items-center px-7 pt-2 pb-7.5 shadow-t-sm">
        {items.map((item) => (
          <NavigationItem key={item.title} item={item} />
        ))}
      </nav>
    </div>
  );
}
export default Navigation;
