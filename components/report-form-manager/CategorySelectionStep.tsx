
import Image from "next/image";
import PrimaryButton from "../ui/PrimaryButton";
import { reportCategoryMapper } from "@/lib/utils/db";
import type { ReportCategories } from "@/app/types";

interface CategoriesSelectionProps {
    onCategorySelect: (category: ReportCategories) => void;
}

export default function CategorySelectionStep({ onCategorySelect }: CategoriesSelectionProps) {
    return (
        <div className="flex flex-col gap-5 pb-32">
            <div className="relative flex items-center justify-center space-x-1 mb-7">
                <Image
                    src="/logo-fixmystreet-bleu.png"
                    width={90}
                    height={90}
                    alt="Logo FixMyStreet"
                />
                <span className="font-grotesk font-bold text-theme-blue text-3xl">
                    FixMyStreet
                </span>
            </div>
            <h1 className="w-full text-center text-3xl leading-10 mb-6.5">Choisissez une catégorie</h1>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto ">
                {Object.entries(reportCategoryMapper).map(([key, value]) => (
                    <PrimaryButton
                        key={key}
                        type="button"
                        onClick={() => onCategorySelect(key as ReportCategories)}
                        classes="h-32 p-4"
                    >
                        <h2 className="text-sm
                         font-medium text-center leading-tight">{value}</h2>
                    </PrimaryButton>
                ))}
            </div>
        </div>
    );
}