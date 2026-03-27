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
    <div className="fixed bottom-0 left-0 w-full flex flex-col justify-center p-3">
      <nav className="bg-theme-black flex justify-around items-center px-7 pt-4 pb-7.5 shadow-t-sm rounded-lg">
        {items.map((item) => (
          <NavigationItem key={item.title} item={item} />
        ))}
      </nav>
    </div>
  );
}
export default Navigation;
