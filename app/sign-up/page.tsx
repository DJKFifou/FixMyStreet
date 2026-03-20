import Image from "next/image";
import { SignUpForm } from "@/components/SignUpForm";

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <div className="bg-theme-blue w-full flex items-center justify-center md:hidden py-25">
        <Image
          src="/logo-fixmystreet-blanc.png"
          width={90}
          height={90}
          alt="Logo FixMyStreet"
          className="mr-2"
        />
        <span className="font-grotesk font-bold text-white text-3xl">FixMyStreet</span>
      </div>
      <div className="grow flex flex-col gap-4 w-full items-center justify-end px-6 py-12 md:py-6">
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">Enregistrement</h1>
          <small className="text-sm text-center text-gray-500">
            L&apos;enregistrement est suivi d&apos;une validation par mail
          </small>
        </div>
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
