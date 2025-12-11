import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-green-50/30">
      <AuthProvider>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
      <footer className="text-center py-6 text-sm text-slate-600 border-t border-green-100 bg-white/50">
        <p>© {new Date().getFullYear()} VLLFL — Vision-Language Federated Learning for Agriculture</p>
        <p className="text-xs text-muted mt-1">Empowering farms with privacy-preserving AI technology</p>
      </footer>
    </div>
  );
}
