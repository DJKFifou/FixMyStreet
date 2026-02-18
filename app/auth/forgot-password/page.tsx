'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';
import { useState } from 'react';

export default function Page() {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="flex flex-col min-h-svh">
        <Image
          src={'/images/forgot-password.jpg'}
          width={1000}
          height={1000}
          alt="Page de réinitialisation de mot de passe"
          className="bg-red-500 w-full aspect-video object-cover md:hidden"
        />
        <div className="grow flex flex-col gap-4 w-full items-center justify-end px-6 py-12 md:py-6">
          <div className="grow flex flex-col items-center justify-center w-3/4">
            <h1 className="text-2xl text-center mb-4">Vérifiez vos emails</h1>
            <p className="text-center mb-4">
              Les instructions de réinitialisation ont été envoyées à votre email
            </p>
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

  return (
    <div className="flex flex-col min-h-svh">
      <Image
        src={'/images/forgot-password.jpg'}
        width={1000}
        height={1000}
        alt="Page de réinitialisation de mot de passe"
        className="bg-red-500 w-full aspect-video object-cover md:hidden"
      />
      <div className="grow flex flex-col gap-4 w-full items-center justify-end px-6 py-12 md:py-6">
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">Réinitialiser votre mot de passe</h1>
          <p className="text-center">
            Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe
          </p>
        </div>
        <div className="w-full max-w-sm">
          <ForgotPasswordForm setSuccess={setSuccess} />
        </div>
      </div>
    </div>
  );
}
