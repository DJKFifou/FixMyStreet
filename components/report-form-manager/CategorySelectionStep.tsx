
import Image from "next/image";
import PrimaryButton from "../ui/PrimaryButton";

const categories = [
    { id: "voirie", name: "Dégât sur la voie" },
    { id: "signalisation", name: "Problème de signalisation" },
    { id: "eclairage", name: "Éclairage défectueux" },
    { id: "encombrement", name: "Encombrements / Voie bloquée" },
];

interface CategoriesSelectionProps {
    onCategorySelect: (category: string) => void;
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
                {categories.map((category) => (
                    <PrimaryButton
                        key={category.id}
                        type="button"
                        onClick={() => onCategorySelect(category.id)}
                        classes="h-32 p-4"
                    >
                        <h2 className="text-sm
                         font-medium text-center leading-tight">{category.name}</h2>
                    </PrimaryButton>
                ))}
            </div>
        </div>
    );
}