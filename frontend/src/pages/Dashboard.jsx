import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StatCard({ title, value, note, icon }) {
    return (
        <div className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-medium text-muted">{title}</div>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className="text-3xl font-bold text-green-800 mb-2">{value}</div>
            {note && <div className="text-xs text-muted">{note}</div>}
        </div>
    );
}

export default function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="display-heading text-4xl mb-2">Farm Management Dashboard</h1>
                <p className="text-lg text-muted">
                    Welcome back, <span className="font-semibold text-green-700">{currentUser?.email || 'Farmer'}</span>
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Active Farms"
                    value="12"
                    note="Across 3 regions"
                    icon="🏡"
                />
                <StatCard
                    title="Total Crops"
                    value="8,450"
                    note="Acres under cultivation"
                    icon="🌾"
                />
                <StatCard
                    title="Yield Prediction"
                    value="94.2%"
                    note="Accuracy this season"
                    icon="📊"
                />
                <StatCard
                    title="AI Models Active"
                    value="18"
                    note="Federated learning rounds"
                    icon="🤖"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🌱</span>
                        <h3 className="font-semibold text-xl">Recent Farm Activity</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div>
                                <div className="font-medium">North Valley Farm</div>
                                <div className="text-sm text-muted">Wheat field monitoring</div>
                            </div>
                            <span className="text-xs badge">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div>
                                <div className="font-medium">Green Acres</div>
                                <div className="text-sm text-muted">Pest detection scan</div>
                            </div>
                            <span className="text-xs badge">5 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <div>
                                <div className="font-medium">Riverside Orchards</div>
                                <div className="text-sm text-muted">Irrigation optimization</div>
                            </div>
                            <span className="text-xs badge">1 day ago</span>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📷</span>
                        <h3 className="font-semibold text-xl">Image Analysis</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted">Images Processed Today</span>
                                <span className="font-semibold">1,247</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-600 to-green-700 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted">Detection Accuracy</span>
                                <span className="font-semibold">96.8%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-600 to-green-700 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-800">
                                <strong>✓ All systems operational</strong> - Federated learning models are syncing successfully across all farm locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎯</span>
                    <h3 className="font-semibold text-xl">Quick Actions</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    <Link to="/analysis" className="btn-primary text-center py-3">
                        Upload New Images
                    </Link>
                    <button className="btn-secondary text-center py-3">
                        Generate Report
                    </button>
                    <Link to="/analysis" className="btn-secondary text-center py-3">
                        View Analytics
                    </Link>
                </div>
            </div>
        </div>
    );
}
