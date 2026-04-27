"use client";

import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ReportFormData } from "@/app/types";
import { reportCategoryMapper } from "@/lib/utils/db";
import ReportLocation from "./report-cards/ReportLocation";

interface ReportFormSummaryProps {
    data: ReportFormData;
    onBack: () => void;
    onConfirm: () => void;
}

const ReportFormSummary = ({ data, onBack, onConfirm }: ReportFormSummaryProps) => {
    const getCategoryName = (cat: ReportFormData["category"]) => {
        const key = String(cat);
        return reportCategoryMapper[key as keyof typeof reportCategoryMapper] ?? key;
    };

    return (
        <div className="flex flex-col gap-6 pb-56 overflow-x-hidden px-4 max-w-2xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-semibold">Résumé de votre signalement</h1>
                <p className="text-gray-500 mt-2">
                    Vérifiez les informations avant validation.
                </p>
            </div>

            <div className="grid gap-4 min-w-0">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Catégorie</p>
                    <p className="text-base font-medium">{getCategoryName(data.category)}</p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-base text-gray-700 whitespace-pre-line">
                        {data.description || "Aucune description fournie."}
                    </p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Localisation</p>
                    {data.lat !== null && data.lon !== null ? (
                        <ReportLocation lat={data.lat} lon={data.lon} />
                    ) : (
                        <p className="text-base text-gray-700">Aucune localisation définie.</p>
                    )}
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Photo</p>
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
            </div>

            <div className="fixed bottom-30 left-0 w-full px-4 grid gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                    Modifier mon signalement
                </button>
                <PrimaryButton type="button" onClick={onConfirm}>
                    Valider mon signalement
                </PrimaryButton>
            </div>
        </div>
    );
};

export default ReportFormSummary;
