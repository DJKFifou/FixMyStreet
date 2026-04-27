"use client";

import { useState } from "react";
import ReportFormStep from "@/components/report-form-manager/ReportFormStep";
import CategorySelectionStep from "@/components/report-form-manager/CategorySelectionStep";
import ValidationStep from "@/components/report-form-manager/ValidationStep";
import ReportFormSummary from "@/components/ReportFormSummary";
import { createClient, withUser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { ReportCategories, ReportFormData } from "@/app/types";

export default function ReportFormManager() {
    const [selectedCategory, setSelectedCategory] = useState<ReportCategories | null>(null);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [formData, setFormData] = useState<ReportFormData | null>(null);

    const router = useRouter();
    const supabase = createClient();

    const handleCategorySelect = (category: ReportCategories) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleFormContinuation = (data: Omit<ReportFormData, "category">) => {
        const fullData: ReportFormData = {
            ...data,
            category: selectedCategory!,
        };

        setFormData(fullData);
        setStep(3);
    };

    const goBackFromReportForm = () => {
        setStep(1);
        setFormData(null);
    };

    const handleFinalConfirmation = async () => {
        if (!formData) return;

        try {
            await withUser(supabase, router, async ({ user }) => {
                const { error } = await supabase.from("reports").insert({
                    author_id: user.id,
                    ...formData,
                });

                if (error) throw error;

                setStep(4);
            });
        } catch (err) {
            console.error("Erreur lors de l'envoi du rapport :", err);
        }
    };

    const restartForm = () => {
        setSelectedCategory(null);
        setFormData(null);
        setStep(1);
    };

    switch (step) {
        case 2:
            return (
                <ReportFormStep
                    category={selectedCategory!}
                    initialData={formData}
                    onSubmit={handleFormContinuation}
                    goBack={goBackFromReportForm}
                />
            );

        case 3:
            return (
                <ReportFormSummary
                    data={formData!}
                    onBack={() => setStep(2)}
                    onConfirm={handleFinalConfirmation}
                />
            );

        case 4:
            return <ValidationStep restartForm={restartForm} />;

        case 1:
        default:
            return <CategorySelectionStep onCategorySelect={handleCategorySelect} />;
    }
}
