"use client";
import { useState } from "react";
import ReportFormStep, { ReportFormData } from "@/components/report-form-manager/ReportFormStep";
import CategorySelectionStep from "@/components/report-form-manager/CategorySelectionStep";
import ValidationStep from "@/components/report-form-manager/ValidationStep";
import { createClient, withUser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function ReportFormManager() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [formData, setFormData] = useState<ReportFormData | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleFormContinue = async (data: Omit<ReportFormData, "category">) => {
        setFormData({ ...data, category: selectedCategory! });
        await withUser(supabase, router, async ({ user }) => {
            const { error } = await supabase.from("reports").insert({
                author_id: user.id,
                ...data,
            });
            if (error) throw error;

            setStep(4); //à remplacer par le 3 quand il sera créé 
        });
    };

    switch (step) {
        case 2:
            return (
                <ReportFormStep
                    category={selectedCategory!}
                    initialData={formData}
                    onContinue={handleFormContinue}
                />
            );
        case 3:
            break;
        case 4:
            return <ValidationStep setStep={setStep} />
        case 1:
        default:
            return <CategorySelectionStep onCategorySelect={handleCategorySelect} />;
    }
}