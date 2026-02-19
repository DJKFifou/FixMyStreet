'use client';

import Image from "next/image";
import LoadingImage from "../ui/LoadingImage";
import { createClient, withUser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MandatoryAsterisk from "../ui/MandatoryAsterisk";

const PictureDropzone = () => {
  const supabase = createClient();
  const router = useRouter();
  const [picture, setPicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPicture(null);
    setLoading(true);

    const file = e.target.files?.[0];
    uploadFile(file);
  }

  const uploadFile = async (file?: File) => {
    if (!file) return;
  
    await withUser(supabase, router, async (user) => {
      const fileName = file.name;
      const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExtension}`;
      const { error } = await supabase.storage.from('report_images').upload(filePath, file);
      setLoading(false);

      if (error) {
        setError(error.message);
      } else {
        setPicture(file);
      }
    });
  }

  const getInputText = () => {
    if (loading) return 'Chargement de la photo...';
    if (picture) return 'Changer de photo';
    return 'Ajouter ou prendre une photo';
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg">Photo de la situation<MandatoryAsterisk /></span>
      <label className="flex flex-col gap-2">
        <span className="relative flex items-center justify-between w-full bg-foreground rounded-md px-3 py-2 text-white">
          {getInputText()}
          <i className="material-symbols-outlined">photo_camera</i>
        </span>
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handlePictureChange}
          capture="environment"
          className="hidden"
          disabled={loading}
        />
      </label>
      {loading && <LoadingImage />}
      {picture && !loading && (
        <Image
          src={URL.createObjectURL(picture)}
          alt="Picture"
          width={100}
          height={100}
          className="w-25 h-auto object-cover"
        />
      )}
      {error && <p className="w-full text-right text-red-500">{error}</p>}
    </div>
  );
};

export default PictureDropzone;
