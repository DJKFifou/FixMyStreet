"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import LocationButton from "@/components/form/LocationButton";
import TextAreaWithLengthIndicator from "@/components/form/TextAreaWithLengthIndicator";
import PictureDropzone from './form/PictureDropzone';
import { createClient, withUser } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ReportForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await withUser(supabase, router, async (user) => {
      const { error } = await supabase.from('reports').insert({
        author_id: user.id,
        image_url: pictureUrl,
        description
      });
      if (error) throw error;

      router.push("/form-submitted");
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <LocationButton />
      <PictureDropzone setPictureUrl={setPictureUrl} />
      <TextAreaWithLengthIndicator
        label="Description"
        value={description}
        maxLength={250}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      />
      <PrimaryButton type="submit">Je valide mon signalement</PrimaryButton>
    </form>
  );
};

export default ReportForm;
