import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error("Failed to log out");
        }
    };

    return (
        <nav className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
            <div className="font-bold text-xl text-green-700 flex items-center gap-2">
                <span>🌱</span> VLLFL
            </div>
            <div className="space-x-4 flex items-center">
                {currentUser ? (
                    <>
                        <Link to="/dashboard" className={`text-slate-600 hover:text-green-700 ${location.pathname === '/dashboard' ? 'font-semibold text-green-700' : ''}`}>Dashboard</Link>
                        <button
                            onClick={handleLogout}
                            className="text-slate-600 hover:text-red-600 font-medium"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="bg-brand-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition text-sm">Sign In</Link>
                )}
            </div>
        </nav>
    );
}
