import React, { useState } from 'react';

export default function Analysis() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prompts, setPrompts] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            setPredictions([]);
            setError(null);
            setHasAnalyzed(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            setPredictions([]);
            setError(null);
            setHasAnalyzed(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('texts', prompts);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setPredictions(data.predictions || []);
            if (data.image) {
                setImagePreview(data.image);
            }
            setHasAnalyzed(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">🔬</span>
                    <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Image Analysis
                    </h1>
                </div>
                <p className="text-lg text-slate-600">
                    Upload farm images for AI-powered object detection and analysis
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl shadow-lg">
                            📤
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-slate-800">Upload Image</h2>
                            <p className="text-sm text-slate-500">Drag & drop or click to select</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Drop Zone */}
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${dragActive
                                    ? 'border-green-500 bg-green-50'
                                    : imagePreview
                                        ? 'border-green-300 bg-green-50/50'
                                        : 'border-slate-300 hover:border-green-400 hover:bg-green-50/30'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <input
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-64 mx-auto rounded-xl shadow-lg object-contain"
                                    />
                                    <div className="mt-4 text-sm text-green-700 font-medium">
                                        ✓ Image loaded - {selectedFile?.name}
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8">
                                    <div className="text-5xl mb-4">📷</div>
                                    <p className="text-slate-600 font-medium mb-2">
                                        Drop your image here
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        or click to browse • PNG, JPG up to 10MB
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Prompts Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Detection Prompts
                            </label>
                            <input
                                type="text"
                                value={prompts}
                                onChange={(e) => setPrompts(e.target.value)}
                                className="input glow-focus"
                                placeholder="apple, orange, tomato, pest, disease..."
                            />
                            <p className="mt-2 text-xs text-slate-500">
                                Comma-separated list of objects to detect in the image
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!selectedFile || loading}
                            className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Analyzing with AI...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <span>🔍</span>
                                    Analyze Image
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
                            <span className="text-lg">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl shadow-lg">
                            📊
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-slate-800">Detection Results</h2>
                            <p className="text-sm text-slate-500">AI-powered analysis output</p>
                        </div>
                    </div>

                    {!hasAnalyzed ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="text-6xl mb-4 opacity-50">🔬</div>
                            <h3 className="font-semibold text-slate-600 mb-2">No Analysis Yet</h3>
                            <p className="text-sm text-slate-400 max-w-xs">
                                Upload an image and click "Analyze" to see AI detection results
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Summary */}
                            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">🎯</span>
                                    <div>
                                        <p className="font-bold text-green-800 text-lg">
                                            {predictions.length} Objects Detected
                                        </p>
                                        <p className="text-sm text-green-700">
                                            Analysis complete with high confidence
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detected Objects Grid */}
                            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                                {predictions.map((pred, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-50 hover:bg-green-50 p-4 rounded-xl border border-slate-200 hover:border-green-300 flex flex-col items-center transition-all duration-300 group"
                                    >
                                        <div className="w-full h-24 rounded-lg overflow-hidden bg-white shadow-sm mb-3">
                                            <img
                                                src={pred.crop}
                                                alt={pred.label}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="font-bold text-slate-800 group-hover:text-green-700 transition-colors capitalize">
                                            {pred.label}
                                        </span>
                                        <span className="mt-1 px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-sm">
                                            {(pred.score * 100).toFixed(0)}% match
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {predictions.length === 0 && (
                                <div className="text-center py-8 text-slate-500">
                                    <div className="text-4xl mb-2">🤔</div>
                                    <p>No objects detected matching your prompts</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Tips Section */}
            <div className="mt-10 card p-6">
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                    <span>💡</span> Tips for Best Results
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">📸</span>
                        <div>
                            <p className="font-medium text-slate-700">Clear Images</p>
                            <p className="text-sm text-slate-500">Use well-lit, focused photos for better detection accuracy</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                            <p className="font-medium text-slate-700">Specific Prompts</p>
                            <p className="text-sm text-slate-500">Be specific with detection terms for precise results</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🔄</span>
                        <div>
                            <p className="font-medium text-slate-700">Multiple Attempts</p>
                            <p className="text-sm text-slate-500">Try different angles or prompts for comprehensive analysis</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
