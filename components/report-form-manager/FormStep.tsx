"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import LocationButton from "@/components/form/LocationButton";
import TextAreaWithLengthIndicator from "@/components/form/TextAreaWithLengthIndicator";
import PictureDropzone from "../form/PictureDropzone";
import BackButtonHeader from "../ui/BackButtonHeader";
import { useState } from "react";
import type { ReportCategories, ReportFormData } from "@/app/types";
import { reportCategoryMapper } from "@/lib/utils/db";
import Recap from "../ui/Recap";

interface FormProps {
  category: ReportCategories;
  initialData: ReportFormData | null;
  onSubmit: (data: Omit<ReportFormData, "category">) => void;
  goBack: () => void;
}

const FormStep = ({ category, initialData, onSubmit, goBack }: FormProps) => {
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [pictureUrl, setPictureUrl] = useState<string | null>(initialData?.image_url ?? null);
  const [lat, setLat] = useState<number | null>(initialData?.lat ?? null);
  const [lon, setLon] = useState<number | null>(initialData?.lon ?? null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pictureUrl || !lat || !lon) return;

    onSubmit({ description, image_url: pictureUrl, lat, lon });
  };

  return (
    <>
      <BackButtonHeader onClick={goBack} title="Signalement" />
      <form className="flex flex-col gap-5 pb-32 mt-14" onSubmit={handleSubmit}>
        <Recap title="Catégorie">
            {reportCategoryMapper[category]}
        </Recap>
        <LocationButton lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
        <PictureDropzone pictureUrl={pictureUrl} setPictureUrl={setPictureUrl} />
        <TextAreaWithLengthIndicator
          label="Description"
          value={description}
          maxLength={250}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="fixed bottom-30 left-0 w-full px-4">
          <PrimaryButton type="submit">Suivant</PrimaryButton>
        </div>
      </form>
    </>
  );
};

export default FormStep;
