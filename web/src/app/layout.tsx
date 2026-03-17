import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { AppLayoutWrapper } from '@/components/layout/AppLayoutWrapper';
import { PageSkeleton } from '@/components/loading';

export const metadata: Metadata = {
  title: 'Dashboard App',
  description: 'Built with Next.js + shadcn/ui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TooltipProvider>
          <Suspense fallback={<PageSkeleton />}>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
