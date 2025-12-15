import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StatCard({ title, value, note, icon, color = "green" }) {
    return (
        <div className="card p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="text-sm font-medium text-slate-500">{title}</div>
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent mb-2">
                {value}
            </div>
            {note && <div className="text-sm text-slate-500">{note}</div>}
        </div>
    );
}

function ActivityItem({ title, subtitle, time }) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0 group hover:bg-green-50/50 -mx-2 px-2 rounded-lg transition-colors">
            <div>
                <div className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors">{title}</div>
                <div className="text-sm text-slate-500">{subtitle}</div>
            </div>
            <span className="badge">{time}</span>
        </div>
    );
}

function ProgressBar({ label, value, percentage }) {
    return (
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">{label}</span>
                <span className="font-bold text-green-700">{value}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 progress-bar transition-all duration-1000"
                    style={{ width: percentage }}
                ></div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Welcome Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">👋</span>
                    <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Farm Dashboard
                    </h1>
                </div>
                <p className="text-lg text-slate-600">
                    Welcome back, <span className="font-bold text-green-700">{currentUser?.email?.split('@')[0] || 'Farmer'}</span>!
                    Here's what's happening on your farms.
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Active Farms"
                    value="3"
                    note="Across 3 regions"
                    icon="🏡"
                />
                <StatCard
                    title="Total Crops"
                    value="30"
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
                    value="3"
                    note="Federated learning rounds"
                    icon="🤖"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-10">
                {/* Activity Card */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl shadow-lg">
                            🌱
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-slate-800">Recent Activity</h3>
                            <p className="text-sm text-slate-500">Latest farm operations</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <ActivityItem
                            title="North Valley Farm"
                            subtitle="Wheat field monitoring"
                            time="2 hours ago"
                        />
                        <ActivityItem
                            title="Green Acres"
                            subtitle="Pest detection scan"
                            time="5 hours ago"
                        />
                        <ActivityItem
                            title="Riverside Orchards"
                            subtitle="Irrigation optimization"
                            time="1 day ago"
                        />
                        <ActivityItem
                            title="Sunny Meadows"
                            subtitle="Harvest prediction updated"
                            time="2 days ago"
                        />
                    </div>
                </div>

                {/* Analytics Card */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl shadow-lg">
                            📷
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-slate-800">Image Analysis</h3>
                            <p className="text-sm text-slate-500">AI processing metrics</p>
                        </div>
                    </div>

                    <ProgressBar label="Images Processed Today" value="1,247" percentage="78%" />
                    <ProgressBar label="Detection Accuracy" value="96.8%" percentage="96.8%" />
                    <ProgressBar label="Model Sync Status" value="Complete" percentage="100%" />

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">✓</span>
                            <div>
                                <p className="font-semibold text-green-800">All systems operational</p>
                                <p className="text-sm text-green-700">
                                    Federated learning models are syncing successfully across all farm locations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl shadow-lg">
                        🎯
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-slate-800">Quick Actions</h3>
                        <p className="text-sm text-slate-500">Common tasks and operations</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    <Link
                        to="/analysis"
                        className="group flex items-center justify-center gap-3 btn-primary py-4 text-center"
                    >
                        <span className="text-xl">📷</span>
                        Upload New Images
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    <button className="flex items-center justify-center gap-3 btn-secondary py-4">
                        <span className="text-xl">📊</span>
                        Generate Report
                    </button>
                    <Link
                        to="/analysis"
                        className="flex items-center justify-center gap-3 btn-secondary py-4"
                    >
                        <span className="text-xl">🔍</span>
                        View Analytics
                    </Link>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">🌍</div>
                    <div className="text-sm text-slate-500">Coverage</div>
                    <div className="font-bold text-green-700">3 States</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">👥</div>
                    <div className="text-sm text-slate-500">Team Members</div>
                    <div className="font-bold text-green-700">24 Active</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">📡</div>
                    <div className="text-sm text-slate-500">Data Synced</div>
                    <div className="font-bold text-green-700">Real-time</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-sm text-slate-500">Response Time</div>
                    <div className="font-bold text-green-700">&lt;100ms</div>
                </div>
            </div>
        </div>
    );
}
