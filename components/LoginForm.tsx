'use client';

import Link from 'next/link';
import IconInput from './form/IconInput';
import PasswordInput from './form/PasswordInput';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className="flex flex-col gap-4">
      <form onSubmit={handleLogin}>
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
            <Link
              href="/auth/forgot-password"
              className="ml-auto inline-block text-sm underline underline-offset-4"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full border border-foreground bg-foreground text-white rounded-md p-2"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
      <div className="w-full">
        <Link
          href="/sign-up"
          className="block text-center w-full border border-foreground rounded-md p-2"
        >
          S&apos;enregistrer
        </Link>
      </div>
    </div>
  );
}
