'use client';

import Link from 'next/link';
import IconInput from './form/IconInput';
import PrimaryButton from './ui/PrimaryButton';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export function ForgotPasswordForm({ setSuccess }: { setSuccess: (success: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <form onSubmit={handleForgotPassword}>
          <div className="flex flex-col gap-6">
            <IconInput
              id="email"
              type="email"
              placeholder="email@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="email"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
            </PrimaryButton>
          </div>
        </form>
        <div className="w-full">
          <Link
            href="/login"
            className="block text-center w-full border border-foreground rounded-md p-2"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
