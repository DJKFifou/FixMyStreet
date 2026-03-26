"use client";

import Link from "next/link";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { useState } from "react";

export default function Page() {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <>
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">Vérifiez vos emails</h1>
          <p className="text-center mb-4">
            Les instructions de réinitialisation ont été envoyées à votre email
          </p>
          <Link
            href="/login"
            className="block text-center w-full border border-theme-blue rounded-md p-2"
          >
            Se connecter
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grow flex flex-col items-center justify-center w-3/4">
        <h1 className="text-2xl text-center mb-4">
          Réinitialiser votre mot de passe
        </h1>
        <small className="text-sm text-center text-gray-500">
          Entrez votre email et nous vous enverrons un lien pour réinitialiser
          votre mot de passe
        </small>
      </div>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm setSuccess={setSuccess} />
      </div>
    </>
  );
}
