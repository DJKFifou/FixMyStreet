import BackLinkHeader from "@/components/ui/BackLinkHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-24">
      <BackLinkHeader
        href="/user/reports"
        title="Détails de votre signalement"
      />
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default Layout;
