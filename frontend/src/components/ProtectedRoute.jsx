import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // For demo, we allow access. In real app, check auth token.
    const isAuthenticated = true;
    return isAuthenticated ? children : <Navigate to="/login" />;
}
