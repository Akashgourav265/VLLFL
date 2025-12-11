export default function Navbar() {
    return (
        <nav className="p-4 bg-white shadow-sm flex justify-between items-center">
            <div className="font-bold text-xl text-green-700">VLLFL</div>
            <div className="space-x-4">
                <a href="/" className="text-gray-600 hover:text-green-600">Home</a>
                <a href="/login" className="text-gray-600 hover:text-green-600">Login</a>
                <a href="/dashboard" className="text-gray-600 hover:text-green-600">Dashboard</a>
            </div>
        </nav>
    );
}
