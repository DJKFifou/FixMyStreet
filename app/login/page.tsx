import Image from 'next/image';
import { LoginForm } from '@/components/LoginForm';

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <Image
        src={'/images/sign-up.jpg'}
        width={1000}
        height={1000}
        alt="Page de connexion"
        className="bg-red-500 w-full aspect-video object-cover md:hidden"
      />
      <div className="grow flex flex-col gap-4 w-full items-center justify-end px-6 py-12 md:py-6">
        <div className="grow flex flex-col items-center justify-center w-3/4">
          <h1 className="text-2xl text-center mb-4">Connexion</h1>
          <small className="text-sm text-center text-gray-500">
            Vous devez vous connecter pour accéder à l&apos;application
          </small>
        </div>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
