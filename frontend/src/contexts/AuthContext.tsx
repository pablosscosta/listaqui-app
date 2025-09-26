import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    // Definiremos o tipo de user, tokens, login e logout nos próximos passos
    user: any;
    tokens: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Definiremos o estado (state) e as funções (functions) aqui no próximo commit
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {};
    const logout = () => {};

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

// Este é o hook customizado que o LoginPage.tsx está procurando
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};