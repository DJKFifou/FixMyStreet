import ReportCards from "@/components/ReportCards";
import BackLinkHeader from "@/components/ui/BackLinkHeader";

const ReportsPage = () => {
  return (
    <div>
      <BackLinkHeader href="/" title="Historique des signalements" />
      <div className="mt-12">
        <h1 className="w-full text-center text-3xl leading-10 mb-6.5">Mes signalements</h1>
        <ReportCards />
      </div>
    </div>
  );
}

export default ReportsPage;
