'use client';

import Link from 'next/link';
import IconInput from './form/IconInput';
import PrimaryButton from './ui/PrimaryButton';
import PasswordInput from './form/PasswordInput';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <IconInput
              id="email"
              type="email"
              placeholder="email@email.com"
              label="Entrez votre email"
              required={true}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              icon="email"
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              id="password"
              placeholder="Mot de passe"
              label="Entrez votre mot de passe"
              required={true}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              id="repeat-password"
              placeholder="Répétez votre mot de passe"
              label="Répétez votre mot de passe"
              required={true}
              value={repeatPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? "Enregistrement..." : "S'enregistrer"}
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
  );
}
