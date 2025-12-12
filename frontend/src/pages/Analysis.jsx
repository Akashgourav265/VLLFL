import React, { useState } from 'react';

export default function Dashboard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prompts, setPrompts] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
        setPredictions([]);
        setError(null);
        setHasAnalyzed(false);
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
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif text-brand-900 mb-8">Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-4">Upload Image</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Select Image</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-brand-50 file:text-brand-900
                  hover:file:bg-brand-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Prompts (comma separated)</label>
                            <input
                                type="text"
                                value={prompts}
                                onChange={(e) => setPrompts(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-900 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!selectedFile || loading}
                            className="w-full bg-brand-900 text-white py-2 rounded hover:bg-slate-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Analyzing...' : 'Analyze Image'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-4">Results</h2>
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Preview" className="w-full rounded-lg object-cover max-h-64" />
                        </div>
                    )}

                    {hasAnalyzed && (
                        <>
                            <div className="mb-4">
                                <h3 className="font-semibold text-lg">Total Detected Objects: {predictions.length}</h3>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                                {predictions.map((pred, idx) => (
                                    <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col items-center">
                                        <img src={pred.crop} alt={pred.label} className="h-24 object-contain mb-2 rounded" />
                                        <span className="font-medium text-brand-900 text-sm">{pred.label}</span>
                                        <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-1">
                                            {(pred.score * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
