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
    
    const logout = (message) => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setTokens({ access: null, refresh: null });
        setUser(null);
        if (message) {
            sessionStorage.setItem('logoutMessage', message);
        }
        navigate('/login');
    };

    // Adiciona um interceptor de resposta para lidar com a expiração do token
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    logout('Sessão expirada. Por favor, faça login novamente.');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [logout]);

    const isAuthenticated = !!tokens.access;

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
            const { access, refresh } = response.data;
            
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            
            setTokens({ access, refresh });
            setUser({ email: credentials.username });
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
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