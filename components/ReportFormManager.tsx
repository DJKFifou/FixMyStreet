"use client";

import { useState } from "react";
import FormStep from "@/components/report-form-manager/FormStep";
import CategorySelectionStep from "@/components/report-form-manager/CategorySelectionStep";
import ValidationStep from "@/components/report-form-manager/ValidationStep";
import SummaryStep from "@/components/report-form-manager/SummaryStep";
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
        await withUser(supabase, router, async ({ user }) => {
            const { data: report, error: reportError } = await supabase
                .from("reports")
                .insert({ author_id: user.id, ...formData })
                .select("id")
                .single();
            if (reportError) throw reportError;

            const { error: statusError } = await supabase
                .from("statuses")
                .insert({ report_id: report.id, state: "created" });
            if (statusError) throw statusError;

            setStep(4); //à remplacer par le 3 quand il sera créé
        });

    };

    const restartForm = () => {
        setSelectedCategory(null);
        setFormData(null);
        setStep(1);
    };

    switch (step) {
        case 2:
            return (
                <FormStep
                    category={selectedCategory!}
                    initialData={formData}
                    onSubmit={handleFormContinuation}
                    goBack={goBackFromReportForm}
                />
            );

        case 3:
            return (
                <SummaryStep
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
