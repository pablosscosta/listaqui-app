import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setupAxiosInterceptors } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const TOKEN_URL = '/token/';
const LOGOUT_URL = '/auth/logout/';

interface User {
    user_id: number;
    username: string;
    email: string;
}

interface Tokens {
    access: string;
}

interface AuthContextType {
    user: User | null;
    tokens: Tokens | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        try{
            const response = await api.post(TOKEN_URL, {
                username,
                password,
            });

            const accessToken = response.data.access;
            const decodedUser: any = jwtDecode(accessToken);

            setTokens({ access: accessToken });
            setUser(decodedUser as User);

            navigate('/');
        } catch (error){
            setTokens(null);
            setUser(null);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post(LOGOUT_URL);
        } catch (error) {
            console.error('Erro ao chamar o endpoint de logout, mas limpando o estado local.', error);
        } finally {
            setTokens(null);
            setUser(null);
            navigate('/login', { replace: true });
        }
    };

    // Configuração do Interceptor
    useEffect(() => {
        const getAccessToken = () => tokens?.access || null;
        
        setupAxiosInterceptors(
            getAccessToken, 
            setTokens, 
            logout
        );
        
    }, [tokens]); 

    const contextData: AuthContextType = {
        user,
        tokens,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};