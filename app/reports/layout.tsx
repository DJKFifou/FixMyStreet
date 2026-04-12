import BackLinkHeader from "@/components/ui/BackLinkHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-24 px-4">
      <BackLinkHeader href="/" title="Historique des signalements" />
      <div className="mt-24">
        <h1 className="w-full text-center text-3xl leading-10 mb-6.5">
          Mes signalements
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
