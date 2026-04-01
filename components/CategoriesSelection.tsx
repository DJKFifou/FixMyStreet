import MandatoryAsterisk from "./ui/MandatoryAsterisk";
import Image from "next/image";

const categories = [
    { id: "voirie", name: "Dégât sur la voie" },
    { id: "signalisation", name: "Problème de signalisation" },
    { id: "eclairage", name: "Éclairage défectueux" },
    { id: "encombrement", name: "Encombrements / Voie bloquée" },
];

interface CategoriesSelectionProps {
    onCategorySelect: (category: string) => void;
}

export default function CategoriesSelection({ onCategorySelect }: CategoriesSelectionProps) {
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
            <h1 className="w-full text-center text-3xl leading-10 mb-6.5">Choisissez une catégorie<MandatoryAsterisk /></h1>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto ">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category.id)}
                        className="flex flex-col items-center justify-center h-32 border border-theme-blue bg-theme-blue text-white rounded-lg p-4 cursor-pointer active:scale-105 active:bg-theme-darkBlue transition-all duration-150 ease-out hover:bg-theme-darkBlue shadow-t-sm"
                    >
                        <h2 className="text-sm font-medium text-center leading-tight">{category.name}</h2>
                    </button>
                ))}
            </div>
        </div>
    );
}