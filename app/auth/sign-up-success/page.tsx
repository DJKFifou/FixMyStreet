import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-6 py-12 md:py-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl text-center">Thank you for signing up!</h1>
          <p className="text-sm text-muted-foreground text-center">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </p>
          <Link href="/" className="block text-center w-full border border-foreground rounded-md p-2">
            Aller à la page d&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
