import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from './AuthContext';
import { useState } from 'react';

function AboutModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const teamMembers = [
        "Akash Gourav",
        "Mahesh Challa",
        "Uppal Balu",
        "T Sai Koushik",
        "Sathvik"
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 transform transition-all">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    ✕
                </button>

                {/* Logo */}
                <div className="text-center mb-6">
                    <img
                        src="/logo.png"
                        alt="VLLFL Logo"
                        className="w-16 h-16 mx-auto rounded-xl shadow-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold text-green-700">About Us</h2>
                </div>

                {/* Description */}
                <p className="text-center font-semibold text-slate-700 mb-6 leading-relaxed">
                    Hi! We are Team VLLFL — a group of five passionate developers working together to build an innovative and seamless user experience.
                </p>

                {/* Team Members */}
                <div className="space-y-3">
                    {teamMembers.map((name, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold shadow-md">
                                {index + 1}
                            </div>
                            <span className="font-medium text-slate-700">{name}</span>
                        </div>
                    ))}
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [showAbout, setShowAbout] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error("Failed to log out");
        }
    };

    // Check if we're on a public page (landing)
    const isPublicPage = location.pathname === '/' || location.pathname === '/login';

    return (
        <>
            <nav className="px-10 py-4 backdrop-blur-xl bg-white/70 border-b border-white/50 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                {/* Logo with subtitle */}
                <Link to="/" className="flex items-center gap-4 group">
                    <img
                        src="/logo.png"
                        alt="VLLFL Logo"
                        className="w-14 h-14 rounded-xl shadow-lg group-hover:scale-105 transition-transform"
                    />
                    <div>
                        <div className="font-bold text-xl text-slate-800">VLLFL</div>
                        <div className="text-sm text-green-600">Farm Management</div>
                    </div>
                </Link>

                <div className="flex items-center gap-6">
                    {/* Show different nav links based on auth state and page */}
                    {!currentUser || isPublicPage ? (
                        <>
                            {/* Public navigation - Home, About, Documentation */}
                            <Link
                                to="/"
                                className="text-slate-600 hover:text-green-700 font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <button
                                onClick={() => setShowAbout(true)}
                                className="text-slate-600 hover:text-green-700 font-medium transition-colors"
                            >
                                About Us
                            </button>
                            <a
                                href="#documentation"
                                className="text-slate-600 hover:text-green-700 font-medium transition-colors"
                            >
                                Guide
                            </a>
                            <span
                                className="text-slate-600 hover:text-green-700 font-medium transition-colors cursor-pointer"
                            >
                                Documentation
                            </span>
                            {!currentUser && (
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Sign In
                                </Link>
                            )}
                            {currentUser && (
                                <Link
                                    to="/dashboard"
                                    className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Authenticated navigation - Home, Dashboard, Analysis */}
                            <Link
                                to="/"
                                className="relative px-3 py-2 font-medium transition-all duration-300 text-slate-600 hover:text-green-700"
                            >
                                Home
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`relative px-3 py-2 font-medium transition-all duration-300 ${location.pathname === '/dashboard'
                                    ? 'text-green-700'
                                    : 'text-slate-600 hover:text-green-700'
                                    }`}
                            >
                                Dashboard
                                {location.pathname === '/dashboard' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-green-500 rounded-full"></span>
                                )}
                            </Link>
                            <Link
                                to="/analysis"
                                className={`relative px-3 py-2 font-medium transition-all duration-300 ${location.pathname === '/analysis'
                                    ? 'text-green-700'
                                    : 'text-slate-600 hover:text-green-700'
                                    }`}
                            >
                                Analysis
                                {location.pathname === '/analysis' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-green-500 rounded-full"></span>
                                )}
                            </Link>
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                    {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </nav>

            {/* About Modal */}
            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
        </>
    );
}
