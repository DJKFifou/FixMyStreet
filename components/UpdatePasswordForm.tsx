'use client';

import PrimaryButton from './ui/PrimaryButton';
import SecondaryLink from './ui/SecondaryLink';
import PasswordInput from './form/PasswordInput';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleForgotPassword}>
        <div className="flex flex-col gap-6">
          <PasswordInput
            id="new-password"
            placeholder="Nouveau mot de passe"
            label="Entrez votre nouveau mot de passe"
            required={true}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? "Enregistrement..." : "Enregistrer le nouveau mot de passe"}
          </PrimaryButton>
        </div>
      </form>
      <div className="w-full">
        <SecondaryLink href="/login">Se connecter</SecondaryLink>
      </div>
    </div>
  );
}
