import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-brand-900">Sign In</h2>
                <button
                    onClick={handleLogin}
                    className="w-full bg-brand-900 text-white py-2 rounded hover:bg-slate-800 transition"
                >
                    Enter Dashboard
                </button>
            </div>
        </div>
    );
}
