"use client";
import { useState } from "react";
import ReportForm, { ReportFormData } from "@/components/ReportFormStep";
import CategoriesSelection from "@/components/CategorySelectionStep";
import ReportFormValidator from "@/components/ReportFormValidator";

export default function ReportFormManager() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [formData, setFormData] = useState<ReportFormData | null>(null);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleFormContinue = (data: Omit<ReportFormData, "category">) => {
        if (!selectedCategory) return;
        setFormData({ ...data, category: selectedCategory });
        setStep(3);
    };


    switch (step) {
        case 2:
            return (
                <ReportForm
                    category={selectedCategory ?? undefined}
                    initialData={formData ?? undefined}
                    onContinue={handleFormContinue}
                />
            );
        case 3:

            return (
                <ReportFormValidator data={formData as ReportFormData} />
            );


        case 4:
            return formData ? (
                <ReportFormValidator data={formData} />
            ) : (
                <CategoriesSelection onCategorySelect={handleCategorySelect} />
            );
        case 1:
        default:
            return <CategoriesSelection onCategorySelect={handleCategorySelect} />;
    }
}