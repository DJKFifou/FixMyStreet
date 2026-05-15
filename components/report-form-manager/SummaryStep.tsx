
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ReportFormData } from "@/app/types";
import { reportCategoryMapper } from "@/lib/utils/db";
import ReportLocation from "../report-cards/ReportLocation";
import BackHeader, { Content, contentWrapperClasses } from "../ui/BackHeader";
import Recap from "../ui/Recap";


interface SummaryStepProps {
    data: ReportFormData;
    onBack: () => void;
    onConfirm: () => void;

}

const SummaryStep = ({ data, onBack, onConfirm }: SummaryStepProps) => (
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
            <Recap title="Catégorie">
                {reportCategoryMapper[data.category]}
            </Recap>

            <Recap title="Localisation">
                <ReportLocation lat={data.lat!} lon={data.lon!} showIcon={false} />
            </Recap>

            <Recap title="Photo">
                <Image
                    src={data.image_url}
                    alt="Photo descriptive du sujet du signalement"
                    width={400}
                    height={192}
                    className="w-full h-48 object-contain rounded-md"
                />
            </Recap>

            <Recap title="Description">
                {data.description || "Aucune description fournie."}
            </Recap>
        </div>

        <div className="fixed bottom-30 left-0 w-full px-4 grid gap-3">
            <PrimaryButton type="button" onClick={onConfirm}>
                Valider mon signalement
            </PrimaryButton>
        </div>
    </div>
);

export default SummaryStep;
