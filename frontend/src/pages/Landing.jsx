import React from "react";
import { Link } from "react-router-dom";

/* Professional agriculture-themed images from Unsplash */
const HERO = "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2000&auto=format&fit=crop";

const IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200&auto=format&fit=crop",
        title: "Wheat Cultivation",
        desc: "Advanced monitoring of wheat fields for optimal yield prediction"
    },
    {
        src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200&auto=format&fit=crop",
        title: "Vegetable Farming",
        desc: "Precision agriculture for sustainable vegetable production"
    },
    {
        src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop",
        title: "Modern Greenhouses",
        desc: "Climate-controlled environments for year-round cultivation"
    },
    {
        src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
        title: "Farm Equipment",
        desc: "Smart machinery integration for efficient farm operations"
    },
    {
        src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
        title: "Irrigation Systems",
        desc: "Water management and automated irrigation solutions"
    },
    {
        src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop",
        title: "Harvest Management",
        desc: "Crop monitoring and harvest optimization technologies"
    },
];

export default function Landing() {
    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative h-[60vh] lg:h-[70vh] flex items-center"
                style={{
                    backgroundImage: `url(${HERO})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-green-900/50"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
                    <div className="max-w-3xl">
                        <h1 className="display-heading text-5xl md:text-6xl font-bold leading-tight mb-4">
                            Vision-Language Federated Learning for Agriculture
                        </h1>
                        <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8">
                            Empowering farms with privacy-preserving AI technology. Deploy advanced vision-language models across agricultural operations with minimal bandwidth and maximum security.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/login"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                Get Started →
                            </Link>
                            <a
                                href="#features"
                                className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md rounded-lg font-semibold text-lg text-white border-2 border-white/30 hover:bg-white/20 transition-all"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="display-heading text-4xl mb-4">Agricultural Intelligence Solutions</h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Cutting-edge computer vision and AI technology designed specifically for modern farming operations
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {IMAGES.map((item, i) => (
                        <article key={i} className="card overflow-hidden group cursor-pointer">
                            <div className="h-52 md:h-60 w-full bg-slate-100 overflow-hidden">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-semibold text-lg text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-gradient-to-br from-green-50 to-green-100/50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-3xl">
                                🔒
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Privacy First</h3>
                            <p className="text-muted">
                                Federated learning ensures your farm data stays on your devices, never leaving your premises
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-3xl">
                                📡
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Low Bandwidth</h3>
                            <p className="text-muted">
                                Lightweight prompt-based models reduce communication overhead by over 99%
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-3xl">
                                🌾
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Farm-Optimized</h3>
                            <p className="text-muted">
                                Specialized models for crop detection, pest identification, and yield prediction
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
