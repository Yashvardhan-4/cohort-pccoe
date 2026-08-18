import React, { useState } from 'react';
import { Mail, Send, CheckCircle, MessageSquare, MapPin } from 'lucide-react';

export const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-1">
            <Mail className="w-3.5 h-3.5" /> Support & Feedback
          </span>
          <h1 className="text-2xl font-bold font-secondary text-foreground">
            Contact the Cohort Team
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Have suggestions, reported bugs, or want to onboard your student club? Reach out directly.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-foreground">Message Dispatched!</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Thank you for writing to us. The core engineering team will get back to you via your college email within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-1.5 rounded-full bg-accent text-white font-bold text-xs"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Chirag Ferwani"
                  className="w-full p-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">College Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@pccoepune.org"
                  className="w-full p-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Club onboarding / feature request"
                className="w-full p-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="font-semibold text-muted-foreground block mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your query or feedback in detail..."
                className="w-full p-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-accent text-white font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Submit Feedback
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-accent" />
            <span>chiragferwani@gmail.com</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-accent" />
            <span>PCCOE Campus, Sector 26, Nigdi, Pune</span>
          </div>
        </div>
      </div>
    </div>
  );
};
