import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-64px)] bg-background">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
