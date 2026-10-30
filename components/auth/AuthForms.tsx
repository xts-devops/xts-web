"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from 'lucide-react';
import { XTSLogo } from '@/components/icons';
import { isLocalPreviewClient } from '@/lib/local-preview';

// Must match user ids in lib/firebase/local-seed.ts
const LOCAL_PREVIEW_ACCOUNTS = [
  { id: 'preview-admin', label: 'Admin' },
  { id: 'preview-seller', label: 'Seller' },
  { id: 'preview-expert', label: 'Expert' },
  { id: 'preview-member', label: 'Customer' },
];

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// Google is the only real sign-in method, so the form offers just that
// (plus the dev-only sample accounts in local preview mode).
export const LoginForm = () => {
  const { status } = useSession();
  const router = useRouter();

  // Already signed in: the login page has nothing to offer.
  useEffect(() => {
    if (status === 'authenticated') router.replace('/dashboard');
  }, [status, router]);

  if (status !== 'unauthenticated') {
    return (
      <div className="flex justify-center py-20" role="status" aria-label="Checking sign-in">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="rounded-md border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
        <XTSLogo className="w-10 h-10 mb-6 text-[var(--text-primary)]" />
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-2">Sign in</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Use your Google account to check out, track orders and message sellers.
        </p>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full h-12 flex items-center justify-center gap-3 rounded-md border border-[var(--border-primary)] bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {isLocalPreviewClient() && (
          <div className="mt-6 rounded-md border border-dashed border-safety-orange/60 p-4">
            <p className="text-xs font-semibold text-safety-orange mb-3">
              Local preview: sign in as a sample user
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LOCAL_PREVIEW_ACCOUNTS.map((acct) => (
                <button
                  key={acct.id}
                  type="button"
                  onClick={() => signIn('local-preview', { userId: acct.id, callbackUrl: '/dashboard' })}
                  className="h-10 rounded-md border border-[var(--border-primary)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
                >
                  {acct.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
        By continuing you agree to the{' '}
        <Link href="/terms" className="underline hover:text-[var(--text-primary)]">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline hover:text-[var(--text-primary)]">Privacy Policy</Link>.
      </p>
    </div>
  );
};
