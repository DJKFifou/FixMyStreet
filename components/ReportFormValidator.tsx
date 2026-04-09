"use client";

import { useEffect, useState } from "react";
import { createClient, withUser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ReportFormData } from "@/components/ReportFormStep";
import Loader from "@/components/ui/Loader";

interface ReportFormValidatorProps {
    data: ReportFormData;
}

const ReportFormValidator = ({ data }: ReportFormValidatorProps) => {
    const router = useRouter();
    const supabase = createClient();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const submitReport = async () => {
            await withUser(supabase, router, async ({ user }) => {
                const { error } = await supabase.from("reports").insert({
                    author_id: user.id,
                    image_url: data.pictureUrl,
                    lat: data.lat,
                    lon: data.lon,
                    description: data.description,
                    category: data.category,
                });

                if (error) {
                    setErrorMessage(error.message || "Une erreur est survenue.");
                    return;
                }

                router.push("/form/submitted");
            });
        };

        submitReport();
    }, [data, supabase, router]);

    if (errorMessage) {
        return (
            <div className="flex flex-col gap-6 items-center justify-center pb-32">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-red-600">Erreur</h1>
                    <p className="text-gray-500 mt-2">{errorMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 items-center justify-center h-screen">
            <Loader />
            <p className="text-gray-500">Envoi de votre signalement en cours...</p>
        </div>
    );
};

export default ReportFormValidator;
