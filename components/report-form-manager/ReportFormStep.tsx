"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import LocationButton from "@/components/form/LocationButton";
import TextAreaWithLengthIndicator from "@/components/form/TextAreaWithLengthIndicator";
import PictureDropzone from "../form/PictureDropzone";
import BackButtonHeader from "../ui/BackButtonHeader";
import { useState } from "react";

export interface ReportFormData {
  category: string;
  description: string;
  image_url: string | null;
  lat: number | null;
  lon: number | null;
}

interface ReportFormProps {
  category: string;
  initialData: Omit<ReportFormData, "category"> | null;
  onSubmit: (data: Omit<ReportFormData, "category">) => void;
  goBack: () => void;
}

const ReportFormStep = ({ category, initialData, onSubmit, goBack }: ReportFormProps) => {
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [pictureUrl, setPictureUrl] = useState<string | null>(initialData?.image_url ?? null);
  const [lat, setLat] = useState<number | null>(initialData?.lat ?? null);
  const [lon, setLon] = useState<number | null>(initialData?.lon ?? null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ description, image_url: pictureUrl, lat, lon });
  };

  const getCategoryName = (cat: string) => {
    const categories: { [key: string]: string } = {
      voirie: "Dégât sur la voie",
      signalisation: "Problème de signalisation",
      eclairage: "Éclairage défectueux",
      encombrement: "Encombrements / Voie bloquée",
    };
    return categories[cat] || cat;
  };

  return (
    <>
      <BackButtonHeader onClick={goBack} title="Signalement" />
      <form className="flex flex-col gap-5 pb-32 mt-14" onSubmit={handleSubmit}>
        {category && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <label className="block text-lg font-medium text-gray-600 mb-1">
              Catégorie sélectionnée
            </label>
            <input
              type="text"
              value={getCategoryName(category)}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-theme-lightGray text-gray-700 cursor-not-allowed"
            />
          </div>
        )}
        <LocationButton setLat={setLat} setLon={setLon} />
        <PictureDropzone setPictureUrl={setPictureUrl} />
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

export default ReportFormStep;
