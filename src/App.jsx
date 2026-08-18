import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Preloader } from './components/Preloader';
import { SpidermanOverlay } from './components/SpidermanOverlay';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { Communities } from './pages/Communities';
import { CommunityDetail } from './pages/CommunityDetail';
import { Connect } from './pages/Connect';
import { XD } from './pages/XD';
import { CampusMap } from './pages/CampusMap';
import { Network } from './pages/Network';
import { AcademicCalendar } from './pages/AcademicCalendar';
import { Arcade } from './pages/Arcade';
import { HeadsUp } from './pages/HeadsUp';
import { StudentProfile } from './pages/StudentProfile';
import { Admins } from './pages/Admins';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient();

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '234786239650-vldp8ikbdq85srkbphojoc65ba49g430.apps.googleusercontent.com';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading, hasAccess } = useAuth();
  if (loading) return null;
  if (!user || !hasAccess) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Auth route wrapper (redirects to dashboard if already logged in)
const AuthRoute = ({ children }) => {
  const { user, loading, hasAccess } = useAuth();
  if (loading) return null;
  if (user && hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            {isLoading ? (
              <Preloader onLoadingComplete={() => setIsLoading(false)} />
            ) : (
              <BrowserRouter>
                {/* 6 Signature Floating Spider-Man stickers across pages */}
                <SpidermanOverlay />

                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route
                    path="/login"
                    element={
                      <AuthRoute>
                        <Login />
                      </AuthRoute>
                    }
                  />

                  {/* Dashboard routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<DashboardHome />} />
                    <Route path="communities" element={<Communities />} />
                    <Route path="communities/:clubusername" element={<CommunityDetail />} />
                    <Route path="xd" element={<XD />} />
                    <Route path="map" element={<CampusMap />} />
                    <Route path="network" element={<Network />} />
                    <Route path="friends" element={<Navigate to="/dashboard/network" replace />} />
                    <Route path="connect" element={<Connect />} />
                    <Route path="collaborate" element={<Navigate to="/dashboard/connect" replace />} />
                    <Route path="exchange" element={<Navigate to="/dashboard/xd" replace />} />
                    <Route path="calendar" element={<AcademicCalendar />} />
                    <Route path="headsup" element={<HeadsUp />} />
                    <Route path="contact" element={<ContactUs />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="profile/:username" element={<StudentProfile />} />
                    <Route path="arcade" element={<Arcade />} />
                    <Route path="admins" element={<Admins />} />
                  </Route>

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            )}
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
