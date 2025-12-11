import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="flex flex-col items-center justify-center h-full py-20">
            <h1 className="text-5xl font-serif text-brand-900 mb-6">Welcome to VLLFL</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl text-center">
                Vision-Language Federated Learning for Agriculture.
                Empowering farms with privacy-preserving AI technology.
            </p>
            <Link to="/login" className="px-6 py-3 bg-brand-900 text-white rounded-lg hover:bg-slate-800 transition">
                Get Started
            </Link>
        </div>
    );
}
