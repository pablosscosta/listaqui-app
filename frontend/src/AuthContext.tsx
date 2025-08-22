import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const storedAccess = localStorage.getItem('access');
    const storedRefresh = localStorage.getItem('refresh');

    const [user, setUser] = useState(storedAccess ? { email: '' } : null);
    const [tokens, setTokens] = useState({ 
        access: storedAccess, 
        refresh: storedRefresh 
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        // Lógica de token para ser adicionada no futuro, se necessário
    }, []);

    const isAuthenticated = !!tokens.access;

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
            const { access, refresh } = response.data;
            
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            
            setTokens({ access, refresh });
            setUser({ email: credentials.email });
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setTokens({ access: null, refresh: null });
        setUser(null);
        navigate('/login');
    };

    const value = { user, isAuthenticated, tokens, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};