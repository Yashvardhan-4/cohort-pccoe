import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="p-8 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <div className="border-b border-border/50 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Legal Documentation
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-secondary text-foreground mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Effective Date: January 1, 2026 • Cohort Social Inc.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Information We Collect</h2>
            <p>
              Cohort PCCOE collects institutional email addresses (`@pccoepune.org`), full names, student PRNs, branch affiliations, and academic year details upon sign-in via Google OAuth.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Usage of Information</h2>
            <p>
              Your data is exclusively used to provide campus community access, direct encrypted messaging, academic calendar synchronization, and club participation. We never sell student data to third-party commercial entities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Real-Time Connect & Security</h2>
            <p>
              Messages transmitted through the Connect module utilize end-to-end encryption protocols. Access requests are strictly verified against departmental databases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Contact Privacy Officer</h2>
            <p>
              If you have inquiries regarding your privacy or data rights, please contact{' '}
              <span className="text-foreground font-semibold">chiragferwani@gmail.com</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
