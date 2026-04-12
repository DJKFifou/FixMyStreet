import ReportDetails from "@/components/report-cards/ReportDetails";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ReportDetails id={id} />;
}
