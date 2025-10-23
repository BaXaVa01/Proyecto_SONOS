import React, { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';

type UserInfo = {
    id: string;
    username: string;
    email: string;
    
};

type AuthState = {
    token: string | null;
    user: UserInfo | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: UserInfo) => void;
    logout: () => void;
};

// 2. Crear el Contexto
const AuthContext = createContext<AuthState | undefined>(undefined);

// 3. Crear el Proveedor (Provider)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Intenta obtener datos del localStorage si la sesión ya existe
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [user, setUser] = useState<UserInfo | null>(JSON.parse(localStorage.getItem('authUser') || 'null'));

    const isAuthenticated = !!token; // Devuelve true si hay token

    const setAuth = (newToken: string, newUser: UserInfo) => {
        setToken(newToken);
        setUser(newUser);
        
 
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('authUser', JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};