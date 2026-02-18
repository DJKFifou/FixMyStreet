import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl text-center">Merci pour votre inscription !</h1>
          <p className="text-sm text-muted-foreground text-center">
            Veuillez vérifier vos emails pour confirmer votre compte avant de vous connecter.
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
