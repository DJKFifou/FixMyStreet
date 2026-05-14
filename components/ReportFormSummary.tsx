
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ReportFormData } from "@/app/types";
import { reportCategoryMapper } from "@/lib/utils/db";
import ReportLocation from "./report-cards/ReportLocation";
import BackHeader, { Content, contentWrapperClasses } from "./ui/BackHeader";


interface ReportFormSummaryProps {
    data: ReportFormData;
    onBack: () => void;
    onConfirm: () => void;

}

const ReportFormSummary = ({ data, onBack, onConfirm }: ReportFormSummaryProps) => {
    const getCategoryName = (cat: ReportFormData["category"]) => {
        return reportCategoryMapper[cat as keyof typeof reportCategoryMapper];
    };

    return (
        <div className="flex flex-col gap-6 pt-12 pb-50 overflow-x-hidden px-4 max-w-2xl mx-auto">
            <BackHeader>
                <button onClick={onBack} className={contentWrapperClasses}>
                    <Content title="Modifier mon signalement" />
                </button>
            </BackHeader>
            <div className="text-center">
                <h1 className="text-3xl font-semibold">Résumé du signalement</h1>
                <p className="text-gray-500 mt-2">
                    Vérifiez les informations avant validation.
                </p>
            </div>

            <div className="grid gap-4 min-w-0">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm font-medium mb-1">Catégorie :</p>
                    <p className="text-base text-gray-700 whitespace-pre-linefont-medium">{getCategoryName(data.category)}</p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm font-medium mb-1">Localisation :</p>
                    <ReportLocation lat={data.lat!} lon={data.lon!} showIcon={false} />
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm font-medium mb-1">Photo :</p>
                    {data.image_url ? (
                        <Image
                            src={data.image_url}
                            alt="Aperçu de la photo"
                            width={400}
                            height={192}
                            className="w-full h-48 object-contain rounded-md"
                        />
                    ) : (
                        <p className="text-base text-gray-700">Aucune image ajoutée.</p>
                    )}
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm font-medium mb-1">Description :</p>
                    <p className="text-base text-gray-700 whitespace-pre-line">
                        {data.description || "Aucune description fournie."}
                    </p>
                </div>
            </div>

            <div className="fixed bottom-30 left-0 w-full px-4 grid gap-3">
                <PrimaryButton type="button" onClick={onConfirm}>
                    Valider mon signalement
                </PrimaryButton>
            </div>
        </div>
    );
};

export default ReportFormSummary;
