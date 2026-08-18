import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-muted/60 flex items-center justify-center text-accent">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-secondary text-foreground">
          404 - Lost on Campus?
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
          The page or community you were looking for doesn't seem to exist. Let's get you back to the main feed.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-2.5 rounded-full bg-accent text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm"
        >
          Return to Dashboard <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </main>

      <Footer />
    </div>
  );
};
