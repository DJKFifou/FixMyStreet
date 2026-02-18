import Image from 'next/image';
import { UpdatePasswordForm } from '@/components/UpdatePasswordForm';

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <Image
        src={'/images/update-password.jpg'}
        width={1000}
        height={1000}
        alt="Page de mise à jour de mot de passe"
        className="bg-red-500 w-full aspect-video object-cover md:hidden"
      />
      <div className="grow flex flex-col gap-4 w-full items-center justify-end px-6 py-12 md:py-6">
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">Changer votre mot de passe</h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
