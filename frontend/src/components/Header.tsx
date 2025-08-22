import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    My Home
                </Link>
                <nav>
                    {isAuthenticated ? (
                        <div className="flex space-x-4 items-center">
                            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-gray-900">
                                Entrar
                            </Link>
                            <Link to="/register" className="text-gray-600 hover:text-gray-900">
                                Registrar
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;