import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FileText, ArrowLeft } from 'lucide-react';

export const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Last Updated: January 1, 2026 • Cohort Social Inc.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Cohort PCCOE (cohortpccoe.in), you agree to comply with all campus community codes of conduct, anti-ragging policies, and academic integrity guidelines established by Pimpri Chinchwad College of Engineering, Pune.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Community Standards</h2>
            <p>
              Users are prohibited from publishing defamatory content, academic dishonesty materials, unverified rumors, or harassment. Posts violating guidelines will be purged and student accounts may be subject to disciplinary review.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Disclaimer</h2>
            <p>
              Cohort is a student-run community platform, not a financial institution or official SPPU board. Information published by student clubs is managed by respective club heads.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Governing Law</h2>
            <p>
              These terms are governed by the laws of India under the jurisdiction of courts in Pune, Maharashtra.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
